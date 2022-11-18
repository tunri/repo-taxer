/**
 * @description
 * Encargado de la ‘orquestación’ de los diferentes componentes que conforman
 * el Registro de Contribuyente y componente vinculado a la ruta '/contribuyente/registro'
 * @author jerson
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { PATH_SEARCH_TAXPAYER } from 'src/app/core/data/slug-routes';
import { LIST_ACTIONS_CRUD } from 'src/app/core/models/enums';
import { ContribuyenteStorageSingleton } from 'src/app/core/services/contribuyente-storage';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';
import { DatosContribuyenteComponent } from '../../components';
import { formToPayload } from '../../components/datos-contribuyente/datos-contribuyente.utils';

@Component({
	selector: 'app-registro-contribuyente',
	templateUrl: './registro-contribuyente.component.html',
	styleUrls: ['./registro-contribuyente.component.scss'],
})
export class RegistroContribuyenteComponent implements OnInit {
	activeTab = 1;
	loading = false;
	numContribuyente!: number;
	municipalidadId!: number;

	numeroDj: number = 0; // 0 = no existe

	private keyNumContribuyente = 'numContribuyente';
	private keyNumDJ = 'numeroDJ';

	datosContribuyente: any | null = null;
	loadingDatosContribuyente = false;

	contribuyenteStorage = ContribuyenteStorageSingleton.getInstance();

	// Acceso a componente 'Datos Contribuyente'
	@ViewChild('contribuyente') contribuyente?: DatosContribuyenteComponent;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private alertService: AlertService,
		private contribuyenteService: ContribuyenteControllerService,
		private dialogConfirm: DialogConfirmService,
		private storageService: LocalStorageService
	) {}

	ngOnInit(): void {
		this.municipalidadId = 1;
		this.numContribuyente = this.getNumContribuyente()!;
		if (this.numContribuyente) {
			const contribuyenteFronStorage =
				this.contribuyenteStorage.getContribuyente();
			if (contribuyenteFronStorage) {
				this.datosContribuyente = JSON.parse(contribuyenteFronStorage);
				this.numeroDj = this.datosContribuyente.numeroDj;
			} else {
				this.getDatosContribuyente(this.numContribuyente);
			}
		}
	}

	/**
	 * Ejecuta metodos de acuerdo al actual Tab Activo, generalmente
	 * para invocar procesos de validacion y/o integracion y pasar
	 * al siguiente tab
	 * @param index: indice del actual tab activo
	 */
	onNext(index: number) {
		switch (index) {
			case 1:
				if (this.numeroDj) {
					this.guardarEnLocalStorage();
				} else {
					this.guardarContribuyente();
				}

				break;
			case 2:
				this.activeTab = 3;
				break;
			case 3:
				this.activeTab = 4;
				break;
			case 4:
				this.activeTab = 5;
				break;
			case 5:
				if (this.numeroDj) {
					this.guardarEnBloque();
				} else {
					this.gurdarYGenerarDJ();
				}
				break;
			default:
				break;
		}
	}

	onChangeActiveTab(value: number) {
		if (value === 1) {
			const contribuyenteFronStorage =
				this.contribuyenteStorage.getContribuyente();
			if (contribuyenteFronStorage) {
				this.datosContribuyente = JSON.parse(contribuyenteFronStorage);
			} else {
				this.getDatosContribuyente(this.numContribuyente);
			}
		}
	}

	/**
	 * Metodo que se invoca para cancelar el proceso de registro
	 */
	onCancel() {
		this.dialogConfirm
			.confirm({
				title: '¿Cancelar el registro de un nuevo contribuyente?',
				message: '',
			})
			.closed.subscribe({
				next: (response) => {
					if (response) {
						this.storageService.removeItem(
							this.keyNumContribuyente
						);
						this.storageService.removeItem(this.keyNumDJ);
						this.contribuyenteStorage.clearStorage();
						this.router.navigateByUrl(`/${PATH_SEARCH_TAXPAYER}`);
					}
				},
			});
	}

	/**
	 * Retorna el texto a mostrar en el boton primario
	 */
	getTextNext() {
		if (this.loading) return 'Grabando';

		return this.activeTab !== 5 ? 'Siguiente' : 'Guardar';
	}

	// Actualiza el numero DJ desde Datos Contribuyente
	onActualizarNumeroDj(numDj: number) {
		this.numeroDj = numDj;
	}

	guardarEnLocalStorage() {
		const data = this.contribuyente?.onNexLocalStorage();
		if (data) {
			this.contribuyenteStorage.saveContribuyente(data);
			this.activeTab = 2;
			this.alertService.info('Datos guardados!');
		}
	}

	private guardarEnBloque() {
		const storageContribuyente = JSON.parse(
			this.contribuyenteStorage.getContribuyente()!
		);
		const contribuyente = formToPayload(storageContribuyente);
		contribuyente.fecFallecimiento = storageContribuyente.fecFallecimiento;
		contribuyente.fecNacimiento = storageContribuyente.fecNacimiento;
		contribuyente.fecInscripcion = storageContribuyente.fecInscripcion;
		contribuyente.personaId = storageContribuyente.personaId;
		contribuyente.numOperacionId = storageContribuyente.numOperacionId;

		const storageSustentos = JSON.parse(
			this.contribuyenteStorage.getSustentos()!
		);
		const sustentos = this.filterOnlyCRUD(storageSustentos);

		const storageContactos = JSON.parse(
			this.contribuyenteStorage.getMediosContacto()!
		);
		const contactos = this.filterOnlyCRUD(storageContactos);

		const payload: any = {
			contribuyente,
			contactos,
			sustentos,
			domicilioRelacionado: [],
			domicilios: [],
			relacionados: [],
		};
		this.actualizarContribuyenteBloque(payload);
	}

	private actualizarContribuyenteBloque(payload: any) {
		this.loading = true;
		this.contribuyenteService
			.procesarActualizarDjUsingPut({
				contribuyenteNumero: this.numContribuyente,
				municipalidadId: this.municipalidadId,
				body: payload,
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response: any) => {
					console.log(response);
					this.alertService.success( response.message || 'Contribuyente Actualizado!');
					this.router.navigateByUrl(`/${PATH_SEARCH_TAXPAYER}`);
					this.contribuyenteStorage.clearStorage();
					this.storageService.removeItem(
						this.keyNumContribuyente
					);
				},
				error: (error) => {
					console.log(error);
					this.alertService.error(error.message)
				},
			});
	}

	private filterOnlyCRUD(list: any[] = []) {
		return list?.filter((c) => LIST_ACTIONS_CRUD.includes(c.accion)) || [];
	}

	/**
	 * Retorna el Numero de contribuyente guardado en localStorage o desde la URL,
	 * caso contrario retorna null
	 * @returns
	 */

	private getNumContribuyente() {
		const numLocalStorage = window.localStorage.getItem(
			this.keyNumContribuyente
		);

		const { id: idRoute } = this.route.snapshot.params;

		if (idRoute) return Number(idRoute);

		if (numLocalStorage) return Number(numLocalStorage);

		return null;
	}

	/**
	 * Implementacion de Guardar Datos Contribuyente
	 * pasa a los demas componentes el 'Numero de Contribuyente'
	 */
	private guardarContribuyente(): void {
		const ref = this.contribuyente?.onNextRef();
		if (ref) {
			this.loading = true;
			ref.pipe(finalize(() => (this.loading = false))).subscribe({
				next: (response: any) => {
					if (response) {
						const { message, data } = response;
						if (data) {
							this.alertService.success(message);
							this.numContribuyente = data.contribuyenteNumero;
							this.storageService.saveItem(
								this.keyNumContribuyente,
								this.numContribuyente.toString()
							);
						}
					}

					this.activeTab = 2;
				},
				error: (error) => this.alertService.error(error.message),
			});
		}
	}

	/**
	 * Metodo que se invoca en el ultimo paso para crear el Numero DJ
	 */
	private gurdarYGenerarDJ(): void {
		this.loading = true;
		this.contribuyenteService
			.procesarCrearDjUsingPut({
				contribuyenteNumero: this.numContribuyente,
				municipalidadId: this.municipalidadId,
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response) => {
					this.alertService.success('Numero DJ Generado');
					this.router.navigateByUrl(`/${PATH_SEARCH_TAXPAYER}`);
				},
				error: (error) => this.alertService.error(error.message),
			});
	}

	/**
	 * Obtiene los datos de Contribuyente
	 * @param numContribuyente
	 */
	private getDatosContribuyente(numContribuyente: number) {
		this.loadingDatosContribuyente = true;
		this.contribuyenteService
			.consultarUsingGet1({
				municipalidadId: this.municipalidadId,
				contribuyenteNumero: numContribuyente,
			})
			.pipe(finalize(() => (this.loadingDatosContribuyente = false)))
			.subscribe({
				next: (response: any) => {
					this.datosContribuyente = response.data[0];

					// si tiene numerodj, guardar contribuyente en localStorage
					if (this.datosContribuyente.numeroDj > 0) {
						this.contribuyenteStorage.initContribuyente(
							this.datosContribuyente
						);

						this.numeroDj = this.datosContribuyente.numeroDj;
					}
				},
				error: (error) => {
					this.alertService.error(error.message);
				},
			});
	}
}

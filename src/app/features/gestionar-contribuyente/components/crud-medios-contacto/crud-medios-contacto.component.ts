/**
 * Componente Padre, encargado de orquestar los componentes dependientes a Medios de Contacto
 * @input numContribuyente: Numbero de Contribuyente Generado
 * @input municipalidadId: Id de  Municipalidad
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Subscription } from 'rxjs';
import { ContactoContribuyenteListaResponse } from 'src/app/api/contribuyente/models';
import { ContactoContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { CRUD_ACTION } from 'src/app/core/models/enums';
import { ContribuyenteStorageSingleton } from 'src/app/core/services/contribuyente-storage';
import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';
import { DialogUpsertMediosContactoComponent } from './dialog-upsert-medios-contacto/dialog-upsert-medios-contacto.component';

@Component({
	selector: 'crud-medios-contacto',
	templateUrl: './crud-medios-contacto.component.html',
	styleUrls: ['./crud-medios-contacto.component.scss'],
})
export class CrudMediosContactoComponent implements OnInit, OnDestroy {
	@Input() numContribuyente!: number;
	@Input() municipalidadId!: number;
	@Input() numeroDj: number = 0;

	mainStorageDataSource: any[] = []; // lista intermediaria entre datasource y localStorage
	dataSource: ContactoContribuyenteListaResponse[] = [];
	loading: boolean = false;
	selectedItem: ContactoContribuyenteListaResponse | undefined = undefined;
	subscription: Subscription | undefined;
	contribuyenteStorage = ContribuyenteStorageSingleton.getInstance();

	constructor(
		private modalService: NgbModal,
		private contactoContribuyenteService: ContactoContribuyenteControllerService,
		private dialogConfirmService: DialogConfirmService
	) {}

	ngOnInit(): void {
		if (this.numContribuyente) {
			const dataStorage = this.contribuyenteStorage.getMediosContacto();
			if (dataStorage) {
				this.mainStorageDataSource = JSON.parse(dataStorage);
				this.getMediosContactoFromStorage();
			} else {
				this.getMediosContacto();
			}
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	onShowCreate() {
		this.onShowDialogUpsert();
	}

	onShowUpdate(contactoSelected?: ContactoContribuyenteListaResponse) {
		if (contactoSelected) {
			this.onShowDialogUpsert(contactoSelected);
		}
	}
	/**
	 * Metodo que invoca el modal de registrar/editar medios de contacto
	 * Se le envia numero de Contribuyente y id municipalidad, y se envia la fila si hay una fila seleccionada.
	 * @param contactoSelected: Fila Seleccionada
	 */
	onShowDialogUpsert(contactoSelected?: ContactoContribuyenteListaResponse) {
		const modalRef = this.modalService.open(
			DialogUpsertMediosContactoComponent,
			{
				centered: true,
				backdrop: 'static',
				keyboard: false,
				size: 'lg',
			}
		);

		modalRef.componentInstance.municipalidadId = this.municipalidadId;
		modalRef.componentInstance.contribuyenteNumero = this.numContribuyente;
		modalRef.componentInstance.numeroDj = this.numeroDj;

		if (contactoSelected) {
			modalRef.componentInstance.contacto = contactoSelected;
		}

		modalRef.closed.subscribe({
			next: (response) => {
				if (response) {
					if (this.numeroDj > 0) {
						this.updateTableSutento(response, contactoSelected);
					} else {
						this.getMediosContacto();
					}
				}
			},
		});
	}

	private updateTableSutento(data: any, selectedItem?: any) {
		if (!selectedItem) {
			this.mainStorageDataSource = [...this.mainStorageDataSource, data];
		} else {
			// update
			this.mainStorageDataSource = this.mainStorageDataSource.map((e) => {
				if (e.medConContribuyenteId === data.medConContribuyenteId)
					return data;
				return e;
			});
		}

		this.contribuyenteStorage.saveMediosContacto([
			...this.mainStorageDataSource,
		]);
		this.getMedioContactosFromStorage();
		this.selectedItem = undefined;
	}

	/**
	 * Metodo que invoca el modal de confirmacion
	 * @param contactoSelected: Fila Seleccionada
	 */
	onRemoveItem(contactoSelected?: ContactoContribuyenteListaResponse) {
		if (contactoSelected) {
			if (this.numeroDj > 0) {
				this.removeFromStorage(contactoSelected);
			} else {
				this.removeFromServer(contactoSelected);
			}
		}
	}

	private removeFromStorage(contactoSelected: any) {
		const dialogRef = this.dialogConfirmService.confirm();

		dialogRef.closed.subscribe({
			next: (response) => {
				if (response) {
					console.log(contactoSelected, 'contactoSelected');
					if (contactoSelected.accion === CRUD_ACTION.CREATE) {
						this.deleteItemOfStorage(
							contactoSelected.medConContribuyenteId
						);
					} else {
						// actualice la accion
						this.updateStateToDelete(
							contactoSelected.medConContribuyenteId
						);
					}

					// guardar en localStorage
					this.contribuyenteStorage.saveMediosContacto(
						this.mainStorageDataSource
					);
					// limpiar seleccionado
					this.selectedItem = undefined;

					// actulizo la tabla
					this.getMediosContactoFromStorage();
				}
			},
		});
	}

	private deleteItemOfStorage(id: number) {
		this.mainStorageDataSource = this.mainStorageDataSource.filter(
			(c: any) => c.medConContribuyenteId !== id
		);
	}

	// actualiza 1 registro del datasource  a Accion DELETE
	private updateStateToDelete(id: number) {
		this.mainStorageDataSource = this.mainStorageDataSource.map(
			(c: any) => {
				if (c.medConContribuyenteId === id)
					c.accion = CRUD_ACTION.DELETE;
				return c;
			}
		);
	}

	private removeFromServer(contactoSelected: any) {
		const dialogRef = this.dialogConfirmService.confirm({
			callback: () =>
				this.contactoContribuyenteService.anularUsingDelete1({
					contribuyenteNumero: Number(
						contactoSelected.contribuyenteNumero
					),
					municipalidadId: Number(contactoSelected.municipalidadId),
					medConContribuyenteId: Number(
						contactoSelected.medConContribuyenteId
					),
				}),
		});

		dialogRef.closed.subscribe({
			next: (response) => {
				if (response) {
					this.getMediosContacto();
				}
			},
		});
	}

	onSelectedItem(item: ContactoContribuyenteListaResponse) {
		this.selectedItem = item;
	}

	private getMediosContactoFromStorage() {
		this.dataSource = this.mainStorageDataSource.filter(
			(c) => c.accion !== CRUD_ACTION.DELETE
		);
	}

	private getMediosContacto() {
		this.loading = true;
		this.subscription = this.contactoContribuyenteService
			.listarPorContribuyenteUsingGet({
				municipalidadId: this.municipalidadId,
				contribuyenteNumero: this.numContribuyente,
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response) => {
					this.selectedItem = undefined;
					if (this.numeroDj) {
						this.makeSetupStorage(response);
					} else {
						this.dataSource = response;
					}
				},
			});
	}

	private makeSetupStorage(response: any[]) {
		this.mainStorageDataSource = response.map((c) => ({
			...c,
			accion: '',
		}));
		this.contribuyenteStorage.initMediosContacto(
			this.mainStorageDataSource
		);
		this.getMedioContactosFromStorage();
	}

	private getMedioContactosFromStorage() {
		this.dataSource = this.mainStorageDataSource.filter(
			(c) => c.accion !== CRUD_ACTION.DELETE
		);
	}
}

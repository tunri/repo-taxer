/**
 * Componente encargado de Registrar y/o Modificar los datos de contribuyente
 * @author jerson
 */

import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';

import { ContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { ComunResponse } from 'src/app/api/datoscomunes/models';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { Genders, YesNo } from 'src/app/core/data/commons';
import {
	SLUG_PERSONA_JURIDICA,
	SLUG_PERSONA_NATURAL,
} from 'src/app/core/data/datos-comunes';
import { IDatosContribuyente } from 'src/app/core/models/custom-contribuyente.model';
import { ContribuyenteStorageSingleton } from 'src/app/core/services/contribuyente-storage';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { toNgDateStruct } from 'src/app/utils/calendar';
import { formToPayload, payloadToForm } from './datos-contribuyente.utils';

const ID_RUC = 2;
const ID_DNI = 1;

@Component({
	selector: 'taxer-datos-contribuyente',
	templateUrl: './datos-contribuyente.component.html',
	styleUrls: ['./datos-contribuyente.component.scss'],
})
export class DatosContribuyenteComponent
	implements OnInit, OnDestroy, OnChanges
{
	@Input() municipalidadId!: number;
	@Input() numContribuyente?: number;
	@Input() contribuyente?: any;
	@Input() loading?: boolean;

	@Output() actualizarNumeroDj = new EventEmitter();

	submitted = false;
	// loading: boolean = false;
	onDestroy$ = new Subject<boolean>();

	// Campos sin binding, readonly
	numeroDj: number | null = null;
	fechaDj: string | null = null;
	personaId: number = 0;
	numOperacionId: number = 0;

	contribuyenteStorage = ContribuyenteStorageSingleton.getInstance();

	// Datos de Declaracion
	formulario: FormGroup = this.fb.group({
		// Tipo Medio de Determinacion
		tipMedDeterminaId: [{ value: 1, disabled: true }, Validators.required],
		// Medio de presentacion
		medDeterminaId: [{ value: 1, disabled: true }, Validators.required],
		// Modalidad Oficio
		modOficio: [1],
		// Tipo Contribuyente
		tipPersonaId: [1, Validators.required],
		// Segmentacion, api
		segContribuyenteId: [1, Validators.required],
		// Fecha de Presentación
		fecInscripcion: [null, Validators.required],
		//Tipo de Documento
		docIdentidadId: ['', Validators.required],
		// Numero de Documento
		numDocIdentidad: ['', Validators.required],
		// Apellido Paterno
		apePaterno: [''],
		// Apellido Materno
		apeMaterno: [''],
		// Nombres
		nombres: [''],
		// Razon Social
		razonSocial: [''],
		// Fecha de Nacimiento
		fecNacimiento: [null],
		// Estado Civil
		estCivilTipId: [''],
		// Fallecio
		fallecio: [0], // si:1, no:0
		// Fecha de Fallecimiento
		fecFallecimiento: [{ value: null, disabled: true }],
		// Genero
		genero: ['M'],
	});

	private dataSourceTiposDocumento: ComunResponse[] = [];

	// ======= SELECTS =======
	// Tipo de Documento
	tiposDocumento: ComunResponse[] = [];
	// Tipo Contribuyente
	tiposContribuyente: ComunResponse[] = [];
	// Tipo Medio determinacion
	tiposMedDeterminacion: ComunResponse[] = [];
	// Medios determinacion
	tiposMedPresentacion: ComunResponse[] = [];
	// Modalidad de Oficio
	tiposModalidadOficios = YesNo;
	// Fallecio
	tiposFallecio = YesNo;
	// Estados Civiles
	tiposEstadosCiviles: any[] = [];
	// Segmentacion
	tiposSegmentacion: ComunResponse[] = [];
	// Generos
	tiposGeneros = Genders;

	requiredValidator = Validators.required;

	constructor(
		private fb: FormBuilder,
		private contribuyenteControllerService: ContribuyenteControllerService,
		private comunControllerService: ComunControllerService,
		private validationFormService: ValidationFormService,
		private alertService: AlertService
	) {}

	ngOnInit(): void {
		this.invocarHidratarSelectores();

		this.onChangeTipoContribuyente(
			this.formulario.get('tipPersonaId')?.value
		);

		this.onChangeFallecio(this.formulario.get('fallecio')?.value);
	}

	ngOnDestroy(): void {
		this.onDestroy$.next(true);
		this.onDestroy$.complete();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['contribuyente']?.currentValue) {
			this.poblarFormulario(changes['contribuyente']?.currentValue);
		}
	}

	/**
	 * Metodo de acceso para el padre (Componente Registro de Contribuyente), ejecuta el servicio a nivel del componente
	 * y envia el observable hacia el padre.
	 * @returns Observable, retorna servicio de Crear / Modificar a invocar
	 */
	onNextRef() {
		this.submitted = true;
		if (this.formulario.valid) {
			const payload = formToPayload(this.formulario.getRawValue());

			if (this.numContribuyente) {
				payload.personaId = this.personaId;
				payload.numOperacionId = this.numOperacionId;
				return this.contribuyenteControllerService.actualizarUsingPut2({
					contribuyenteNumero: this.numContribuyente,
					municipalidadId: this.municipalidadId,
					body: payload,
				});
			}

			return this.contribuyenteControllerService.crearUsingPost2({
				body: payload,
				municipalidadId: this.municipalidadId,
			});
		}

		return null;
	}

	onNexLocalStorage() {
		this.submitted = true;
		if (this.formulario.valid) {
			return formToPayload(this.formulario.getRawValue());
		}

		return null;
	}

	/**
	 * Verifica si el FormControl es invalido
	 * @param input: Campo de Formulario
	 * @returns true si el FormControl es invalido
	 */
	invalidControl(input: AbstractControl) {
		return this.validationFormService.isControlInvalid(
			input,
			this.submitted
		);
	}

	/**
	 * Escucha los cambios del campo Fallecio
	 * @param value
	 */
	onChangeFallecio(value: any) {
		if (value) {
			this.fecFallecimiento.enable();

			if (this.contribuyente?.fecNacimiento) {
				this.fecFallecimiento.setValue(
					toNgDateStruct(this.contribuyente.fecNacimiento)
				);
			}
			//
		} else {
			this.fecFallecimiento.disable();
			this.fecFallecimiento.reset();
		}

		this.fecFallecimiento.setValidators(value ? Validators.required : []);
		this.fecFallecimiento.updateValueAndValidity();
	}

	// TODO: REFACTORIZAR CODIGO
	/**
	 * Metodo para remover y agregar 'Validator Required' a campos que dependen del Tipo de Contribuyente (Reglas de Negocio)
	 * @param id: id de tipo contribuyente seleccionado
	 */
	onChangeTipoContribuyente(id?: number) {
		this.actualizarTiposDocumento();

		this.removeValidatorRequired([
			'nombres',
			'razonSocial',
			'fecNacimiento',
			'apePaterno',
			'apeMaterno',
		]);

		if (id === SLUG_PERSONA_JURIDICA) {
			this.hasRequired(['razonSocial']);
		} else {
			this.hasRequired([
				'nombres',
				'fecNacimiento',
				'apePaterno',
				'apeMaterno',
			]);
		}
	}

	/**
	 * METODOS PRIVADOS
	 */

	/**
	 * Remueve Validtor.Required de FormControl
	 * @param keys : nombre de campos de Formulario (FormGroup)
	 */
	private removeValidatorRequired(keys: string[]) {
		keys.forEach((key) => {
			this.formulario.controls[key]?.removeValidators(
				this.requiredValidator
			);
			this.formulario.controls[key]?.updateValueAndValidity();
		});
	}

	/**
	 * Agrega Validtor.Required a FormControl
	 * @param keys : nombre de campos de Formulario (FormGroup)
	 */
	private hasRequired(keys: string[]) {
		keys.forEach((key) => {
			this.formulario.controls[key]?.addValidators(Validators.required);
			this.formulario.controls[key]?.updateValueAndValidity();
		});
	}

	private poblarFormulario(data: IDatosContribuyente) {
		const { numeroDj, fechaDj, personaId, numOperacionId } = data;
		const initialValues = payloadToForm(data);

		this.numeroDj = numeroDj || null;
		this.fechaDj = fechaDj || null;
		this.personaId = personaId || 0;
		this.numOperacionId = numOperacionId || 0;

		this.formulario.patchValue(initialValues);
	}

	// Agrupa los metodos para hidratar datos a selectores (API's)
	private invocarHidratarSelectores(): void {
		this.getTiposDocumento();
		this.getTiposMedioDeterminacion();
		this.getTipoMedioPresentacion();
		this.getTiposContribuyente();
		this.getTiposSegmetacion();
		this.getEstadosCiviles();
	}

	/**
	 * Filtra y Actualiza el campo Tipo de Documento si es Juridico / Natural
	 */
	private actualizarTiposDocumento() {
		const optDefault = this.esContribuyenteJuridico ? ID_RUC : ID_DNI;

		this.tiposDocumento = this.filterDocsByTaxer(this.tipPersonaId.value);

		this.docIdentidadId.setValue(optDefault);
	}

	/**
	 * Retorna los Tipo de Documentos segun el tipo de Contribuyente seleccionado
	 * @param tipoContribuyenteId: number
	 */
	private filterDocsByTaxer(tipoContribuyenteId: number): ComunResponse[] {
		const tiposDocumento = this.dataSourceTiposDocumento;

		if (tipoContribuyenteId === SLUG_PERSONA_JURIDICA) {
			return tiposDocumento.filter((c) => c.maestroId === ID_RUC);
		}

		return tiposDocumento.filter((c) => c.maestroId !== ID_RUC);
	}

	/**
	 *  ===== REQUEST PARA HIDRATAR SELECTS =====
	 */

	// Metodo wrapper para Consumir comunControllerService
	private obtenerDatosComunes(maestroId: number) {
		return this.comunControllerService
			.obtenerPorTipoUsingGet({
				tipoMaestroId: maestroId,
				municipalidadId: this.municipalidadId,
			})
			.pipe(takeUntil(this.onDestroy$));
	}

	private getTiposDocumento(): void {
		this.obtenerDatosComunes(1).subscribe({
			next: (response) => {
				this.dataSourceTiposDocumento = response;
				this.tiposDocumento = this.filterDocsByTaxer(
					this.tipPersonaId.value
				);
			},
		});
	}

	private getTiposSegmetacion(): void {
		this.obtenerDatosComunes(24).subscribe({
			next: (response) => {
				this.tiposSegmentacion = response;
			},
		});
	}

	private getEstadosCiviles(): void {
		this.obtenerDatosComunes(17).subscribe({
			next: (response) => {
				this.tiposEstadosCiviles = response;
			},
		});
	}

	private getTiposContribuyente(): void {
		this.obtenerDatosComunes(14).subscribe({
			next: (response) => {
				this.tiposContribuyente = response;
			},
		});
	}

	private getTipoMedioPresentacion(): void {
		this.obtenerDatosComunes(2).subscribe({
			next: (response) => {
				this.tiposMedPresentacion = response;
			},
		});
	}

	private getTiposMedioDeterminacion(): void {
		this.obtenerDatosComunes(3).subscribe({
			next: (response) => {
				this.tiposMedDeterminacion = response;
			},
		});
	}

	/**
	 * ======= GETTERS =======
	 * **/

	get tipoContribuyente(): AbstractControl {
		return this.formulario.controls['tipPersonaId'];
	}

	get segmentacion(): AbstractControl {
		return this.formulario.controls['segContribuyenteId'];
	}

	get fecInscripcion(): AbstractControl {
		return this.formulario.controls['fecInscripcion'];
	}

	get tipPersonaId(): AbstractControl {
		return this.formulario.controls['tipPersonaId'];
	}

	get docIdentidadId(): AbstractControl {
		return this.formulario.controls['docIdentidadId'];
	}

	get numDocIdentidad(): AbstractControl {
		return this.formulario.controls['numDocIdentidad'];
	}

	get nombres(): AbstractControl {
		return this.formulario.controls['nombres'];
	}

	get apePaterno(): AbstractControl {
		return this.formulario.controls['apePaterno'];
	}

	get apeMaterno(): AbstractControl {
		return this.formulario.controls['apeMaterno'];
	}

	get fecNacimiento(): AbstractControl {
		return this.formulario.controls['fecNacimiento'];
	}

	get fecFallecimiento(): AbstractControl {
		return this.formulario.controls['fecFallecimiento'];
	}

	get razonSocial(): AbstractControl {
		return this.formulario.controls['razonSocial'];
	}

	get fallecio(): AbstractControl {
		return this.formulario.controls['fallecio'];
	}

	get esContribuyenteJuridico() {
		return this.tipoContribuyente.value === SLUG_PERSONA_JURIDICA;
	}

	className(control: AbstractControl) {
		const classes = [];

		if (
			this.fallecio.value === 1 &&
			control.hasValidator(this.requiredValidator)
		)
			classes.push('required');

		if (this.invalidControl(control)) classes.push('invalid');

		return classes.join(' ');
	}
}

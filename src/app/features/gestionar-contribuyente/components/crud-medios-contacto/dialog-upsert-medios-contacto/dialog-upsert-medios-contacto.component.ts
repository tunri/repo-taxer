/**
 * Componente encargado de Registrar / Actualizar medios de Contacto
 * @input contacto {ContactoContribuyenteListaResponse}: objecto medio de contacto (usado para llenar datos en actualizar)
 * @input municipalidadId: id municipalidad
 * @input contribuyenteNumero: numero de contribyente
 */

import { Component, Input, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import {
	ContactoContribuyenteListaResponse,
	ContactoContribuyenteRequest,
} from 'src/app/api/contribuyente/models';
import { ContactoContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { CRUD_ACTION } from 'src/app/core/models/enums';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';

@Component({
	selector: 'app-dialog-upsert-medios-contacto',
	templateUrl: './dialog-upsert-medios-contacto.component.html',
	styleUrls: ['./dialog-upsert-medios-contacto.component.scss'],
})
export class DialogUpsertMediosContactoComponent implements OnInit {
	@Input() public contacto!: ContactoContribuyenteListaResponse;
	@Input() public municipalidadId!: number;
	@Input() public contribuyenteNumero!: number;
	@Input() public numeroDj!: number;

	tiposContacto: any[] = [];
	tiposMedioContacto: any[] = [];
	submitted = false;
	loading = false;

	isModeEdit = false;

	formulario: FormGroup = this.fb.group({
		tipoContacto: ['', Validators.required],
		medioContacto: ['', Validators.required],
		detalle: ['', Validators.required],
		principal: [false],
	});

	constructor(
		public activeModal: NgbActiveModal,
		private fb: FormBuilder,
		private contactService: ContactoContribuyenteControllerService,
		private comunControllerService: ComunControllerService,
		private validationFormService: ValidationFormService
	) {}

	ngOnInit(): void {
		this.isModeEdit = !!this.contacto;

		this.getTiposContacto();
		this.getTiposMedioContacto();

		if (this.isModeEdit) {
			this.updateFormulario(this.contacto);
		}
	}

	onSubmit(): void {
		this.submitted = true;
		if (!this.loading && this.formulario.valid) {
			const payload = this.getPayload();

			if (this.numeroDj > 0) {
				this.saveMediosContactoInStorage(payload);
			} else {
				if (this.isModeEdit) {
					this.actualizarContacto(payload);
				} else {
					this.crearContacto(payload);
				}
			}
		}
	}

	close(response?: any) {
		this.activeModal.close(response);
	}

	private saveMediosContactoInStorage(payload: any) {
		const response = this.isModeEdit
			? this.saveStorateUpdate(payload)
			: this.saveStorateCreate(payload);

		 this.close(response);
	}

	private saveStorateCreate(formValue: any) {
		const payload = { ...formValue };
		payload.accion = CRUD_ACTION.CREATE;
		payload.activo = 1;
		payload.contribuyenteNumero = this.contribuyenteNumero;
		payload.estadoDsc = 'Vigente';
		payload.municipalidadId = this.municipalidadId;
		const medioContacto = this.findOneMedioContacto(formValue.claMedContactoId);
		payload.claMedDescripcion = medioContacto.descripcion;

		const tipoContacto = this.findOneTipoContacto(formValue.tipMedContactoId);
		payload.tipMedDescripcion = tipoContacto.descripcion;

		// id Temporal
		payload.medConContribuyenteId = new Date().getTime();

		return payload;
	}


	private saveStorateUpdate(body: any) {
		const payload: any = { ...this.contacto };

		console.log(body);

		const medioContacto = this.findOneMedioContacto(body.claMedContactoId);
		const tipoContacto = this.findOneTipoContacto(body.tipMedContactoId);

		console.log(tipoContacto, 'tipoContacto');

		// Si previamente tenia C, se mantiene
		payload.accion =  payload.accion ===  CRUD_ACTION.CREATE ? CRUD_ACTION.CREATE :  CRUD_ACTION.UPDATE;

		payload.tipMedContactoId = body.tipMedContactoId;
		payload.tipMedDescripcion = tipoContacto.descripcion;

		payload.claMedContactoId = body.claMedContactoId;
		payload.claMedDescripcion = medioContacto.descripcion;

		payload.descripcion = body.descripcion;
		payload.principal = body.principal;


		return payload;
	}

	private findOneMedioContacto(id: number) {
		return this.tiposMedioContacto.find((c) => c.maestroId === id);
	}

	private findOneTipoContacto(id: number) {
		return this.tiposContacto.find((c) => c.maestroId === id);
	}


	private updateFormulario(contacto: ContactoContribuyenteListaResponse) {
		const { descripcion, tipMedContactoId, principal, claMedContactoId } =
			contacto;
		this.formulario.patchValue({
			tipoContacto: tipMedContactoId,
			medioContacto: claMedContactoId,
			detalle: descripcion,
			principal: principal,
		});
	}

	private crearContacto(payload: ContactoContribuyenteRequest) {
		this.loading = true;
		this.contactService
			.crearUsingPost1({
				municipalidadId: this.municipalidadId,
				contribuyenteNumero: this.contribuyenteNumero,
				body: payload,
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response: any) => {
					this.close(response.data);
				},
				error: (error: any) => {
					alert(error);
				},
			});
	}

	private actualizarContacto(payload: ContactoContribuyenteRequest) {
		this.loading = true;
		const { contribuyenteNumero, municipalidadId, medConContribuyenteId } =
			this.contacto;
		this.contactService
			.actualizarUsingPut1({
				body: payload,
				contribuyenteNumero: Number(contribuyenteNumero),
				medConContribuyenteId: Number(medConContribuyenteId),
				municipalidadId: Number(municipalidadId),
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response: any) => {
					this.close(response.data);
				},
				error: (error) => {
					alert(error);
				},
			});
	}

	invalidControl(input: AbstractControl) {
		return this.validationFormService.isControlInvalid(
			input,
			this.submitted
		);
	}

	get tipoContacto(): AbstractControl {
		return this.formulario.controls['tipoContacto'];
	}

	get medioContacto(): AbstractControl {
		return this.formulario.controls['medioContacto'];
	}

	get detalle(): AbstractControl {
		return this.formulario.controls['detalle'];
	}

	private getTiposContacto(): void {
		this.obtenerDatosComunes(15).subscribe({
			next: (response) => {
				this.tiposContacto = response;
			},
		});
	}

	private getTiposMedioContacto(): void {
		this.obtenerDatosComunes(16).subscribe({
			next: (response) => {
				this.tiposMedioContacto = response;
			},
		});
	}

	private getPayload(): ContactoContribuyenteRequest {
		const { tipoContacto, medioContacto, detalle, principal } =
			this.formulario.value;

		const id = this.isModeEdit ? this.contacto.medConContribuyenteId : 0;

		return {
			tipMedContactoId: tipoContacto,
			descripcion: detalle,
			principal: Number(principal),
			//   medConContribuyenteId: id,
			claMedContactoId: medioContacto,
		};
	}

	private obtenerDatosComunes(
		maestroId: number,
		municipalidadId: number = 1
	) {
		return this.comunControllerService.obtenerPorTipoUsingGet({
			tipoMaestroId: maestroId,
			municipalidadId,
		});
	}
}

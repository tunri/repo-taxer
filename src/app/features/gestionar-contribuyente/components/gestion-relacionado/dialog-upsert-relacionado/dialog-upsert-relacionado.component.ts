import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { DOC_IDENTIDAD_ID, TIP_RELACIONADO_ID } from 'src/app/core/data/datos-comunes';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { RelacionadoControllerService } from 'src/app/api/contribuyente/services';
import { RelacionadoPersonaRequest, RelacionadoBuscarResponse } from 'src/app/api/contribuyente/models';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';

type objDate = {
  year: number;
  month: number;
  day: number;
};

@Component({
  selector: 'app-dialog-upsert-relacionado',
  templateUrl: './dialog-upsert-relacionado.component.html',
  styleUrls: ['./dialog-upsert-relacionado.component.scss']
})
export class DialogUpsertRelacionadoComponent implements OnInit {
  @Input() public relacionado!: RelacionadoBuscarResponse;
  @Input() public municipalidadId!: number;
  @Input() public numContribuyente!: number;

  submitted = false;
  isModeEdit = false;
  loading = false;

  tipoRelacionado: any[] = [];
  tipoDocIdentidad: any[] = [];

  formulario: FormGroup = this.fb.group({
    tipRelacionadoId: ['', Validators.required],
    docIdentidadId: ['', Validators.required],
    numDocIdentidad: ['', Validators.required],
    apePaterno: [''],
    apeMaterno: [''],
    nombres: ['', Validators.required],
    fecVigInicial: ['', Validators.required],
    fecVigFinal: [''],
    telefonoFijo: [''],
    anexo: [''],
    telefonoCelular: [''],
    correoElectronico: [''],
    municipalidadId: [this.municipalidadId],
    contribuyenteNumero: [this.numContribuyente],
    activo: [1]
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private comunControllerService: ComunControllerService,
    private relacionadoService: RelacionadoControllerService,
    private alertService: AlertService,
    private validationFormService: ValidationFormService) {}

  ngOnInit(): void {
    this.isModeEdit = !!this.relacionado;
    this.inicializarSelectores();
    if (this.isModeEdit) {
      //this.updateFormulario(this.relacionado);
    }
  }

  private inicializarSelectores(): void {
    this.getTiposDocumento();
    this.getTipoRelacionado();
  }

  invalidControl(input: AbstractControl) {
    return this.validationFormService.isControlInvalid(input, this.submitted);
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.loading && this.formulario.valid) {
      const payload = this.mapToPayload();
      if (this.isModeEdit) {
        //this.crearRelacionado(payload);
      } else {
        this.crearRelacionado(payload);
      }
    }else{
      console.log(this.formulario.value);
      this.alertService.warning("Ingrese los datos requeridos.");
    }
  }

  private crearRelacionado(payload: RelacionadoPersonaRequest): void {
    this.loading = true;
    this.relacionadoService
      .crearUsingPost6({
        body: payload,
        contribuyenteNumero: this.numContribuyente,
        municipalidadId:this.municipalidadId
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response: any) => {
          this.close(response.data);
          //console.log(response);
          /*if (response && response.success) {
            const { message, data } = response;
            if (data) {
              this.alertService.success(message);
              this.close(response.data);
            }
          }else{
            this.alertService.warning(response.message);
          }*/
        },
        error: (error) => {
          this.alertService.error('Error!');
        },
      });
  }

  close(response?: any) {
    this.activeModal.close(response);
  }

  private mapToPayload(): RelacionadoPersonaRequest {
    const formValue = this.formulario.getRawValue();
    const payload = { ...formValue };

    payload.municipalidadId = this.municipalidadId;
    payload.contribuyenteNumero = this.numContribuyente;

    if (formValue.fecVigInicial) {
      payload.fecVigInicial = this.toStringDate(formValue.fecVigInicial);
    }

    if (formValue.fecVigFinal) {
      payload.fecVigFinal = this.toStringDate(formValue.fecVigFinal);
    }

    return payload;
  }

  getTiposDocumento(): void {
    this.obtenerDatosComunes(DOC_IDENTIDAD_ID).subscribe({
      next: (response) => {
        this.tipoDocIdentidad = response;
        this.tipoDocIdentidad = this.tipoDocIdentidad.filter(
          (c) => c.maestroId !== 2//RUC
        );
      },
    });
  }

  getTipoRelacionado(): void {
    this.obtenerDatosComunes(TIP_RELACIONADO_ID).subscribe({
      next: (response) => {
        this.tipoRelacionado = response;
      },
    });
  }

  // Metodo wrapper para comuncontroller
  private obtenerDatosComunes(maestroId: number, municipalidadId: number = 1) {
    return this.comunControllerService.obtenerPorTipoUsingGet({
      tipoMaestroId: maestroId,
      municipalidadId,
    });
  }

  private toStringDate({ year, month, day }: objDate): string {
    const _day = this.getNumberWithZero(day);
    const _month = this.getNumberWithZero(month);
    return `${year}-${_month}-${_day}`;
  }

  private getNumberWithZero(n: number) {
    return n < 10 && n.toString().length === 1 ? `0${n}` : n;
  }

  get tipRelacionadoId(): AbstractControl {
    return this.formulario.controls['tipRelacionadoId'];
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
  get fecVigInicial(): AbstractControl {
    return this.formulario.controls['fecVigInicial'];
  }

}

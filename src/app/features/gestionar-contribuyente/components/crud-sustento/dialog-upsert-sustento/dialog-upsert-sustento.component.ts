/**
 * Componente encargado de Registrar / Actualizar sustento
 * @input sustento {DocumentoSustentoBuscarResponse}: objecto sustento (usado para llenar datos en actualizar)
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
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import {
  DocumentoSustentoBuscarResponse,
  DocumentoSustentoRequest,
} from 'src/app/api/contribuyente/models';
import { DocumentoSustentoControllerService } from 'src/app/api/contribuyente/services';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';

@Component({
  selector: 'dialog-upsert-sustento',
  templateUrl: './dialog-upsert-sustento.component.html',
  styleUrls: ['./dialog-upsert-sustento.component.scss'],
})
export class DialogUpsertSustentoComponent implements OnInit {
  @Input() public sustento!: DocumentoSustentoBuscarResponse;
  @Input() public municipalidadId!: number;
  @Input() public contribuyenteNumero!: number;

  tiposDocumento: any[] = [];
  tiposPresentacion: any[] = [];
  submitted = false;
  isModeEdit = false;
  loading = false;

  formulario: FormGroup = this.fb.group({
    documentoId: ['', Validators.required],
    numDocumento: ['', Validators.required],
    folio: [0, [Validators.required, Validators.pattern(/\d+/)]],
    tipoPresentacionId: ['', Validators.required],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private docSustentoService: DocumentoSustentoControllerService,
    private comunControllerService: ComunControllerService,
    private validationFormService: ValidationFormService
  ) {}

  ngOnInit(): void {
    this.isModeEdit = !!this.sustento;

    this.getTiposDocumento();
    this.getTiposPresentacion();

    if (this.isModeEdit) {
      this.updateFormulario(this.sustento);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.loading && this.formulario.valid) {
      const payload = this.mapToPayload();
      if (this.isModeEdit) {
        this.actualizarSustento(payload);
      } else {
        this.crearSustento(payload);
      }
    }
  }

  close(response?: any) {
    this.activeModal.close(response);
  }

  invalidControl(input: AbstractControl) {
    return this.validationFormService.isControlInvalid(input, this.submitted);
  }

  private updateFormulario(sustento: DocumentoSustentoBuscarResponse) {
    this.formulario.patchValue({
      documentoId: sustento.tipDocSustentoId,
      numDocumento: sustento.nroDocSustento,
      folio: sustento.folios,
      tipoPresentacionId: sustento.forPresentacionId,
    });
  }

  // Todo: Refactorizar con metodo actualizarSustento, ya que hacen lo mismo, solo se diferencia en el servicio a usar
  private crearSustento(payload: DocumentoSustentoRequest): void {
    this.loading = true;
    this.docSustentoService
      .crearUsingPost2({
        body: payload,
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: this.contribuyenteNumero,
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

  private actualizarSustento(payload: DocumentoSustentoRequest): void {
    this.loading = true;
    this.docSustentoService
      .actualizarUsingPut2({
        body: payload,
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: this.contribuyenteNumero,
        docSusContribuyenteId: this.sustento.docSusContribuyenteId!,
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

  private mapToPayload(): DocumentoSustentoRequest {
    const { documentoId, numDocumento, folio, tipoPresentacionId } =
      this.formulario.value;
    const folios = Number(folio);

    const docSusContribuyenteId = this.isModeEdit
      ? Number(this.sustento.docSusContribuyenteId)
      : 0;

    return {
      docSusContribuyenteId,
      folios,
      nroDocSustento: numDocumento,
      forPresentacionId: tipoPresentacionId,
      tipDocSustentoId: documentoId,
    };
  }

  private getTiposDocumento(): void {
    this.comunControllerService
      .obtenerPorTipoUsingGet({
        municipalidadId: 1,
        tipoMaestroId: 24,
      })
      .subscribe({
        next: (response) => {
          this.tiposDocumento = response;
        },
      });
  }

  private getTiposPresentacion(): void {
    this.comunControllerService
      .obtenerPorTipoUsingGet({
        municipalidadId: 1,
        tipoMaestroId: 25,
      })
      .subscribe({
        next: (response) => {
          this.tiposPresentacion = response;
        },
      });
  }

  /**
   * GETTERS
   */

  get documentoId(): AbstractControl {
    return this.formulario.controls['documentoId'];
  }

  get numDocumento(): AbstractControl {
    return this.formulario.controls['numDocumento'];
  }

  get folio(): AbstractControl {
    return this.formulario.controls['folio'];
  }

  get tipoPresentacionId(): AbstractControl {
    return this.formulario.controls['tipoPresentacionId'];
  }
}

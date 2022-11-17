import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { 
  TIP_PREDIO_ID, 
  TIP_VIA_ID,
  TIP_ZONA_URBANA_ID,
  TIP_SUBZONA_URBANA_ID,
  TIP_EDIFICACION_ID,
  TIP_INTERIOR_ID
} from 'src/app/core/data/datos-comunes';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';
import { 
  DepartamentoControllerService,
  ProvinciaControllerService,
  DistritoControllerService } from 'src/app/api/ubigeo/services';
import { DomicilioRelacionadoRequest, DomicilioRelacionadoResponse } from 'src/app/api/contribuyente/models';
import { DomicilioRelacionadoControllerService } from 'src/app/api/contribuyente/services';


@Component({
  selector: 'app-dialog-upsert-domicilio-relacionado',
  templateUrl: './dialog-upsert-domicilio-relacionado.component.html',
  styleUrls: ['./dialog-upsert-domicilio-relacionado.component.scss']
})
export class DialogUpsertDomicilioRelacionadoComponent implements OnInit {
  @Input() public domRel!: DomicilioRelacionadoResponse;
  @Input() public municipalidadId!: number;
  @Input() public numContribuyente!: number;
  @Input() public numRelacionado!: number;

  submitted = false;
  isModeEdit = false;
  loading = false;

  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  tipoPredio: any[] = [];
  tipoVia: any[] = [];
  tipoZonaUrbana: any[] = [];
  tipoSubZona: any[] = [];
  tipoEdificacion: any[] = [];
  tipoInterior: any[] = [];

  formulario: FormGroup = this.fb.group({
    departamentoId: ['', Validators.required],
    provinciaId: ['', Validators.required],
    distritoId: ['', Validators.required],
    tipoPredioId: ['', Validators.required],
    tipoViaId: ['', Validators.required],
    desVia: ['', Validators.required],
    numeroPrincipal: [''],
    numeroAlterno: [''],
    letra1: [''],
    letra2: [''],
    manzana: [''],
    lote: [''],
    subLote: [''],
    zonaUrbanaId: [''],
    desZona: [''],
    subZonaId: [''],
    desSubSona: [''],
    edificacionId: [''],
    desEdificacion: [''],
    interiorId: [''],
    desInterior: [''],
    piso: [''],
    ingreso: [''],
    kilometro: [''],
    referencia: [''],
    tipRelacionadoId: [1]
  });

  constructor(
    public activeModal: NgbActiveModal, 
    private fb: FormBuilder,
    private comunControllerService: ComunControllerService,
    private alertService: AlertService,
    private departamentoService: DepartamentoControllerService,
    private provinciaService: ProvinciaControllerService,
    private distritotoService: DistritoControllerService,
    private domicilioRelacionadoService: DomicilioRelacionadoControllerService,
    private validationFormService: ValidationFormService) {}

  ngOnInit(): void {
    this.inicializarSelectores();    
  }

  private inicializarSelectores(): void {
    this.getDepartamentos();
    this.getProvincias(1);
    this.getDistritos(1,1);
    this.getTipoPredio();
    this.getTipoVia();
    this.getTipoZonaUrbana();
    this.getTipoSubZona();
    this.getTipoEdificacion();
    this.getTipoInterior();    
  }
 
  invalidControl(input: AbstractControl) {
    return this.validationFormService.isControlInvalid(input, this.submitted);
  }

  getTipoPredio(): void {
    this.obtenerDatosComunes(TIP_PREDIO_ID).subscribe({
      next: (response) => {
        this.tipoPredio = response;
      },
    });
  }

  getTipoVia(): void {
    this.obtenerDatosComunes(TIP_VIA_ID).subscribe({
      next: (response) => {
        this.tipoVia = response;
      },
    });
  }

  getTipoZonaUrbana(): void {
    this.obtenerDatosComunes(TIP_ZONA_URBANA_ID).subscribe({
      next: (response) => {
        this.tipoZonaUrbana = response;
      },
    });
  }

  getTipoSubZona(): void {
    this.obtenerDatosComunes(TIP_SUBZONA_URBANA_ID).subscribe({
      next: (response) => {
        this.tipoSubZona = response;
      },
    });
  }

  getTipoEdificacion(): void {
    this.obtenerDatosComunes(TIP_EDIFICACION_ID).subscribe({
      next: (response) => {
        this.tipoEdificacion = response;
      },
    });
  }

  getTipoInterior(): void {
    this.obtenerDatosComunes(TIP_INTERIOR_ID).subscribe({
      next: (response) => {
        this.tipoInterior = response;
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

  private getDepartamentos(): void {
    this.departamentoService.todosUsingGet().subscribe({
      next: (response) => {
        this.departamentos = response;
      },
    });
  } 
  changeDepartamento(item:any):void{
    if(this.isEmptyField("departamentoId")) return;
    this.getProvincias(this.getValue("departamentoId"));
  }

  private getProvincias(departamentoId: number = 1): void {
     this.provinciaService.filtrarPorDepartamentoUsingGet({idDepartamento: departamentoId})
     .subscribe({
      next: (response) => {
        this.provincias = response;
      },
    });
  }

  changeProvincia(item:any):void{
    if(this.isEmptyField("provinciaId")) return;
    this.getDistritos(this.getValue("departamentoId"), this.getValue("provinciaId"));
  }

  private getDistritos(departamentoId: number = 1, provinciaId: number=1) {
    this.distritotoService.filtrarPorProvinciaUsingGet({
      idDepartamento: departamentoId,
      idProvincia: provinciaId,
    })
    .subscribe({
     next: (response) => {
       this.distritos = response;
     },
   });
 }

onSubmit(): void {
  this.submitted = true;
  if (!this.loading && this.formulario.valid) {
    const payload = this.mapToPayload();
    if (this.isModeEdit) {
      //
    } else {
      this.crearDomicilioRelacionado(payload);
    }
  }else{
    this.alertService.warning("Ingrese los datos requeridos");
  }
}

private mapToPayload(): DomicilioRelacionadoRequest {
  const { 
    departamentoId,
    provinciaId,
    distritoId,
    tipoDomicilioId,
    tipoPredioId,
    tipRelacionadoId,
    tipoViaId,
    desVia,
    numeroPrincipal,
    numeroAlterno,
    letra1,
    letra2,
    manzana,
    lote,
    subLote,
    zonaUrbanaId,
    desZona,
    subZonaId,
    desSubSona,
    edificacionId,
    desEdificacion,
    interiorId,
    desInterior,
    piso,
    ingreso,
    kilometro,
    referencia
  } = this.formulario.value;
  //const folios = Number(folio);
  
  return {    
    // municipalidadId: this.municipalidadId,
    // contribuyenteNumero: this.numContribuyente,
    relContribuyenteNumero: this.numRelacionado,
    departamentoId: departamentoId,
    desInterior: desInterior,
    // descripcionDomicilio: '',
    distritoId: distritoId,    
    edificacionId: edificacionId,
    // estructurado: 0,
    fuenteInfoId: 1,
    ingreso: ingreso,
    kilometro: kilometro,
    // latitud: 0,
    letra1: letra1,
    letra2: letra2,
    // longitud: 0,
    lote: lote,
    manzana: manzana,    
    numero1: numeroPrincipal,
    numero2: numeroAlterno,
    piso: piso,
    provinciaId: provinciaId,
    referencia: referencia,    
    subLote: subLote,
    subZonaUrbanaId: subZonaId,
    // tipDomicilioId: tipoDomicilioId,
    tipInteriorId: interiorId,
    tipPredioId: tipoPredioId,
    // tipRelacionadoId: tipRelacionadoId,
    viaDepartamentoId: 0,
    viaDistritoId: 0,
    viaId: tipoViaId,
    viaProvinciaId: 0,
    zonaUrbanaId: 1, //zonaUrbanaId
    // activo: 1
    domRelacionadoNumero: 0,
  };
}

private crearDomicilioRelacionado(payload: DomicilioRelacionadoRequest): void {
  this.loading = true;
  console.log(payload);
  this.domicilioRelacionadoService
    .crearUsingPost4({
      body: payload,
      contribuyenteNumero: this.numContribuyente,
      municipalidadId: this.municipalidadId,
    })
    .pipe(finalize(() => (this.loading = false)))
    .subscribe({
      next: (response: any) => {
        this.close(response.data);
        /*console.log(response);
        if (response && response.success) {
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

 getValue(name:string){
  return this.formulario.controls[name].value
}

 isEmptyField(name:string){
  return this.formulario.controls[name].value==null || this.formulario.controls[name].value==""; 
}

close(response?: any) {
  this.activeModal.close(response);
}

get departamentoId(): AbstractControl {
  return this.formulario.controls['departamentoId'];
}
get provinciaId(): AbstractControl {
  return this.formulario.controls['provinciaId'];
}
get distritoId(): AbstractControl {
  return this.formulario.controls['distritoId'];
}
get tipoPredioId(): AbstractControl {
  return this.formulario.controls['tipoPredioId'];
}
get tipoViaId(): AbstractControl {
  return this.formulario.controls['tipoViaId'];
}
get desVia(): AbstractControl {
  return this.formulario.controls['desVia'];
}

}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomicilioBuscarResponse, DomicilioRequest } from 'src/app/api/contribuyente/models';
import { DomicilioContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { ComunControllerService } from 'src/app/api/datoscomunes/services';
import { DepartamentoControllerService, DistritoControllerService, ProvinciaControllerService } from 'src/app/api/ubigeo/services';
import { TIP_DOMICILIO_ID, TIP_EDIFICACION_ID, TIP_INTERIOR_ID, TIP_PREDIO_ID, TIP_SUBZONA_URBANA_ID, TIP_VIA_ID, TIP_ZONA_URBANA_ID } from 'src/app/core/data/datos-comunes';
import { ValidationFormService } from 'src/app/core/services/validation-form.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-dialog-upsert-domicilio',
  templateUrl: './dialog-upsert-domicilio.component.html',
  styleUrls: ['./dialog-upsert-domicilio.component.scss']
})
export class DialogUpsertDomicilioComponent implements OnInit {
  @Input() public domicilio!: DomicilioBuscarResponse;
  @Input() contribuyenteNumero !: number;

  submitted = false;
  isModeEdit = false;
  loading = false;
  //contribuyenteNumero = 1;
  municipalidadId = 1;

  departamentos: any[] = [];
  provincias: any[] = [];
  distritos: any[] = [];
  tipoDomicilio: any[] = [];
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
    tipoDomicilioId: ['', Validators.required],
    tipoPredioId: ['', Validators.required],
    tipoViaId: ['', Validators.required],
    desVia: ['',Validators.required],
    numeroPrincipal: [''],
    numeroAlterno: [''],
    letra1: ['',Validators.maxLength(6)],
    letra2: ['',Validators.maxLength(6)],
    manzana: ['',Validators.maxLength(6)],
    lote: ['',Validators.maxLength(6)],
    subLote: ['',Validators.maxLength(6)],
    zonaUrbanaId: [''],
    desZona: [''],
    subZonaId: [''],
    desSubSona: [''],
    edificacionId: [''],
    desEdificacion: [''],
    interiorId: [''],
    desInterior: ['',Validators.maxLength(6)],
    piso: ['',Validators.maxLength(6)],
    ingreso: ['',Validators.maxLength(6)],
    kilometro: ['',Validators.maxLength(6)],
    referencia: ['',Validators.maxLength(100)]
  });

  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private comunControllerService: ComunControllerService,
    private departamentoControllerService: DepartamentoControllerService,
    private provinciaControllerService: ProvinciaControllerService,
    private distritoControllerService: DistritoControllerService,
    private domicilioContribuyenteControllerService: DomicilioContribuyenteControllerService,
    private validationFormService: ValidationFormService) { }

  ngOnInit(): void {
    this.isModeEdit = !!this.domicilio;
    if (this.isModeEdit) {
      this.updateFormulario(this.domicilio);
    }
    else{
      this.inicializarSelectores();
    }
  }

  private inicializarSelectores(): void {
    this.getTipoPredio();
    this.getTipoVia();
    this.getTipoZonaUrbana();
    this.getTipoSubZona();
    this.getTipoEdificacion();
    this.getTipoInterior();
    this.getDepartamentos();
    this.getTipoDomicilio();
  }

  getDepartamentos():void{
    this.departamentoControllerService.todosUsingGet().subscribe({
      next: (response) => {
        this.departamentos = response;
      },
    });
  }

  changeDepartamento(item:any):void{
    if(this.isEmptyField("departamentoId")) return;
    this.getProvincias(this.getValue("departamentoId"));
  }

  getProvincias(idDepartamento:number):void{
    this.provinciaControllerService.filtrarPorDepartamentoUsingGet({idDepartamento}).subscribe({
      next: (response:any) => {
        this.provincias = response;
      },
    });
  }

  changeProvincia(item:any):void{
    if(this.isEmptyField("provinciaId")) return;
    this.getDistritos(this.getValue("departamentoId"), this.getValue("provinciaId"));
  }

  getDistritos(idDepartamento:number, idProvincia:number):void{
    console.log("distritos ",idDepartamento, idProvincia);
    this.distritoControllerService.filtrarPorProvinciaUsingGet({idDepartamento: idDepartamento, idProvincia:idProvincia}).subscribe({
      next: (response:any) => {
        this.distritos = response;
      },
    });
  }

  getTipoDomicilio(): void {
    this.obtenerDatosComunes(TIP_DOMICILIO_ID).subscribe({
      next: (response:any) => {
        this.tipoDomicilio = response;
      },
    });
  }

  getTipoPredio(): void {
    this.obtenerDatosComunes(TIP_PREDIO_ID).subscribe({
      next: (response:any) => {
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

  getValue(name:string){
    return this.formulario.controls[name].value
  }

  isEmptyField(name:string){
    return this.formulario.controls[name].value==null || this.formulario.controls[name].value=="";
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.loading && this.formulario.valid) {
      const payload = this.mapToPayload();
      console.log("payload",payload);
      if (this.isModeEdit) {
        this.actualizarDomicilio(payload);
      } else {
        this.crearDomicilio(payload);
      }
    }
  }

  private mapToPayload(): DomicilioRequest {
    const {
      departamentoId,
      provinciaId,
      distritoId,
      tipoDomicilioId,
      tipoPredioId,
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
    //   accion: 'CREAR',
      departamentoId: departamentoId,
      descripcionDomicilio: '',
      descripcionInterior: desInterior,
      distritoId: distritoId,
    //   domicilioContribuyenteNumero: 0,
      edificacionId: edificacionId,
      estructurado: 0,
      fuenteInformacionId: 1,
      ingreso: ingreso,
      kilometro: kilometro,
      latitud: 0,
      letra1: letra1,
      letra2: letra2,
      longitud: 0,
      lote: lote,
      manzana: manzana,
      numero1: numeroPrincipal,
      numero2: numeroAlterno,
      piso: piso,
      provinciaId: provinciaId,
      referencia: referencia,
      subLote: subLote,
      subZonaUrbanaId: subZonaId,
      tipDomicilioId: tipoDomicilioId,
      tipoInteriorId: interiorId,
      tipoPredioId: tipoPredioId,
      viaDepartamentoId: 0,
      viaDistritoId: 0,
      viaId: tipoViaId,
      viaProvinciaId: 0,
      zonaUrbanaId: 1
    };
  }

  private crearDomicilio(payload: DomicilioRequest): void {
    this.loading = true;
    this.domicilioContribuyenteControllerService
      .crearUsingPost4({
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

  private actualizarDomicilio(payload: DomicilioRequest): void {
    this.loading = true;
    // payload.accion="ACTUALIZAR";
    // payload.domicilioContribuyenteNumero = this.domicilio.domicilioContribuyenteNumero!;
    this.domicilioContribuyenteControllerService
      .actualizarUsingPut4({
        body: payload,
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: Number(this.contribuyenteNumero),
        domicilioContribuyenteNumero: Number(this.domicilio.domicilioContribuyenteNumero),
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

  close(response?: any) {
    this.activeModal.close(response);
  }

  private updateFormulario(domicilio: DomicilioBuscarResponse) {
    this.loading = true;
    this.domicilioContribuyenteControllerService
      .obtenerUsingGet1({
        municipalidadId: domicilio.municipalidadId!,
        contribuyenteNumero: domicilio.contribuyenteNumero!,
        domicilioContribuyenteNumero: domicilio.domicilioContribuyenteNumero!
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response : any) => {
          console.log("response",response);
          let data = response.data;
          this.formulario.patchValue({
            departamentoId: data.departamentoId,
            provinciaId: data.provinciaId,
            distritoId: data.distritoId,
            tipoDomicilioId: data.tipoDomicilioId,
            tipoPredioId: data.tipoPredioId,
            tipoViaId: data.viaId,
            desVia: data.desVia,
            numeroPrincipal: data.numero1,
            numeroAlterno: data.numero2,
            letra1: data.letra1,
            letra2: data.letra2,
            manzana: data.manzana,
            lote: data.lote,
            subLote: data.subLote,
            zonaUrbanaId: data.zonaUrbanaId,
            desZona: data.desZona,
            subZonaId: data.subZonaUrbanaId,
            desSubSona: data.desSubSona,
            edificacionId: data.edificacionId,
            desEdificacion: data.desEdificacion,
            interiorId: data.tipoInteriorId,
            desInterior: data.descripcionInterior,
            piso: data.piso,
            ingreso: '1', //data.ingreso,
            kilometro: data.kilometro,
            referencia: data.referencia
          });
          this.inicializarSelectores();
          this.changeDepartamento(null);
          this.changeProvincia(null);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  get kilometro() {
    return this.formulario.get('kilometro');
  }
  get letra1() {
    return this.formulario.get('letra1');
  }
  get letra2() {
    return this.formulario.get('letra2');
  }
  get desInterior() {
    return this.formulario.get('desInterior');
  }
  get piso() {
    return this.formulario.get('piso');
  }
  get ingreso() {
    return this.formulario.get('ingreso');
  }
  get referencia() {
    return this.formulario.get('referencia');
  }
  get manzana() {
    return this.formulario.get('manzana');
  }
  get lote() {
    return this.formulario.get('lote');
  }
  get subLote() {
    return this.formulario.get('subLote');
  }
}

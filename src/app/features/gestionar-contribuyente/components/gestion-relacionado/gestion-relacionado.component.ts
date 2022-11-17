import { Component, Input,OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, Subscription } from 'rxjs';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { DialogUpsertDomicilioRelacionadoComponent } from './dialog-upsert-domicilio-relacionado/dialog-upsert-domicilio-relacionado.component';
import { DialogUpsertRelacionadoComponent } from './dialog-upsert-relacionado/dialog-upsert-relacionado.component';
import { RelacionadoBuscarResponse,
  DomicilioRelacionadoResponse
 } from 'src/app/api/contribuyente/models';
import { RelacionadoControllerService } from 'src/app/api/contribuyente/services';
import { DomicilioRelacionadoControllerService } from 'src/app/api/contribuyente/services';
import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';

@Component({
  selector: 'app-gestion-relacionado',
  templateUrl: './gestion-relacionado.component.html',
  styleUrls: ['./gestion-relacionado.component.scss']
})
export class GestionRelacionadoComponent implements OnInit, OnDestroy {
  @Input() numContribuyente!: number;
  @Input() municipalidadId!: number;
  numRelacionado: number = 0;

  dataSource: RelacionadoBuscarResponse[] = [];
  selectedItem: RelacionadoBuscarResponse | undefined = undefined;
  dataSourceDomRel: DomicilioRelacionadoResponse[] = [];
  selectedItemDomRel: DomicilioRelacionadoResponse | undefined = undefined;
  loading: boolean = false;

  subscription: Subscription | undefined;

  constructor(
    private modalService: NgbModal,
    private alertService: AlertService,
    private relacionadoService: RelacionadoControllerService,
    private domicilioRelacionadoService: DomicilioRelacionadoControllerService,
    private dialogConfirmService: DialogConfirmService
    ) {}

  ngOnInit(): void {
    if(!this.numContribuyente){
      this.numContribuyente = 2;
    }
    this.getRelacionado();
    //this.getDomRelacionado(1);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onShowCreate() {
    this.onShowDialogUpsert();
  }

  private getRelacionado(): void {
    this.loading = true;
    this.relacionadoService
      .listarUsingGet1({
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: this.numContribuyente,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.dataSource = [...response];
          this.selectedItem = undefined;
        },
      });
  }
  onGetDomRelacionado(relacionadoSelected?: RelacionadoBuscarResponse){
    if (relacionadoSelected) {
      this.numRelacionado = Number(relacionadoSelected.relContribuyenteNumero);
      this.getDomRelacionado(Number(relacionadoSelected.relContribuyenteNumero));
    }
  }

  private getDomRelacionado(relContribuyenteNumero: number): void {
    this.loading = true;
    this.domicilioRelacionadoService
      .listarUsingGet({
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: this.numContribuyente,
        relContribuyenteNumero: relContribuyenteNumero
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.dataSourceDomRel = [...response];
        },
      });
  }

  onShowDialogUpsert(relacionadoSelected?: RelacionadoBuscarResponse) {
    const modalRef = this.modalService.open(
      DialogUpsertRelacionadoComponent,
      {
        centered: true,
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
      }
    );

    modalRef.componentInstance.municipalidadId = this.municipalidadId;
    modalRef.componentInstance.numContribuyente = this.numContribuyente;
    if (relacionadoSelected) {
      modalRef.componentInstance.relacionado = relacionadoSelected;
    }

    modalRef.closed.subscribe({
      next: (response) => {
        console.log("xx "+ response);
        this.getRelacionado();
        if (response) {
          console.log("cargar relacionado "+ response);
          //this.getRelacionado();
        }
      },
    });
  }

  onShowDialogDomRelUpsert(domRelSelected?: DomicilioRelacionadoResponse) {
    if(this.dataSourceDomRel.length > 0){
      this.alertService.warning("El Relacionado ya tiene un domicilio registrado.");
    }else{
      const modalRef = this.modalService.open(
        DialogUpsertDomicilioRelacionadoComponent,
        {
          centered: true,
          backdrop: 'static',
          keyboard: false,
          size: 'xl',
        }
      );
      modalRef.componentInstance.municipalidadId = this.selectedItem?.municipalidadId;
      modalRef.componentInstance.numContribuyente = this.selectedItem?.contribuyenteNumero;
      modalRef.componentInstance.numRelacionado = this.selectedItem?.relContribuyenteNumero;
      if (domRelSelected) {
        modalRef.componentInstance.domRel = domRelSelected;
      }

      modalRef.closed.subscribe({
        next: (response) => {
          this.getDomRelacionado(Number(this.selectedItem?.relContribuyenteNumero));
          if (response) {
          }
        },
      });
    }
  }

  onRemoveItem(relacionadoSelected?: RelacionadoBuscarResponse) {
    if (relacionadoSelected) {
      const dialogRef = this.dialogConfirmService.confirm({
        callback: () =>
          this.relacionadoService.anularUsingDelete4({
              municipalidadId: Number(relacionadoSelected.municipalidadId),
              contribuyenteNumero: Number(relacionadoSelected.contribuyenteNumero),
              relContribuyenteNumero: Number(relacionadoSelected.relContribuyenteNumero)
          }),
      });

      dialogRef.closed.subscribe({
        next: (response) => {
          if (response) {
            this.getRelacionado();
          }
        },
      });
    }
  }

  onRemoveItemDomRel(domrelSelected?: DomicilioRelacionadoResponse) {
    if (domrelSelected) {
      const dialogRef = this.dialogConfirmService.confirm({
        callback: () =>
          this.domicilioRelacionadoService.anularUsingDelete3({
              municipalidadId: Number(domrelSelected.municipalidadId),
              contribuyenteNumero: Number(domrelSelected.contribuyenteNumero),
              relContribuyenteNumero: Number(domrelSelected.relContribuyenteNumero),
              domRelacionadoNumero: Number(domrelSelected.domRelacionadoNumero)
          }),
      });

      dialogRef.closed.subscribe({
        next: (response) => {
          if (response) {
            this.getDomRelacionado(Number(domrelSelected.relContribuyenteNumero));
          }
        },
      });
    }
  }

  onSelectedItem(item: RelacionadoBuscarResponse) {
    this.selectedItem = item;
    this.onGetDomRelacionado(this.selectedItem);
  }

  onDomRelSelectedItem(item: DomicilioRelacionadoResponse) {
    this.selectedItemDomRel = item;
  }

}

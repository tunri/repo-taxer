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

  dataSource: ContactoContribuyenteListaResponse[] = [];
  loading: boolean = false;
  selectedItem: ContactoContribuyenteListaResponse | undefined = undefined;

  subscription: Subscription | undefined;

  constructor(
    private modalService: NgbModal,
    private contactoContribuyenteService: ContactoContribuyenteControllerService,
    private dialogConfirmService: DialogConfirmService
  ) {}

  ngOnInit(): void {
    this.getMediosContacto();
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
	 * @param sustentoSelected: Fila Seleccionada
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

    if (contactoSelected) {
      modalRef.componentInstance.contacto = contactoSelected;
    }

    modalRef.closed.subscribe({
      next: (response) => {
        if (response) {
          this.getMediosContacto();
        }
      },
    });
  }
	/**
	 * Metodo que invoca el modal de confirmacion
	 * @param sustentoSelected: Fila Seleccionada
	 */
  onRemoveItem(contactoSelected?: ContactoContribuyenteListaResponse) {
    if (contactoSelected) {
      const dialogRef = this.dialogConfirmService.confirm({
        callback: () =>
          this.contactoContribuyenteService.quitarUsingDelete({
            contribuyenteNumero: Number(contactoSelected.contribuyenteNumero),
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
  }

  onSelectedItem(item: ContactoContribuyenteListaResponse) {
    this.selectedItem = item;
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
          this.dataSource = response;
          this.selectedItem = undefined;
        },
      });
  }
}

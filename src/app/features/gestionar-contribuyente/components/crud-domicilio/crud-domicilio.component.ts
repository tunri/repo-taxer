import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomicilioBuscarResponse } from 'src/app/api/contribuyente/models';
import { DomicilioContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { DialogUpsertDomicilioComponent } from './dialog-upsert-domicilio/dialog-upsert-domicilio.component';
import { finalize } from 'rxjs';
import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';

@Component({
  selector: 'app-crud-domicilio',
  templateUrl: './crud-domicilio.component.html',
  styleUrls: ['./crud-domicilio.component.scss'],
})
export class CrudDomicilioComponent implements OnInit {
  @Input() numContribuyente!: number;
  @Input() municipalidadId!: number;

  dataSource: DomicilioBuscarResponse[] = [];
  loading = false;
  selectedItem: DomicilioBuscarResponse | undefined = undefined;

  constructor(
    private modalService: NgbModal,
    private domicilioContribuyenteControllerService: DomicilioContribuyenteControllerService,
    private dialogConfirmService: DialogConfirmService
  ) {}

  ngOnInit(): void {
    if (this.numContribuyente) {
      this.getDomicilios();
    }
  }

  onShowDialogUpsert(domicilioSelected?: DomicilioBuscarResponse) {
    const modalRef = this.modalService.open(DialogUpsertDomicilioComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'xl',
    });

    modalRef.componentInstance.contribuyenteNumero = this.numContribuyente;

    if (domicilioSelected) {
      modalRef.componentInstance.domicilio = domicilioSelected;
    }

    modalRef.closed.subscribe({
      next: (response) => {
        if (response) {
          this.getDomicilios();
        }
      },
    });
  }

  private getDomicilios(): void {
    this.loading = true;
    this.domicilioContribuyenteControllerService
      .listarPorContribuyenteUsingGet2({
        municipalidadId: this.municipalidadId,
        contribuyenteNumero: this.numContribuyente,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.dataSource = response;
          this.selectedItem = undefined;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  onSelectedItem(item: DomicilioBuscarResponse) {
    this.selectedItem = item;
  }

  onShowCreate() {
    this.onShowDialogUpsert();
  }

  onShowUpdate(domicilioSelected: DomicilioBuscarResponse | undefined) {
    if (domicilioSelected) {
      this.onShowDialogUpsert(domicilioSelected);
    }
  }

  onRemoveItem(domicilioSelected: DomicilioBuscarResponse | undefined) {
    if (domicilioSelected) {
      const dialogRef = this.dialogConfirmService.confirm({
        callback: () =>
          this.domicilioContribuyenteControllerService.anularUsingDelete2({
            municipalidadId: this.municipalidadId,
            contribuyenteNumero: Number(domicilioSelected.contribuyenteNumero),
            domicilioContribuyenteNumero: Number(
              domicilioSelected.domicilioContribuyenteNumero
            ),
          }),
      });

      dialogRef.closed.subscribe({
        next: (response) => {
          console.log(response, 'response close');
          if (response) {
            this.getDomicilios();
          }
        },
      });
    }
  }
}

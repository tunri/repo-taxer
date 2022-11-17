/**
 * Servicio para operaciones con el modal confirmacion
 * @author Jerson
 */

import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DialogConfirmComponent } from './dialog-confirm.component';

export type ConfirmOptions = {
  title?              : string;                // Titulo
  message?            : string;                // mensaje
  msgResponseError?   : string;                // mensaje de error de respuesta (Callback)
  msgResponseSuccess? : string;                // mensaje de success de respuesta (Callback)
  callback?           : () => Observable<any>; // Funcion para invocar un observable (Servicio)
};

const initualValues: ConfirmOptions = {
  title: '¿ Anular registro ?',
  message: 'Perderá el registro permanentemente',
  msgResponseError: 'No se pudo realizar la acción!',
  msgResponseSuccess: 'Se guardaron los cambios!',
};

@Injectable({
  providedIn: 'root',
})
export class DialogConfirmService {
  constructor(private modalService: NgbModal) {}

  /**
   * Metodo para invocar el popup de confirmacion
   * @param options: Opciones de  Configuracion
   * @returns {NgModuleRef}
   */
  confirm(options?: ConfirmOptions) {
    const modalRef = this.modalService.open(DialogConfirmComponent, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      modalDialogClass: 'nsrtm-dialog-confirm',
    });

    modalRef.componentInstance.options = { ...initualValues, ...options };

    return modalRef;
  }
}

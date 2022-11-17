import { Component, TemplateRef } from '@angular/core';

import { AlertService } from './alert.service';

@Component({
  selector: 'nsrtm-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  host: { '[class.ngb-toasts]': 'true' },
})
/**
 * Clase del componente Modal componente.
 *
 * @class ModalComponent
 */
export class AlertaComponent {
  /**
   * Construcctor de la clase AlertaComponent.
   * @constructor
   */
  constructor(public toastService: AlertService) {}

  /**
   * Función para identificar la plantilla.
   * @method isTemplate
   * @param { any } toast
   */
  isTemplate(toast: any | null) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  /**
   * Función para obtener el ícono
   * @method geticon
   * @param { string } clas
   */
  geticon(clas: string | undefined) {
    if (clas != undefined)
      switch (clas.split(' ')[0]) {
        case 'bg-alert-success':
          return 'icon-check-circle';
        case 'bg-alert-warning':
          return 'icon-alert-triangle';
        case 'bg-alert-info':
          return 'icon-info';
        default:
          return 'icon-slash';
      }
    return '';
  }

  /**
   * Función para obtener el título
   * @method getTitulo
   * @param { string } clas
   */
  getTitulo(clas: string) {
    switch (clas.split(' ')[0]) {
      case 'bg-alert-success':
        return 'Mensaje de confirmación';
      case 'bg-alert-warning':
        return 'Mensaje de alerta';
      case 'bg-alert-info':
        return 'Mensaje informativo';
      default:
        return 'Mensaje fallido';
    }
  }
}

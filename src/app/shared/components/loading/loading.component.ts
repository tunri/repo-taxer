import { Component, Input } from '@angular/core';

@Component({
  selector: 'nsrtm-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
/**
 * Clase del componente Modal componente.
 *
 * @class ModalComponent
 */
export class LoadingComponent {
  /**
   * Declaración de variables
   */
  @Input() message: string | undefined =
    'Estamos cargando la información solicitada';
}

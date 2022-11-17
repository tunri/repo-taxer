import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nsrtm-loading',
  templateUrl: './nsrtm-loading.component.html',
  styleUrls: ['./nsrtm-loading.component.scss']
})

/**
 * Clase del componente Loading componente.
 *
 * @class LoadingComponent
*/
export class NsrtmLoadingComponent implements OnInit {
  
  /**
	 * Declaración de variables
	 */
  @Input() message: string | undefined = 'Estamos cargando la información solicitada';

  constructor() { }

  ngOnInit(): void {
  }

}

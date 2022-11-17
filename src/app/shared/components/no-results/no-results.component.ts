/**
 * Componente mostrar contenido sin resultados, sin datos.
 * Utilizar principalmente cuando no se encontraros datos, cuando la lista esta vacia, etc.
 * @author jerson
 */

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nsrtm-no-results',
  templateUrl: './no-results.component.html',
  styleUrls: ['./no-results.component.scss'],
})
export class NoResultsComponent implements OnInit {

  @Input() message: string = 'No se econtraron resultados!';

  constructor() {}

  ngOnInit(): void {}
}

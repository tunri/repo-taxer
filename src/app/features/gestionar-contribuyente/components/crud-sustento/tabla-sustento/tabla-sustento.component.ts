/**
 * Componente Propio de Tabla Sustento
 * @input: dataSource {DocumentoSustentoTabla} : Listado de datos sustento
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentoSustentoBuscarResponse } from 'src/app/api/contribuyente/models';
import { DocumentoSustentoTabla } from 'src/app/core/models/custom-contribuyente.model';

@Component({
  selector: 'tabla-sustento',
  templateUrl: './tabla-sustento.component.html',
  styleUrls: ['./tabla-sustento.component.scss'],
})
export class TablaSustentoComponent implements OnInit {
  // dataSource es el array princiapl
  @Input()
  get dataSource(): DocumentoSustentoTabla[] {
    return this._dataSource;
  }
  set dataSource(data: DocumentoSustentoBuscarResponse[]) {
    this._dataSource = data.map((c) => ({ ...c, selected: false }));
    this.onChangePaginate();
  }

  @Input() loading: boolean = false;

  @Output() selected = new EventEmitter<DocumentoSustentoBuscarResponse>();

  _dataSource: DocumentoSustentoTabla[] = [];

  // variables paginacion
  tablePaginacion: DocumentoSustentoTabla[] = [];
  page = 1;
  to = 0;
  from = 0;
  pageSize = 10;
  pageSizes = [10, 15, 20];

  constructor() {}

  ngOnInit(): void {}

  getClassNameStatus(item: DocumentoSustentoTabla) {
    return item.activo ? 'labels-activo' : 'labels-inactivo';
  }

  select(item: DocumentoSustentoTabla) {
    this.tablePaginacion.forEach((c) => {
      c.selected = c.docSusContribuyenteId === item.docSusContribuyenteId;
    });
    // this.tablePaginacion = this.tablePaginacion.map((tablleItem) => {
    //   tablleItem.selected = false;
    //   return tablleItem;
    // });
    // item.selected = true;
    const { selected, ...rest } = item;
    this.selected.emit(rest);
  }

  onChangePaginate() {
    this.paginacionTable();
    this.pagination();
    this.selected.emit(undefined);
  }

  private paginacionTable() {
    this.tablePaginacion = this._dataSource
      .map((item, i) => ({ id: i + 1, ...item }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  private pagination() {
    this.to = this.pageSize * this.page - this.pageSize + 1;
    this.from =
      this.pageSize * this.page - (this.pageSize - this.tablePaginacion.length);
  }
}

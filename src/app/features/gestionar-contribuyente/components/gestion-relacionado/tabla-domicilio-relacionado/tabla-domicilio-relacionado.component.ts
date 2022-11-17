import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomicilioRelacionadoBuscarResponse } from 'src/app/api/contribuyente/models';
import { DomicilioRelacionadoModel } from 'src/app/core/models/custom-contribuyente.model';

@Component({
  selector: 'app-tabla-domicilio-relacionado',
  templateUrl: './tabla-domicilio-relacionado.component.html',
  styleUrls: ['./tabla-domicilio-relacionado.component.scss']
})
export class TablaDomicilioRelacionadoComponent implements OnInit {
  // dataSource es el array princiapl
  @Input()
  get dataSource(): DomicilioRelacionadoModel[] {
    return this._dataSource;
  }
  set dataSource(data: DomicilioRelacionadoBuscarResponse[]) {
    this._dataSource = data.map((c) => ({ ...c, selected: false }));
    this.onChangePaginate();
  }

  @Input() loading: boolean = false;
  @Output() selected = new EventEmitter<DomicilioRelacionadoBuscarResponse>();
  _dataSource: DomicilioRelacionadoModel[] = [];

  // variables paginacion
  tablePaginacion: DomicilioRelacionadoModel[] = [];
  page = 1;
  to = 0;
  from = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor() {}

  ngOnInit(): void {}

  getClassNameStatus(item: DomicilioRelacionadoModel) {
    return item.activo ? 'labels-activo' : 'labels-inactivo';
  }

  select(item: DomicilioRelacionadoModel) {
    this._dataSource = this._dataSource.map((tablleItem) => {
      tablleItem.selected = false;
      return tablleItem;
    });
    item.selected = true;
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

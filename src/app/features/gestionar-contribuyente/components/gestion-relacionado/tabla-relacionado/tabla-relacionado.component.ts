import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RelacionadoBuscarResponse } from 'src/app/api/contribuyente/models';
import { RelacionadoBuscarModel } from 'src/app/core/models/custom-contribuyente.model';

@Component({
  selector: 'app-tabla-relacionado',
  templateUrl: './tabla-relacionado.component.html',
  styleUrls: ['./tabla-relacionado.component.scss']
})
export class TablaRelacionadoComponent implements OnInit {
  // dataSource es el array princiapl
  @Input()
  get dataSource(): RelacionadoBuscarModel[] {
    return this._dataSource;
  }
  set dataSource(data: RelacionadoBuscarResponse[]) {
    this._dataSource = data.map((c) => ({ ...c, selected: false }));
    this.onChangePaginate();
  }

  @Input() loading: boolean = false;
  @Output() selected = new EventEmitter<RelacionadoBuscarResponse>();
  _dataSource: RelacionadoBuscarModel[] = [];

  // variables paginacion
  tablePaginacion: RelacionadoBuscarModel[] = [];
  page = 1;
  to = 0;
  from = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor() {}

  ngOnInit(): void {}

  getClassNameStatus(item: RelacionadoBuscarModel) {
    return item.estadoDsc ? 'labels-activo' : 'labels-inactivo';
  }

  select(item: RelacionadoBuscarModel) {
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

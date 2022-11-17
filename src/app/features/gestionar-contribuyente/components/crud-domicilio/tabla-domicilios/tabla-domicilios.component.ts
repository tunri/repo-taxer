import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DomicilioBuscarResponse } from 'src/app/api/contribuyente/models';
import { DomicilioTabla } from 'src/app/core/models/custom-contribuyente.model';

@Component({
  selector: 'tabla-domicilios',
  templateUrl: './tabla-domicilios.component.html',
  styleUrls: ['./tabla-domicilios.component.scss']
})
export class TablaDomiciliosComponent implements OnInit {
  @Input()
  get dataSource(): DomicilioTabla[] {
    return this._dataSource;
  }
  set dataSource(data: DomicilioBuscarResponse[]) {
    this._dataSource = data.map((c) => ({ ...c, selected: false }));
    this.onChangePaginate();
  }

  @Input() loading: boolean = false;

  @Output() selected = new EventEmitter<DomicilioBuscarResponse>();

  _dataSource: DomicilioTabla[] = [];

  // variables paginacion
  tablePaginacion: DomicilioTabla[] = [];
  page = 1;
  to = 0;
  from = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor() {}

  ngOnInit(): void {}

  getClassNameStatus(item: DomicilioTabla) {
    return item.estadoDsc?.toLocaleLowerCase() == 'vigente' ? 'labels-activo' : 'labels-inactivo';
  }

  select(item: DomicilioTabla) {
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

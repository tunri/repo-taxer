import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'nsrtm-pagination',
  templateUrl: './nsrtm-pagination.component.html',
  styleUrls: ['./nsrtm-pagination.component.scss'],
})
export class NsrtmPaginationComponent implements OnInit {
  @Input() dataSource: any[] = [];
  @Input() pageSizes: number[] = [10, 15, 20];
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Input() to: number = 0;
  @Input() from: number = 0;
  @Input() page: number = 1;

  @Output() change = new EventEmitter<any>();

  collectionSize = this.dataSource.length;
  // tablePaginacion: any;
  // page = 1;
  // to = 0;
  // from = 0;

  constructor() {}

  ngOnInit(): void {
    // this.paginacionTable();
    // this.pagination();
  }

  onChangePaginate() {
    this.change.emit(true);
  }

  // private paginacionTable() {
  //   this.dataSource = this.dataSource
  //     .map((item, i) => ({ id: i + 1, ...item }))
  //     .slice(
  //       (this.page - 1) * this.pageSize,
  //       (this.page - 1) * this.pageSize + this.pageSize
  //     );
  // }
  // private pagination() {
  //   this.to = this.pageSize * this.page - this.pageSize + 1;
  // }
}

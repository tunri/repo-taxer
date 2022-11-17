/**
 * Componente Propio de Tabla Sustento
 * @input: dataSource {MedioContactoTabla} : Listado de datos medios de contacto
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactoContribuyenteListaResponse } from 'src/app/api/contribuyente/models';
import { MedioContactoTabla } from 'src/app/core/models/custom-contribuyente.model';

@Component({
	selector: 'tabla-medios-contacto',
	templateUrl: './tabla-medios-contacto.component.html',
	styleUrls: ['./tabla-medios-contacto.component.scss'],
})
export class TablaMediosContactoComponent implements OnInit {
	@Input()
	get dataSource(): MedioContactoTabla[] {
		return this._dataSource;
	}
	set dataSource(data: ContactoContribuyenteListaResponse[]) {
		this._dataSource = data.map((c, idx) => ({
			...c,
			selected: false,
			index: idx + 1,
		}));
		this.onChangePaginate();
	}

	@Input() loading? = false;

	@Output() selected = new EventEmitter<ContactoContribuyenteListaResponse>();

	_dataSource: MedioContactoTabla[] = [];

	// variables paginacion
	tablePaginacion: MedioContactoTabla[] = [];
	page = 1;
	to = 0;
	from = 0;
	pageSize = 10;
	pageSizes = [10, 15, 20];

	constructor() {}

	ngOnInit(): void {}

	// Función
	select(item: MedioContactoTabla) {
		this.tablePaginacion.forEach((c) => {
			c.selected = c.medConContribuyenteId === item.medConContribuyenteId;
		});
		const { selected, ...rest } = item;
		this.selected.emit(rest);
	}

	getClassNameStatus(item: ContactoContribuyenteListaResponse) {
		return item.activo ? 'labels-activo' : 'labels-inactivo';
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
			this.pageSize * this.page -
			(this.pageSize - this.tablePaginacion.length);
	}
}

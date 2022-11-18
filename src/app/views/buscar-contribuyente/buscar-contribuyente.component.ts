import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginaResponseOfListOfContribuyenteBuscarResponse } from 'src/app/api/contribuyente/models';
import { ContribuyenteControllerService } from 'src/app/api/contribuyente/services';
import { PATH_REGISTER_TAXPAYER } from 'src/app/core/data/slug-routes';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-buscar-contribuyente',
	templateUrl: './buscar-contribuyente.component.html',
	styleUrls: ['./buscar-contribuyente.component.scss'],
})
export class BuscarContribuyenteComponent implements OnInit {
	lista: any = [];
	responseBuscar!: PaginaResponseOfListOfContribuyenteBuscarResponse;
	form!: FormGroup;
	selected: any;
	isLoading: boolean = false;
	//Pagination
	tablePaginacion: any;
	page = 1;
	pageSize = 10;
	collectionSize = 0;
	to = 0;
	from = 0;
	buscarError!: any;
	cars = [
		{ id: 1, name: 'DNI' },
		{ id: 2, name: 'CARNE EXTRANJERIA' },
		{ id: 3, name: 'PASAPORTE' },
	];

	constructor(
		private formBuilder: FormBuilder,
		private contribuyenteService: ContribuyenteControllerService,
		private router: Router
	) {
		this.buscarError = null;
		this.selected = null;
		this.lista = [];
		this.collectionSize = 0;
		this.paginacionTable();
		this.pagination();
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			codigo: [null],
			tipoDocumento: [null],
			nroDocumento: [null],
			nombres: [null],
		});
	}

	validar = () => {
		if (
			this.isEmptyField('codigo') &&
			this.isEmptyField('tipoDocumento') &&
			this.isEmptyField('nroDocumento') &&
			this.isEmptyField('nombres')
		) {
			this.buscarError = 'Debe ingresar al menos un dato!';
			return false;
		}

		if (
			!this.isEmptyField('tipoDocumento') &&
			this.isEmptyField('nroDocumento')
		) {
			this.buscarError = 'Debe ingresar el número de documento';
			return false;
		}

		if (
			this.isEmptyField('tipoDocumento') &&
			!this.isEmptyField('nroDocumento')
		) {
			this.buscarError = 'Debe seleccionar el tipo de documento';
			return false;
		}
		return true;
	};

	isEmptyField(name: string) {
		return (
			this.form.controls[name].value == null ||
			this.form.controls[name].value == ''
		);
	}

	getValue(name: string) {
		return this.form.controls[name].value;
	}

	buscar = () => {
		this.buscarError = null;
		this.lista = [];
		if (!this.validar()) {
			return;
		}

		const params = {
			municipalidadId: 1,
			contribuyenteNumero: this.getValue('codigo'),
			docIdentidadId: this.getValue('tipoDocumento'),
			numDocIdentidad: this.getValue('nroDocumento'),
			apeNomRs: this.getValue('nombres'),
			page: 1,
			page_size: 10,
		};
		this.isLoading = true;
		console.log(params);
		this.contribuyenteService.buscarUsingGet(params).subscribe((result) => {
			console.log(result);
			this.responseBuscar = result;
			this.lista = this.responseBuscar.data;
			this.collectionSize = this.lista.length;
			this.isLoading = false;
		});
	};

	limpiar = () => {
		this.form.reset();
		this.buscarError = null;
	};

	changeFiltro = (event: any) => {
		this.limpiar();
		this.form.controls['tipoFiltro'].setValue(event.target.value);
	};

	select(item: any) {
		console.log('SELECTED');
		this.lista = this.lista.map((tablleItem: any) => {
			tablleItem.activo = false;
			return tablleItem;
		});
		item.activo = true;
		this.selected = item;
	}

	paginacionTable() {
		//if(this.tabla.length>0)
		// this.tablePaginacion = this.tabla
		//    .map((item:any, i:number) => ({ id: i + 1, ...item }))
		//    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
	}
	pagination() {
		//if(this.tablePaginacion.length>0){
		// this.to = ((this.pageSize * this.page) - this.pageSize ) + 1;
		// this.from = (this.pageSize * this.page) - (this.pageSize - this.tablePaginacion.length);
		//}
	}
	nuevoContribuyente = () => {
		this.router.navigate(['contribuyente/registro']);
	};
	editarContribuyente(itemRow: any) {
		this.router.navigateByUrl(
			`/${PATH_REGISTER_TAXPAYER}/${itemRow.contribuyenteNumero}`
		);
	}
}

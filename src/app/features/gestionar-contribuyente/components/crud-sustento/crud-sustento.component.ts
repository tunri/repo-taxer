/**
 * Componente Padre, encargado de orquestar los componentes dependientes
 * @input numContribuyente: Numbero de Contribuyente Generado
 * @input municipalidadId: Id de  Municipalidad
 */
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { DocumentoSustentoBuscarResponse } from 'src/app/api/contribuyente/models';
import { DocumentoSustentoControllerService } from 'src/app/api/contribuyente/services';
import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';
import { DialogUpsertSustentoComponent } from './dialog-upsert-sustento/dialog-upsert-sustento.component';

@Component({
	selector: 'crud-sustento',
	templateUrl: './crud-sustento.component.html',
	styleUrls: ['./crud-sustento.component.scss'],
})
export class CrudSustentoComponent implements OnInit {
	@Input() numContribuyente!: number;
	@Input() municipalidadId!: number;

	dataSource: DocumentoSustentoBuscarResponse[] = [];
	loading = false;
	selectedItem: DocumentoSustentoBuscarResponse | undefined = undefined;

	constructor(
		private modalService: NgbModal,
		private docSustentoService: DocumentoSustentoControllerService,
		private dialogConfirmService: DialogConfirmService
	) {}

	ngOnInit(): void {
		if (this.numContribuyente) {
			this.getDocumentosSustento();
		}
	}

	onShowCreate() {
		this.onShowDialogUpsert();
	}

	onShowUpdate(sustentoSelected: DocumentoSustentoBuscarResponse | undefined) {
		if (sustentoSelected) {
			this.onShowDialogUpsert(sustentoSelected);
		}
	}

	/**
	 * Metodo que invoca el modal de confirmacion
	 * @param sustentoSelected: Fila Seleccionada
	 */
	onRemoveItem(sustentoSelected: DocumentoSustentoBuscarResponse | undefined) {
		if (sustentoSelected) {
			const dialogRef = this.dialogConfirmService.confirm({
				callback: () =>
					this.docSustentoService.anularUsingDelete1({
						municipalidadId: this.municipalidadId,
						contribuyenteNumero: Number(
							sustentoSelected.contribuyenteNumero
						),
						docSusContribuyenteId: Number(
							sustentoSelected.docSusContribuyenteId
						),
					}),
			});

			dialogRef.closed.subscribe({
				next: (response) => {
					console.log(response, 'response close');
					if (response) {
						this.getDocumentosSustento();
					}
				},
			});
		}
	}

	/**
	 * Metodo que invoca el modal de registrar/editar sustento
	 * Se le envia numero de Contribuyente y id municipalidad, y se envia la fila si hay una fila seleccionada.
	 * @param sustentoSelected: Fila Seleccionada
	 */
	onShowDialogUpsert(sustentoSelected?: DocumentoSustentoBuscarResponse) {
		const modalRef = this.modalService.open(DialogUpsertSustentoComponent, {
			centered: true,
			backdrop: 'static',
			keyboard: false,
			size: 'lg',
		});

		modalRef.componentInstance.municipalidadId = this.municipalidadId;
		modalRef.componentInstance.contribuyenteNumero = this.numContribuyente;

		if (sustentoSelected) {
			modalRef.componentInstance.sustento = sustentoSelected;
		}

		modalRef.closed.subscribe({
			next: (response) => {
				if (response) {
					this.getDocumentosSustento();
				}
			},
		});
	}

	private getDocumentosSustento(): void {
		this.loading = true;
		this.docSustentoService
			.listarPorContribuyenteUsingGet1({
				municipalidadId: this.municipalidadId,
				contribuyenteNumero: this.numContribuyente,
			})
			.pipe(finalize(() => (this.loading = false)))
			.subscribe({
				next: (response) => {
					this.dataSource = response;
					this.selectedItem = undefined;
				},
				error: (err: any) => {
					console.log(err);
				},
			});
	}

	onSelectedItem(item: DocumentoSustentoBuscarResponse) {
		this.selectedItem = item;
	}
}

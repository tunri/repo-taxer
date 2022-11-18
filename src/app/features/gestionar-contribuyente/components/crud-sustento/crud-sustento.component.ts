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
import { CRUD_ACTION } from 'src/app/core/models/enums';
import { ContribuyenteStorageSingleton } from 'src/app/core/services/contribuyente-storage';
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
	@Input() numeroDj: number = 0;

	// lista intermediaria entre datasource y localStorage
	mainStorageDataSource: any[] = [];

	dataSource: DocumentoSustentoBuscarResponse[] = [];
	loading = false;
	selectedItem: DocumentoSustentoBuscarResponse | undefined = undefined;

	contribuyenteStorage = ContribuyenteStorageSingleton.getInstance();

	constructor(
		private modalService: NgbModal,
		private docSustentoService: DocumentoSustentoControllerService,
		private dialogConfirmService: DialogConfirmService
	) {}

	ngOnInit(): void {
		if (this.numContribuyente) {
			const sustentoFromStorage = this.contribuyenteStorage.getSustentos();
			if (sustentoFromStorage) {
				this.mainStorageDataSource = JSON.parse(sustentoFromStorage);
				this.getSustentoFromStorage();
			} else {
				this.getDocumentosSustento();
			}
		}
	}

	onShowCreate() {
		this.onShowDialogUpsert();
	}

	onShowUpdate(
		sustentoSelected: DocumentoSustentoBuscarResponse | undefined
	) {
		if (sustentoSelected) {
			this.onShowDialogUpsert(sustentoSelected);
		}
	}

	/**
	 * Metodo que invoca el modal de confirmacion
	 * @param sustentoSelected: Fila Seleccionada
	 */
	onRemoveItem(
		sustentoSelected: DocumentoSustentoBuscarResponse | undefined
	) {
		if (sustentoSelected) {
			if (this.numeroDj > 0) {
				this.removeFromStorage(sustentoSelected);
			} else {
				this.removeFromServer(sustentoSelected);
			}
		}
	}

	private removeFromStorage(sustentoSelected: any) {
		const dialogRef = this.dialogConfirmService.confirm();

		dialogRef.closed.subscribe({
			next: (response) => {
				if (response) {
					if (sustentoSelected.accion === CRUD_ACTION.CREATE) {
						this.deleteItemOfStorage(
							sustentoSelected.docSusContribuyenteId
						);
					} else {
						// actualice la accion
						this.updateStateToDelete(
							sustentoSelected.docSusContribuyenteId
						);
					}

					// guardar en localStorage
					this.contribuyenteStorage.saveSustento(
						this.mainStorageDataSource
					);
					// limpiar seleccionado
					this.selectedItem = undefined;

					// actulizo la tabla
					this.getSustentoFromStorage();
				}
			},
		});
	}

	private deleteItemOfStorage(id: number) {
		this.mainStorageDataSource = this.mainStorageDataSource.filter(
			(c: any) => c.docSusContribuyenteId !== id
		);
	}

	// actualiza 1 registro del datasource  a Accion DELETE
	private updateStateToDelete(id: number) {
		this.mainStorageDataSource = this.mainStorageDataSource.map(
			(c: any) => {
				if (c.docSusContribuyenteId === id)
					c.accion = CRUD_ACTION.DELETE;
				return c;
			}
		);
	}

	private getSustentoFromStorage() {
		this.dataSource = this.mainStorageDataSource.filter(
			(c) => c.accion !== CRUD_ACTION.DELETE
		);
	}

	private removeFromServer(sustentoSelected: any) {
		const dialogRef = this.dialogConfirmService.confirm({
			callback: () =>
				this.docSustentoService.anularUsingDelete3({
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
				if (response) {
					this.getDocumentosSustento();
				}
			},
		});
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
		modalRef.componentInstance.numeroDj = this.numeroDj;

		if (sustentoSelected) {
			modalRef.componentInstance.sustento = sustentoSelected;
		}

		modalRef.closed.subscribe({
			next: (response) => {
				if (response) {
					if (this.numeroDj > 0) {
						this.updateTableSutento(response, sustentoSelected);
					} else {
						this.getDocumentosSustento();
					}
				}
			},
		});
	}

	private updateTableSutento(sustento: any, selectedItem?: any) {
		if (!selectedItem) {
			this.mainStorageDataSource = [
				...this.mainStorageDataSource,
				sustento,
			];
		} else {
			// update
			this.mainStorageDataSource = this.mainStorageDataSource.map((e) => {
				if (e.docSusContribuyenteId === sustento.docSusContribuyenteId)
					return sustento;
				return e;
			});
		}

		this.contribuyenteStorage.saveSustento([...this.mainStorageDataSource]);
		this.getSustentoFromStorage();
		this.selectedItem = undefined;
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
					this.selectedItem = undefined;

					if (this.numeroDj) {
						this.makeSetupStorage(response);
					} else {
						this.dataSource = response;
					}
				},
				error: (err: any) => {
					console.log(err);
				},
			});
	}

	private makeSetupStorage(response: any[]) {
		this.mainStorageDataSource = response.map((c) => ({
			...c,
			accion: '',
		}));
		this.contribuyenteStorage.initSustentos(this.mainStorageDataSource);
		this.getSustentoFromStorage();
	}

	onSelectedItem(item: DocumentoSustentoBuscarResponse) {
		this.selectedItem = item;
	}
}

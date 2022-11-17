/**
 * Component de dialogo de componente
 */

import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { ConfirmOptions } from './dialog-confirm.service';

@Component({
	selector: 'app-dialog-confirm',
	templateUrl: './dialog-confirm.component.html',
	styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent implements OnInit {
	@Input() options!: ConfirmOptions;

	loading: boolean = false;

	constructor(
		public activeModal: NgbActiveModal,
		private alertService: AlertService
	) {}

	ngOnInit(): void {}

	onOk() {
		const { callback, msgResponseError, msgResponseSuccess } = this.options;
		if (typeof callback === 'function') {
			this.loading = true;
			callback()
				.pipe(finalize(() => (this.loading = false)))
				.subscribe({
					next: (response) => {
						this.activeModal.close(response);
					},
					error: (error) => {
						this.alertService.error(error.message);
					},
				});
		} else {
			this.activeModal.close(true);
		}
	}

	onClose() {
		this.activeModal.close(undefined);
	}
}

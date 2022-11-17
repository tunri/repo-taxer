import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsrtmPaginationComponent } from './components/nsrtm-pagination/nsrtm-pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { NoResultsComponent } from './components/no-results/no-results.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NsrtmLoadingComponent } from './components/nsrtm-loading/nsrtm-loading.component';
import { NsrtmAlertFormComponent } from './components/nsrtm-alert-form/nsrtm-alert-form.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
// import { AlertaComponent } from './components/alert/alert.component';

// services

@NgModule({
  declarations: [
    LoadingComponent,
    NoResultsComponent,
    NsrtmPaginationComponent,
    NsrtmAlertFormComponent,
    NsrtmLoadingComponent,
    NsrtmAlertFormComponent,
    DialogConfirmComponent,
    // AlertaComponent,
  ],
  imports: [NgSelectModule, NgbPaginationModule, FormsModule, CommonModule],
  exports: [
    LoadingComponent,
    NoResultsComponent,
    NsrtmPaginationComponent,
    NsrtmLoadingComponent,
    NsrtmAlertFormComponent,
    // AlertaComponent,
  ],
  providers: [],
})
export class SharedModule {}

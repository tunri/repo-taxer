import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroContribuyenteComponent } from './views/registro-contribuyente/registro-contribuyente.component';
import { GestionarContribuyenteRoutingModule } from './gestionar-contribuyente-routing.module';
import { NgBootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  CrudDomicilioComponent,
  CrudMediosContactoComponent,
  CrudSustentoComponent,
  DatosContribuyenteComponent,
  DialogUpsertDomicilioComponent,
  DialogUpsertMediosContactoComponent,
  DialogUpsertSustentoComponent,
  TablaDomiciliosComponent,
  TablaMediosContactoComponent,
  TablaSustentoComponent,
  GestionRelacionadoComponent,
  TablaRelacionadoComponent,
  TablaDomicilioRelacionadoComponent,
  DialogUpsertRelacionadoComponent,
  DialogUpsertDomicilioRelacionadoComponent,
} from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    RegistroContribuyenteComponent,
    DatosContribuyenteComponent,
    CrudMediosContactoComponent,
    TablaMediosContactoComponent,
    DialogUpsertMediosContactoComponent,
    CrudSustentoComponent,
    TablaSustentoComponent,
    DialogUpsertSustentoComponent,
    CrudDomicilioComponent,
    TablaDomiciliosComponent,
    DialogUpsertDomicilioComponent,
    GestionRelacionadoComponent,
    TablaRelacionadoComponent,
    TablaDomicilioRelacionadoComponent,
    DialogUpsertRelacionadoComponent,
    DialogUpsertDomicilioRelacionadoComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    GestionarContribuyenteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapModule,
    NgxMaskModule.forRoot(),
  ],
})
export class GestionarContribuyenteModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscarContribuyenteRoutingModule } from './buscar-contribuyente-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BuscarContribuyenteComponent } from './buscar-contribuyente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [BuscarContribuyenteComponent],
  imports: [
    CommonModule,
    BuscarContribuyenteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgBootstrapModule,
    NgbModule,
    NgxMaskModule.forRoot(),
  ]
})
export class BuscarContribuyenteModule { }

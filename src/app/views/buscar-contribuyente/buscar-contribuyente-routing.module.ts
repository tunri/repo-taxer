import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarContribuyenteComponent } from './buscar-contribuyente.component';

const routes: Routes = [
  {
    path:"",
    component: BuscarContribuyenteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuscarContribuyenteRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroContribuyenteComponent } from './views/registro-contribuyente/registro-contribuyente.component';

export const routes: Routes = [
	{
		path: '',
		component: RegistroContribuyenteComponent,
	},
	{
		path: ':id',
		component: RegistroContribuyenteComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GestionarContribuyenteRoutingModule {}

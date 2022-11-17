import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  PATH_REGISTER_TAXPAYER,
  PATH_SEARCH_TAXPAYER,
} from './core/data/slug-routes';

import { BuscarContribuyenteComponent, PageNotFoundComponent } from './views';

const routes: Routes = [
  {
    path: PATH_SEARCH_TAXPAYER,
    loadChildren: () =>
      import(
        './views/buscar-contribuyente/buscar-contribuyente.module'
      ).then((m) => m.BuscarContribuyenteModule),
  },
  {
    path: PATH_REGISTER_TAXPAYER,
    loadChildren: () =>
      import(
        './features/gestionar-contribuyente/gestionar-contribuyente.module'
      ).then((m) => m.GestionarContribuyenteModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}

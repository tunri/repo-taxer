/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { CondicionContribuyenteControllerService } from './services/condicion-contribuyente-controller.service';
import { ContactoContribuyenteControllerService } from './services/contacto-contribuyente-controller.service';
import { ContribuyenteControllerService } from './services/contribuyente-controller.service';
import { DocumentoSustentoControllerService } from './services/documento-sustento-controller.service';
import { DomicilioContribuyenteControllerService } from './services/domicilio-contribuyente-controller.service';
import { DomicilioRelacionadoControllerService } from './services/domicilio-relacionado-controller.service';
import { PersonaControllerService } from './services/persona-controller.service';
import { RelacionadoControllerService } from './services/relacionado-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CondicionContribuyenteControllerService,
    ContactoContribuyenteControllerService,
    ContribuyenteControllerService,
    DocumentoSustentoControllerService,
    DomicilioContribuyenteControllerService,
    DomicilioRelacionadoControllerService,
    PersonaControllerService,
    RelacionadoControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}

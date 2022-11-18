/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { DomicilioRelacionadoBuscarResponse } from '../models/domicilio-relacionado-buscar-response';
import { DomicilioRelacionadoEntity } from '../models/domicilio-relacionado-entity';
import { DomicilioRelacionadoRequest } from '../models/domicilio-relacionado-request';


/**
 * Domicilio Relacionado Controller
 */
@Injectable({
  providedIn: 'root',
})
export class DomicilioRelacionadoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarPorRelacionadoUsingGet
   */
  static readonly ListarPorRelacionadoUsingGetPath = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/listarPorRelacionado/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * Listar Domicilios por Relacionado.
   *
   * Permite listar los domicilios activos por código de Relacionado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPorRelacionadoUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorRelacionadoUsingGet$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DomicilioRelacionadoBuscarResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ListarPorRelacionadoUsingGetPath, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('relContribuyenteNumero', params.relContribuyenteNumero, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DomicilioRelacionadoBuscarResponse>>;
      })
    );
  }

  /**
   * Listar Domicilios por Relacionado.
   *
   * Permite listar los domicilios activos por código de Relacionado
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPorRelacionadoUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorRelacionadoUsingGet(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<Array<DomicilioRelacionadoBuscarResponse>> {

    return this.listarPorRelacionadoUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DomicilioRelacionadoBuscarResponse>>) => r.body as Array<DomicilioRelacionadoBuscarResponse>)
    );
  }

  /**
   * Path part for operation crearUsingPost5
   */
  static readonly CrearUsingPost5Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * crear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost5$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.CrearUsingPost5Path, 'post');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('relContribuyenteNumero', params.relContribuyenteNumero, {"style":"simple"});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * crear.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `crearUsingPost5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost5(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<{
}> {

    return this.crearUsingPost5$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation consultarUsingGet3
   */
  static readonly ConsultarUsingGet3Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}/{domRelacionadoNumero}';

  /**
   * Consultar Domicilio del Relacionado.
   *
   * Permite consultar el domicilio del Relacionado por el código de Domicilio-Relacionado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consultarUsingGet3()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet3$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DomicilioRelacionadoEntity>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ConsultarUsingGet3Path, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('relContribuyenteNumero', params.relContribuyenteNumero, {"style":"simple"});
      rb.path('domRelacionadoNumero', params.domRelacionadoNumero, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DomicilioRelacionadoEntity>;
      })
    );
  }

  /**
   * Consultar Domicilio del Relacionado.
   *
   * Permite consultar el domicilio del Relacionado por el código de Domicilio-Relacionado
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consultarUsingGet3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet3(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
  }
): Observable<DomicilioRelacionadoEntity> {

    return this.consultarUsingGet3$Response(params).pipe(
      map((r: StrictHttpResponse<DomicilioRelacionadoEntity>) => r.body as DomicilioRelacionadoEntity)
    );
  }

  /**
   * Path part for operation actualizarUsingPut5
   */
  static readonly ActualizarUsingPut5Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}/{domRelacionadoNumero}';

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut5$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ActualizarUsingPut5Path, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('relContribuyenteNumero', params.relContribuyenteNumero, {"style":"simple"});
      rb.path('domRelacionadoNumero', params.domRelacionadoNumero, {"style":"simple"});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actualizarUsingPut5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut5(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut5$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete5
   */
  static readonly AnularUsingDelete5Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}/{domRelacionadoNumero}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete5()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete5$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.AnularUsingDelete5Path, 'delete');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('relContribuyenteNumero', params.relContribuyenteNumero, {"style":"simple"});
      rb.path('domRelacionadoNumero', params.domRelacionadoNumero, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * anular.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `anularUsingDelete5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete5(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * relContribuyenteNumero
     */
    relContribuyenteNumero: number;

    /**
     * domRelacionadoNumero
     */
    domRelacionadoNumero: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.anularUsingDelete5$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

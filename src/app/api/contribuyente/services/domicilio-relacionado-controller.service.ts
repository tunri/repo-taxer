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
import { DomicilioRelacionadoRequest } from '../models/domicilio-relacionado-request';
import { DomicilioRelacionadoResponse } from '../models/domicilio-relacionado-response';


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
   * Path part for operation listarUsingGet
   */
  static readonly ListarUsingGetPath = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/listar/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * Listar Domicilios por Relacionado.
   *
   * Permite listar los domicilios activos por código de Relacionado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUsingGet$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ListarUsingGetPath, 'get');
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
   * To access the full response (for headers, for example), `listarUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarUsingGet(params: {

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

    return this.listarUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DomicilioRelacionadoBuscarResponse>>) => r.body as Array<DomicilioRelacionadoBuscarResponse>)
    );
  }

  /**
   * Path part for operation actualizarUsingPut4
   */
  static readonly ActualizarUsingPut4Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}';

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut4$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ActualizarUsingPut4Path, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
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
   * To access the full response (for headers, for example), `actualizarUsingPut4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut4(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut4$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation crearUsingPost4
   */
  static readonly CrearUsingPost4Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}';

  /**
   * crear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost4$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.CrearUsingPost4Path, 'post');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
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
   * To access the full response (for headers, for example), `crearUsingPost4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost4(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRelacionadoRequest
  }
): Observable<{
}> {

    return this.crearUsingPost4$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation consultarUsingGet1
   */
  static readonly ConsultarUsingGet1Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}/{domRelacionadoNumero}';

  /**
   * Consultar Domicilio del Relacionado.
   *
   * Permite consultar el domicilio del Relacionado por el código de Domicilio-Relacionado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consultarUsingGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet1$Response(params: {

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
): Observable<StrictHttpResponse<Array<DomicilioRelacionadoResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.ConsultarUsingGet1Path, 'get');
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
        return r as StrictHttpResponse<Array<DomicilioRelacionadoResponse>>;
      })
    );
  }

  /**
   * Consultar Domicilio del Relacionado.
   *
   * Permite consultar el domicilio del Relacionado por el código de Domicilio-Relacionado
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consultarUsingGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet1(params: {

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
): Observable<Array<DomicilioRelacionadoResponse>> {

    return this.consultarUsingGet1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DomicilioRelacionadoResponse>>) => r.body as Array<DomicilioRelacionadoResponse>)
    );
  }

  /**
   * Path part for operation anularUsingDelete3
   */
  static readonly AnularUsingDelete3Path = '/v1/nsrtm-services-contribuyentes/relacionados/domicilios/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}/{domRelacionadoNumero}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete3()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete3$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, DomicilioRelacionadoControllerService.AnularUsingDelete3Path, 'delete');
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
   * To access the full response (for headers, for example), `anularUsingDelete3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete3(params: {

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

    return this.anularUsingDelete3$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

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

import { DomicilioBuscarResponse } from '../models/domicilio-buscar-response';
import { DomicilioRequest } from '../models/domicilio-request';


/**
 * Domicilio Contribuyente Controller
 */
@Injectable({
  providedIn: 'root',
})
export class DomicilioContribuyenteControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarPorContribuyenteUsingGet2
   */
  static readonly ListarPorContribuyenteUsingGet2Path = '/v1/nsrtm-services-contribuyentes/domicilios/listarPorContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPorContribuyenteUsingGet2()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet2$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DomicilioBuscarResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioContribuyenteControllerService.ListarPorContribuyenteUsingGet2Path, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DomicilioBuscarResponse>>;
      })
    );
  }

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPorContribuyenteUsingGet2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet2(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<Array<DomicilioBuscarResponse>> {

    return this.listarPorContribuyenteUsingGet2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DomicilioBuscarResponse>>) => r.body as Array<DomicilioBuscarResponse>)
    );
  }

  /**
   * Path part for operation crearUsingPost4
   */
  static readonly CrearUsingPost4Path = '/v1/nsrtm-services-contribuyentes/domicilios/{municipalidadId}/{contribuyenteNumero}';

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
    body?: DomicilioRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioContribuyenteControllerService.CrearUsingPost4Path, 'post');
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
    body?: DomicilioRequest
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
   * Path part for operation obtenerUsingGet1
   */
  static readonly ObtenerUsingGet1Path = '/v1/nsrtm-services-contribuyentes/domicilios/{municipalidadId}/{contribuyenteNumero}/{domicilioContribuyenteNumero}';

  /**
   * obtener.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerUsingGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet1$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioContribuyenteControllerService.ObtenerUsingGet1Path, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('domicilioContribuyenteNumero', params.domicilioContribuyenteNumero, {"style":"simple"});
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
   * obtener.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerUsingGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet1(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.obtenerUsingGet1$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation actualizarUsingPut4
   */
  static readonly ActualizarUsingPut4Path = '/v1/nsrtm-services-contribuyentes/domicilios/{municipalidadId}/{contribuyenteNumero}/{domicilioContribuyenteNumero}';

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

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioContribuyenteControllerService.ActualizarUsingPut4Path, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('domicilioContribuyenteNumero', params.domicilioContribuyenteNumero, {"style":"simple"});
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

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
    body?: DomicilioRequest
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
   * Path part for operation anularUsingDelete4
   */
  static readonly AnularUsingDelete4Path = '/v1/nsrtm-services-contribuyentes/domicilios/{municipalidadId}/{contribuyenteNumero}/{domicilioContribuyenteNumero}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete4()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete4$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DomicilioContribuyenteControllerService.AnularUsingDelete4Path, 'delete');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('domicilioContribuyenteNumero', params.domicilioContribuyenteNumero, {"style":"simple"});
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
   * To access the full response (for headers, for example), `anularUsingDelete4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete4(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * domicilioContribuyenteNumero
     */
    domicilioContribuyenteNumero: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.anularUsingDelete4$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

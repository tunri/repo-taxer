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

import { CondicionContribuyenteRequest } from '../models/condicion-contribuyente-request';


/**
 * Condicion Contribuyente Controller
 */
@Injectable({
  providedIn: 'root',
})
export class CondicionContribuyenteControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation crearUsingPost
   */
  static readonly CrearUsingPostPath = '/v1/nsrtm-services-contribuyentes/condicion/{municipalidadId}/{contribuyenteNumero}';

  /**
   * crear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.CrearUsingPostPath, 'post');
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
   * To access the full response (for headers, for example), `crearUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<{
}> {

    return this.crearUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerUsingGet
   */
  static readonly ObtenerUsingGetPath = '/v1/nsrtm-services-contribuyentes/condicion/{municipalidadId}/{contribuyenteNumero}/{conContribuyenteId}';

  /**
   * obtener.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.ObtenerUsingGetPath, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('conContribuyenteId', params.conContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `obtenerUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.obtenerUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation actualizarUsingPut
   */
  static readonly ActualizarUsingPutPath = '/v1/nsrtm-services-contribuyentes/condicion/{municipalidadId}/{contribuyenteNumero}/{conContribuyenteId}';

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.ActualizarUsingPutPath, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('conContribuyenteId', params.conContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `actualizarUsingPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete
   */
  static readonly AnularUsingDeletePath = '/v1/nsrtm-services-contribuyentes/condicion/{municipalidadId}/{contribuyenteNumero}/{conContribuyenteId}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.AnularUsingDeletePath, 'delete');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('conContribuyenteId', params.conContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `anularUsingDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * conContribuyenteId
     */
    conContribuyenteId: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.anularUsingDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

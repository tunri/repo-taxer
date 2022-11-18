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

import { RelacionadoBuscarResponse } from '../models/relacionado-buscar-response';
import { RelacionadoEntity } from '../models/relacionado-entity';
import { RelacionadoPersonaRequest } from '../models/relacionado-persona-request';


/**
 * Relacionado Controller
 */
@Injectable({
  providedIn: 'root',
})
export class RelacionadoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarPorContribuyenteUsingGet3
   */
  static readonly ListarPorContribuyenteUsingGet3Path = '/v1/nsrtm-services-contribuyentes/relacionados/listarPorContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPorContribuyenteUsingGet3()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet3$Response(params: {

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
): Observable<StrictHttpResponse<Array<RelacionadoBuscarResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, RelacionadoControllerService.ListarPorContribuyenteUsingGet3Path, 'get');
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
        return r as StrictHttpResponse<Array<RelacionadoBuscarResponse>>;
      })
    );
  }

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPorContribuyenteUsingGet3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet3(params: {

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
): Observable<Array<RelacionadoBuscarResponse>> {

    return this.listarPorContribuyenteUsingGet3$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RelacionadoBuscarResponse>>) => r.body as Array<RelacionadoBuscarResponse>)
    );
  }

  /**
   * Path part for operation crearUsingPost6
   */
  static readonly CrearUsingPost6Path = '/v1/nsrtm-services-contribuyentes/relacionados/{municipalidadId}/{contribuyenteNumero}';

  /**
   * crear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost6$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: RelacionadoPersonaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, RelacionadoControllerService.CrearUsingPost6Path, 'post');
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
   * To access the full response (for headers, for example), `crearUsingPost6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost6(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: RelacionadoPersonaRequest
  }
): Observable<{
}> {

    return this.crearUsingPost6$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerUsingGet2
   */
  static readonly ObtenerUsingGet2Path = '/v1/nsrtm-services-contribuyentes/relacionados/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * obtener.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerUsingGet2()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet2$Response(params: {

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
): Observable<StrictHttpResponse<RelacionadoEntity>> {

    const rb = new RequestBuilder(this.rootUrl, RelacionadoControllerService.ObtenerUsingGet2Path, 'get');
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
        return r as StrictHttpResponse<RelacionadoEntity>;
      })
    );
  }

  /**
   * obtener.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerUsingGet2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerUsingGet2(params: {

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
): Observable<RelacionadoEntity> {

    return this.obtenerUsingGet2$Response(params).pipe(
      map((r: StrictHttpResponse<RelacionadoEntity>) => r.body as RelacionadoEntity)
    );
  }

  /**
   * Path part for operation actualizarUsingPut6
   */
  static readonly ActualizarUsingPut6Path = '/v1/nsrtm-services-contribuyentes/relacionados/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut6$Response(params: {

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
    body?: RelacionadoPersonaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, RelacionadoControllerService.ActualizarUsingPut6Path, 'put');
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
   * actualizar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actualizarUsingPut6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut6(params: {

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
    body?: RelacionadoPersonaRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut6$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete6
   */
  static readonly AnularUsingDelete6Path = '/v1/nsrtm-services-contribuyentes/relacionados/{municipalidadId}/{contribuyenteNumero}/{relContribuyenteNumero}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete6()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete6$Response(params: {

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
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, RelacionadoControllerService.AnularUsingDelete6Path, 'delete');
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
   * To access the full response (for headers, for example), `anularUsingDelete6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete6(params: {

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
): Observable<{
}> {

    return this.anularUsingDelete6$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

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

import { DocumentoSustentoBuscarResponse } from '../models/documento-sustento-buscar-response';
import { DocumentoSustentoRequest } from '../models/documento-sustento-request';


/**
 * Documento Sustento Controller
 */
@Injectable({
  providedIn: 'root',
})
export class DocumentoSustentoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarPorContribuyenteUsingGet1
   */
  static readonly ListarPorContribuyenteUsingGet1Path = '/v1/nsrtm-services-contribuyentes/sustentos/listarPorContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPorContribuyenteUsingGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet1$Response(params: {

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
): Observable<StrictHttpResponse<Array<DocumentoSustentoBuscarResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.ListarPorContribuyenteUsingGet1Path, 'get');
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
        return r as StrictHttpResponse<Array<DocumentoSustentoBuscarResponse>>;
      })
    );
  }

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPorContribuyenteUsingGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet1(params: {

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
): Observable<Array<DocumentoSustentoBuscarResponse>> {

    return this.listarPorContribuyenteUsingGet1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DocumentoSustentoBuscarResponse>>) => r.body as Array<DocumentoSustentoBuscarResponse>)
    );
  }

  /**
   * Path part for operation crearUsingPost2
   */
  static readonly CrearUsingPost2Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}';

  /**
   * crear.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost2$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DocumentoSustentoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.CrearUsingPost2Path, 'post');
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
   * To access the full response (for headers, for example), `crearUsingPost2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost2(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DocumentoSustentoRequest
  }
): Observable<{
}> {

    return this.crearUsingPost2$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerUsingGet1
   */
  static readonly ObtenerUsingGet1Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

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
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.ObtenerUsingGet1Path, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('docSusContribuyenteId', params.docSusContribuyenteId, {"style":"simple"});
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
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
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
   * Path part for operation actualizarUsingPut2
   */
  static readonly ActualizarUsingPut2Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

  /**
   * actualizar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut2$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
    body?: DocumentoSustentoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.ActualizarUsingPut2Path, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('docSusContribuyenteId', params.docSusContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `actualizarUsingPut2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut2(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
    body?: DocumentoSustentoRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut2$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete1
   */
  static readonly AnularUsingDelete1Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

  /**
   * anular.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `anularUsingDelete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete1$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.AnularUsingDelete1Path, 'delete');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('docSusContribuyenteId', params.docSusContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `anularUsingDelete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  anularUsingDelete1(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.anularUsingDelete1$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

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
   * Listar documento de sustento por ID de contribuyente.
   *
   * Listar documento de sustento por código de municipalidad y código de contribuyente.
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
   * Listar documento de sustento por ID de contribuyente.
   *
   * Listar documento de sustento por código de municipalidad y código de contribuyente.
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
   * Path part for operation crearUsingPost3
   */
  static readonly CrearUsingPost3Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Crear documento de sustento de contribuyente.
   *
   * Crear documento de sustento de contribuyente.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost3$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.CrearUsingPost3Path, 'post');
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
   * Crear documento de sustento de contribuyente.
   *
   * Crear documento de sustento de contribuyente.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `crearUsingPost3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost3(params: {

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

    return this.crearUsingPost3$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation consultarUsingGet2
   */
  static readonly ConsultarUsingGet2Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

  /**
   * Consular documento de sustento de contribuyente.
   *
   * Consular documento de sustento de contribuyente.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consultarUsingGet2()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet2$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.ConsultarUsingGet2Path, 'get');
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
   * Consular documento de sustento de contribuyente.
   *
   * Consular documento de sustento de contribuyente.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consultarUsingGet2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet2(params: {

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

    return this.consultarUsingGet2$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation actualizarUsingPut3
   */
  static readonly ActualizarUsingPut3Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

  /**
   * Actualizar documento de sustento de contribuyente.
   *
   * Actualizar documento de sustento de contribuyente.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut3$Response(params: {

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

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.ActualizarUsingPut3Path, 'put');
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
   * Actualizar documento de sustento de contribuyente.
   *
   * Actualizar documento de sustento de contribuyente.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actualizarUsingPut3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut3(params: {

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

    return this.actualizarUsingPut3$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete3
   */
  static readonly AnularUsingDelete3Path = '/v1/nsrtm-services-contribuyentes/sustentos/{municipalidadId}/{contribuyenteNumero}/{docSusContribuyenteId}';

  /**
   * Anular documento de sustento de contribuyente.
   *
   * Anular documento de sustento de contribuyente.
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
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, DocumentoSustentoControllerService.AnularUsingDelete3Path, 'delete');
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
   * Anular documento de sustento de contribuyente.
   *
   * Anular documento de sustento de contribuyente.
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
     * docSusContribuyenteId
     */
    docSusContribuyenteId: number;
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

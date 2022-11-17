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

import { BuscarPorDocumentoResponse } from '../models/buscar-por-documento-response';
import { ContribuyentePersonaRequest } from '../models/contribuyente-persona-request';
import { DecJurContribuyenteResponse } from '../models/dec-jur-contribuyente-response';
import { DeclaracionJuradaContribuyente } from '../models/declaracion-jurada-contribuyente';
import { DocumentoRequest } from '../models/documento-request';
import { PaginaResponseOfListOfContribuyenteBuscarResponse } from '../models/pagina-response-of-list-of-contribuyente-buscar-response';
import { Resource } from '../models/resource';


/**
 * Contribuyente Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ContribuyenteControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation buscarUsingGet
   */
  static readonly BuscarUsingGetPath = '/v1/nsrtm-services-contribuyentes/contribuyentes';

  /**
   * Permite buscar contribuyentes.
   *
   * Retorna una lista de contribuyentes que coinciden con filtro
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarUsingGet$Response(params?: {

    /**
     * municipalidadId
     */
    municipalidadId?: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero?: number;

    /**
     * docIdentidadId
     */
    docIdentidadId?: number;

    /**
     * numDocIdentidad
     */
    numDocIdentidad?: string;

    /**
     * apeNomRs
     */
    apeNomRs?: string;

    /**
     * page
     */
    page?: number;

    /**
     * pageSize
     */
    pageSize?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PaginaResponseOfListOfContribuyenteBuscarResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.BuscarUsingGetPath, 'get');
    if (params) {
      rb.query('municipalidadId', params.municipalidadId, {"style":"form"});
      rb.query('contribuyenteNumero', params.contribuyenteNumero, {"style":"form"});
      rb.query('docIdentidadId', params.docIdentidadId, {"style":"form"});
      rb.query('numDocIdentidad', params.numDocIdentidad, {"style":"form"});
      rb.query('apeNomRs', params.apeNomRs, {"style":"form"});
      rb.query('page', params.page, {"style":"form"});
      rb.query('pageSize', params.pageSize, {"style":"form"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PaginaResponseOfListOfContribuyenteBuscarResponse>;
      })
    );
  }

  /**
   * Permite buscar contribuyentes.
   *
   * Retorna una lista de contribuyentes que coinciden con filtro
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buscarUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  buscarUsingGet(params?: {

    /**
     * municipalidadId
     */
    municipalidadId?: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero?: number;

    /**
     * docIdentidadId
     */
    docIdentidadId?: number;

    /**
     * numDocIdentidad
     */
    numDocIdentidad?: string;

    /**
     * apeNomRs
     */
    apeNomRs?: string;

    /**
     * page
     */
    page?: number;

    /**
     * pageSize
     */
    pageSize?: number;
    context?: HttpContext
  }
): Observable<PaginaResponseOfListOfContribuyenteBuscarResponse> {

    return this.buscarUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<PaginaResponseOfListOfContribuyenteBuscarResponse>) => r.body as PaginaResponseOfListOfContribuyenteBuscarResponse)
    );
  }

  /**
   * Path part for operation buscarPorDocumentoUsingGet
   */
  static readonly BuscarPorDocumentoUsingGetPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/buscarPorDocumento';

  /**
   * buscarPorDocumento.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarPorDocumentoUsingGet()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  buscarPorDocumentoUsingGet$Response(params?: {
    context?: HttpContext
    body?: DocumentoRequest
  }
): Observable<StrictHttpResponse<Array<BuscarPorDocumentoResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.BuscarPorDocumentoUsingGetPath, 'get');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BuscarPorDocumentoResponse>>;
      })
    );
  }

  /**
   * buscarPorDocumento.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buscarPorDocumentoUsingGet$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  buscarPorDocumentoUsingGet(params?: {
    context?: HttpContext
    body?: DocumentoRequest
  }
): Observable<Array<BuscarPorDocumentoResponse>> {

    return this.buscarPorDocumentoUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BuscarPorDocumentoResponse>>) => r.body as Array<BuscarPorDocumentoResponse>)
    );
  }

  /**
   * Path part for operation consultarUsingGet
   */
  static readonly ConsultarUsingGetPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/consultar/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite consultar contribuyente.
   *
   * Retorna datos del contribuyente en base a su código
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consultarUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet$Response(params: {

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
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ConsultarUsingGetPath, 'get');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * Permite consultar contribuyente.
   *
   * Retorna datos del contribuyente en base a su código
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consultarUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarUsingGet(params: {

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
): Observable<{
}> {

    return this.consultarUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation consultarDecJurContribuyenteUsingGet
   */
  static readonly ConsultarDecJurContribuyenteUsingGetPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/consultarDecJurContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite consultar datos contribuyente - Declaración Jurada de Contribuyente.
   *
   * Permite consultar datos del contribuyente para la Declaración Jurada de Contribuyente (Datos generales, domicilio Fiscal, Relacionado, Domicilio de Relacionado)
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consultarDecJurContribuyenteUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarDecJurContribuyenteUsingGet$Response(params: {

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
): Observable<StrictHttpResponse<Array<DecJurContribuyenteResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ConsultarDecJurContribuyenteUsingGetPath, 'get');
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
        return r as StrictHttpResponse<Array<DecJurContribuyenteResponse>>;
      })
    );
  }

  /**
   * Permite consultar datos contribuyente - Declaración Jurada de Contribuyente.
   *
   * Permite consultar datos del contribuyente para la Declaración Jurada de Contribuyente (Datos generales, domicilio Fiscal, Relacionado, Domicilio de Relacionado)
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consultarDecJurContribuyenteUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consultarDecJurContribuyenteUsingGet(params: {

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
): Observable<Array<DecJurContribuyenteResponse>> {

    return this.consultarDecJurContribuyenteUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DecJurContribuyenteResponse>>) => r.body as Array<DecJurContribuyenteResponse>)
    );
  }

  /**
   * Path part for operation exportarPdfDecJurContribuyenteUsingGet
   */
  static readonly ExportarPdfDecJurContribuyenteUsingGetPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/exportarPDFDecJurContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite exportar a PDF datos contribuyente.
   *
   * Permite exportar a formato PDF los datos del contribuyente en la Declaración Jurada de Contribuyente
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `exportarPdfDecJurContribuyenteUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportarPdfDecJurContribuyenteUsingGet$Response(params: {

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
): Observable<StrictHttpResponse<Resource>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ExportarPdfDecJurContribuyenteUsingGetPath, 'get');
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
        return r as StrictHttpResponse<Resource>;
      })
    );
  }

  /**
   * Permite exportar a PDF datos contribuyente.
   *
   * Permite exportar a formato PDF los datos del contribuyente en la Declaración Jurada de Contribuyente
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `exportarPdfDecJurContribuyenteUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportarPdfDecJurContribuyenteUsingGet(params: {

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
): Observable<Resource> {

    return this.exportarPdfDecJurContribuyenteUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Resource>) => r.body as Resource)
    );
  }

  /**
   * Path part for operation procesarActualizarDjUsingPut
   */
  static readonly ProcesarActualizarDjUsingPutPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/procesarActualizarDJ/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite procesar DJ actualizada de contribuyente.
   *
   * Proceso que ingresa datos del contribuytente de cada sección y valida datos para luego actualizar el Numero de DJ
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `procesarActualizarDjUsingPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  procesarActualizarDjUsingPut$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DeclaracionJuradaContribuyente
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ProcesarActualizarDjUsingPutPath, 'put');
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
   * Permite procesar DJ actualizada de contribuyente.
   *
   * Proceso que ingresa datos del contribuytente de cada sección y valida datos para luego actualizar el Numero de DJ
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `procesarActualizarDjUsingPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  procesarActualizarDjUsingPut(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: DeclaracionJuradaContribuyente
  }
): Observable<{
}> {

    return this.procesarActualizarDjUsingPut$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation procesarCrearDjUsingPut
   */
  static readonly ProcesarCrearDjUsingPutPath = '/v1/nsrtm-services-contribuyentes/contribuyentes/procesarCrearDJ/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite procesar DJ creada de contribuyente.
   *
   * Proceso que valida datos de contribuyente y Genera el Numero de DJ
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `procesarCrearDjUsingPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  procesarCrearDjUsingPut$Response(params: {

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
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ProcesarCrearDjUsingPutPath, 'put');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * Permite procesar DJ creada de contribuyente.
   *
   * Proceso que valida datos de contribuyente y Genera el Numero de DJ
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `procesarCrearDjUsingPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  procesarCrearDjUsingPut(params: {

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
): Observable<{
}> {

    return this.procesarCrearDjUsingPut$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation crearUsingPost1
   */
  static readonly CrearUsingPost1Path = '/v1/nsrtm-services-contribuyentes/contribuyentes/{municipalidadId}';

  /**
   * Permite crear contribuyente.
   *
   * Retorna contribuyente creado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `crearUsingPost1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost1$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;
    context?: HttpContext
    body?: ContribuyentePersonaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.CrearUsingPost1Path, 'post');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
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
   * Permite crear contribuyente.
   *
   * Retorna contribuyente creado
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `crearUsingPost1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost1(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;
    context?: HttpContext
    body?: ContribuyentePersonaRequest
  }
): Observable<{
}> {

    return this.crearUsingPost1$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation actualizarUsingPut1
   */
  static readonly ActualizarUsingPut1Path = '/v1/nsrtm-services-contribuyentes/contribuyentes/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite actualizar contribuyente.
   *
   * Retorna contribuyente actualizado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `actualizarUsingPut1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut1$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: ContribuyentePersonaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.ActualizarUsingPut1Path, 'put');
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
   * Permite actualizar contribuyente.
   *
   * Retorna contribuyente actualizado
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `actualizarUsingPut1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  actualizarUsingPut1(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: ContribuyentePersonaRequest
  }
): Observable<{
}> {

    return this.actualizarUsingPut1$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation anularUsingDelete
   */
  static readonly AnularUsingDeletePath = '/v1/nsrtm-services-contribuyentes/contribuyentes/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Permite anular contribuyente.
   *
   * Retorna contribuyente anulado
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
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContribuyenteControllerService.AnularUsingDeletePath, 'delete');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * Permite anular contribuyente.
   *
   * Retorna contribuyente anulado
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

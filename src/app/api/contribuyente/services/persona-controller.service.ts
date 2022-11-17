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

import { DocumentoRequest } from '../models/documento-request';
import { PersonaRequest } from '../models/persona-request';


/**
 * Persona Controller
 */
@Injectable({
  providedIn: 'root',
})
export class PersonaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation buscarPorDocumentoUsingGet1
   */
  static readonly BuscarPorDocumentoUsingGet1Path = '/v1/nsrtm-services-contribuyentes/api/v1/personas/buscarPorDocumento';

  /**
   * buscarPorDocumento.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `buscarPorDocumentoUsingGet1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  buscarPorDocumentoUsingGet1$Response(params?: {
    context?: HttpContext
    body?: DocumentoRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, PersonaControllerService.BuscarPorDocumentoUsingGet1Path, 'get');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * buscarPorDocumento.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `buscarPorDocumentoUsingGet1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  buscarPorDocumentoUsingGet1(params?: {
    context?: HttpContext
    body?: DocumentoRequest
  }
): Observable<{
}> {

    return this.buscarPorDocumentoUsingGet1$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation procesarUsingPost
   */
  static readonly ProcesarUsingPostPath = '/v1/nsrtm-services-contribuyentes/api/v1/personas/procesar';

  /**
   * procesar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `procesarUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  procesarUsingPost$Response(params?: {
    context?: HttpContext
    body?: PersonaRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, PersonaControllerService.ProcesarUsingPostPath, 'post');
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
        return r as StrictHttpResponse<{
        }>;
      })
    );
  }

  /**
   * procesar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `procesarUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  procesarUsingPost(params?: {
    context?: HttpContext
    body?: PersonaRequest
  }
): Observable<{
}> {

    return this.procesarUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

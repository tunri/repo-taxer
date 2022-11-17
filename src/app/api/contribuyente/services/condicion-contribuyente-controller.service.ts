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

import { CondicionContribuyenteIdRequest } from '../models/condicion-contribuyente-id-request';
import { CondicionContribuyenteObtenerRequest } from '../models/condicion-contribuyente-obtener-request';
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
   * Path part for operation guardarUsingPost
   */
  static readonly GuardarUsingPostPath = '/v1/nsrtm-services-contribuyentes/condicion/guardarCondicion';

  /**
   * guardar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `guardarUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  guardarUsingPost$Response(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.GuardarUsingPostPath, 'post');
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
   * guardar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `guardarUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  guardarUsingPost(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteRequest
  }
): Observable<{
}> {

    return this.guardarUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation obtenerUsingPost
   */
  static readonly ObtenerUsingPostPath = '/v1/nsrtm-services-contribuyentes/condicion/obtenerCondicion';

  /**
   * obtener.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  obtenerUsingPost$Response(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteObtenerRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.ObtenerUsingPostPath, 'post');
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
   * obtener.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  obtenerUsingPost(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteObtenerRequest
  }
): Observable<{
}> {

    return this.obtenerUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

  /**
   * Path part for operation quitarUsingPut
   */
  static readonly QuitarUsingPutPath = '/v1/nsrtm-services-contribuyentes/condicion/quitarCondicion';

  /**
   * quitar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `quitarUsingPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  quitarUsingPut$Response(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteIdRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, CondicionContribuyenteControllerService.QuitarUsingPutPath, 'put');
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
   * quitar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `quitarUsingPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  quitarUsingPut(params?: {
    context?: HttpContext
    body?: CondicionContribuyenteIdRequest
  }
): Observable<{
}> {

    return this.quitarUsingPut$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

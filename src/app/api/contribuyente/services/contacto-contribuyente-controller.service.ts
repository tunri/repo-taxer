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

import { ContactoContribuyenteListaResponse } from '../models/contacto-contribuyente-lista-response';
import { ContactoContribuyenteRequest } from '../models/contacto-contribuyente-request';


/**
 * Contacto Contribuyente Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ContactoContribuyenteControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarPorContribuyenteUsingGet
   */
  static readonly ListarPorContribuyenteUsingGetPath = '/v1/nsrtm-services-contribuyentes/contactos/listarPorContribuyente/{municipalidadId}/{contribuyenteNumero}';

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarPorContribuyenteUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet$Response(params: {

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
): Observable<StrictHttpResponse<Array<ContactoContribuyenteListaResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.ListarPorContribuyenteUsingGetPath, 'get');
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
        return r as StrictHttpResponse<Array<ContactoContribuyenteListaResponse>>;
      })
    );
  }

  /**
   * listarPorContribuyente.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarPorContribuyenteUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listarPorContribuyenteUsingGet(params: {

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
): Observable<Array<ContactoContribuyenteListaResponse>> {

    return this.listarPorContribuyenteUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ContactoContribuyenteListaResponse>>) => r.body as Array<ContactoContribuyenteListaResponse>)
    );
  }

  /**
   * Path part for operation crearUsingPost
   */
  static readonly CrearUsingPostPath = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}';

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
    body?: ContactoContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.CrearUsingPostPath, 'post');
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
    body?: ContactoContribuyenteRequest
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
  static readonly ObtenerUsingGetPath = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.ObtenerUsingGetPath, 'get');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('medConContribuyenteId', params.medConContribuyenteId, {"style":"simple"});
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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
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
  static readonly ActualizarUsingPutPath = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.ActualizarUsingPutPath, 'put');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('medConContribuyenteId', params.medConContribuyenteId, {"style":"simple"});
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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
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
   * Path part for operation quitarUsingDelete
   */
  static readonly QuitarUsingDeletePath = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

  /**
   * quitar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `quitarUsingDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  quitarUsingDelete$Response(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.QuitarUsingDeletePath, 'delete');
    if (params) {
      rb.path('municipalidadId', params.municipalidadId, {"style":"simple"});
      rb.path('contribuyenteNumero', params.contribuyenteNumero, {"style":"simple"});
      rb.path('medConContribuyenteId', params.medConContribuyenteId, {"style":"simple"});
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
   * To access the full response (for headers, for example), `quitarUsingDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  quitarUsingDelete(params: {

    /**
     * municipalidadId
     */
    municipalidadId: number;

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
  }
): Observable<{
}> {

    return this.quitarUsingDelete$Response(params).pipe(
      map((r: StrictHttpResponse<{
}>) => r.body as {
})
    );
  }

}

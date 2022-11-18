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
   * Path part for operation crearUsingPost1
   */
  static readonly CrearUsingPost1Path = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}';

  /**
   * Crear contacto de contribuyente.
   *
   * Crea un contacto de contribuyente y si envía como contacto principal se retira el principal a los demás tipos de contactos.
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

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.CrearUsingPost1Path, 'post');
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
   * Crear contacto de contribuyente.
   *
   * Crea un contacto de contribuyente y si envía como contacto principal se retira el principal a los demás tipos de contactos.
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

    /**
     * contribuyenteNumero
     */
    contribuyenteNumero: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
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
   * Path part for operation consultarUsingGet
   */
  static readonly ConsultarUsingGetPath = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

  /**
   * Consultar contacto de contribuyente por su ID.
   *
   * Consultar contacto de contribuyente por smunicipalidad, código de contribuyente y código de contacto
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

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.ConsultarUsingGetPath, 'get');
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
   * Consultar contacto de contribuyente por su ID.
   *
   * Consultar contacto de contribuyente por smunicipalidad, código de contribuyente y código de contacto
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

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
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
   * Path part for operation actualizarUsingPut1
   */
  static readonly ActualizarUsingPut1Path = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

  /**
   * Actualiza contacto de contribuyente.
   *
   * Actualiza un contacto de contribuyente y si envía como contacto principal se retira el principal a los demás tipos de contactos.
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

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.ActualizarUsingPut1Path, 'put');
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
   * Actualiza contacto de contribuyente.
   *
   * Actualiza un contacto de contribuyente y si envía como contacto principal se retira el principal a los demás tipos de contactos.
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

    /**
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
    body?: ContactoContribuyenteRequest
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
   * Path part for operation anularUsingDelete1
   */
  static readonly AnularUsingDelete1Path = '/v1/nsrtm-services-contribuyentes/contactos/{municipalidadId}/{contribuyenteNumero}/{medConContribuyenteId}';

  /**
   * Anula contacto de contribuyente.
   *
   * Actualiza el estado del contribueynte a anulado
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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ContactoContribuyenteControllerService.AnularUsingDelete1Path, 'delete');
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
   * Anula contacto de contribuyente.
   *
   * Actualiza el estado del contribueynte a anulado
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
     * medConContribuyenteId
     */
    medConContribuyenteId: number;
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

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

import { ComunTipoEntity } from '../models/comun-tipo-entity';


/**
 * Comun Tipo Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ComunTipoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation crearUsingPost
   */
  static readonly CrearUsingPostPath = '/api/v1/tipocomunes/crear';

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
  crearUsingPost$Response(params?: {
    context?: HttpContext
    body?: ComunTipoEntity
  }
): Observable<StrictHttpResponse<{
}>> {

    const rb = new RequestBuilder(this.rootUrl, ComunTipoControllerService.CrearUsingPostPath, 'post');
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
   * crear.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `crearUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  crearUsingPost(params?: {
    context?: HttpContext
    body?: ComunTipoEntity
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
   * Path part for operation editarUsingPost
   */
  static readonly EditarUsingPostPath = '/api/v1/tipocomunes/editar';

  /**
   * editar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editarUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editarUsingPost$Response(params?: {
    context?: HttpContext
    body?: ComunTipoEntity
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ComunTipoControllerService.EditarUsingPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * editar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `editarUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  editarUsingPost(params?: {
    context?: HttpContext
    body?: ComunTipoEntity
  }
): Observable<void> {

    return this.editarUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation eliminarUsingPost
   */
  static readonly EliminarUsingPostPath = '/api/v1/tipocomunes/eliminar';

  /**
   * eliminar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `eliminarUsingPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarUsingPost$Response(params?: {

    /**
     * id
     */
    id?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ComunTipoControllerService.EliminarUsingPostPath, 'post');
    if (params) {
      rb.query('id', params.id, {"style":"form"});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * eliminar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `eliminarUsingPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  eliminarUsingPost(params?: {

    /**
     * id
     */
    id?: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.eliminarUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation todosUsingGet
   */
  static readonly TodosUsingGetPath = '/api/v1/tipocomunes/listar';

  /**
   * todos.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `todosUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  todosUsingGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ComunTipoEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunTipoControllerService.TodosUsingGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ComunTipoEntity>>;
      })
    );
  }

  /**
   * todos.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `todosUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  todosUsingGet(params?: {
    context?: HttpContext
  }
): Observable<Array<ComunTipoEntity>> {

    return this.todosUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ComunTipoEntity>>) => r.body as Array<ComunTipoEntity>)
    );
  }

  /**
   * Path part for operation obtenerPorIdUsingGet
   */
  static readonly ObtenerPorIdUsingGetPath = '/api/v1/tipocomunes/obtener';

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerPorIdUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet$Response(params?: {

    /**
     * id
     */
    id?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ComunTipoEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ComunTipoControllerService.ObtenerPorIdUsingGetPath, 'get');
    if (params) {
      rb.query('id', params.id, {"style":"form"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ComunTipoEntity>;
      })
    );
  }

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerPorIdUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet(params?: {

    /**
     * id
     */
    id?: number;
    context?: HttpContext
  }
): Observable<ComunTipoEntity> {

    return this.obtenerPorIdUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<ComunTipoEntity>) => r.body as ComunTipoEntity)
    );
  }

}

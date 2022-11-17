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

import { DepartamentoEntity } from '../models/departamento-entity';


/**
 * Departamento Controller
 */
@Injectable({
  providedIn: 'root',
})
export class DepartamentoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation todosUsingGet
   */
  static readonly TodosUsingGetPath = '/api/v1/departamentos';

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
): Observable<StrictHttpResponse<Array<DepartamentoEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, DepartamentoControllerService.TodosUsingGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DepartamentoEntity>>;
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
): Observable<Array<DepartamentoEntity>> {

    return this.todosUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DepartamentoEntity>>) => r.body as Array<DepartamentoEntity>)
    );
  }

  /**
   * Path part for operation obtenerPorIdUsingGet
   */
  static readonly ObtenerPorIdUsingGetPath = '/api/v1/departamentos/obtener/{idDepartamento}';

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
  obtenerPorIdUsingGet$Response(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DepartamentoEntity>> {

    const rb = new RequestBuilder(this.rootUrl, DepartamentoControllerService.ObtenerPorIdUsingGetPath, 'get');
    if (params) {
      rb.path('idDepartamento', params.idDepartamento, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DepartamentoEntity>;
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
  obtenerPorIdUsingGet(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;
    context?: HttpContext
  }
): Observable<DepartamentoEntity> {

    return this.obtenerPorIdUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<DepartamentoEntity>) => r.body as DepartamentoEntity)
    );
  }

}

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

import { ProvinciaEntity } from '../models/provincia-entity';


/**
 * Provincia Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ProvinciaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation filtrarPorDepartamentoUsingGet
   */
  static readonly FiltrarPorDepartamentoUsingGetPath = '/api/v1/provincias/filtrarpordepartamento/{idDepartamento}';

  /**
   * filtrarPorDepartamento.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filtrarPorDepartamentoUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrarPorDepartamentoUsingGet$Response(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ProvinciaEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinciaControllerService.FiltrarPorDepartamentoUsingGetPath, 'get');
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
        return r as StrictHttpResponse<Array<ProvinciaEntity>>;
      })
    );
  }

  /**
   * filtrarPorDepartamento.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filtrarPorDepartamentoUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrarPorDepartamentoUsingGet(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;
    context?: HttpContext
  }
): Observable<Array<ProvinciaEntity>> {

    return this.filtrarPorDepartamentoUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ProvinciaEntity>>) => r.body as Array<ProvinciaEntity>)
    );
  }

  /**
   * Path part for operation obtenerPorIdUsingGet2
   */
  static readonly ObtenerPorIdUsingGet2Path = '/api/v1/provincias/obtener/{idDepartamento}/{idProvincia}';

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerPorIdUsingGet2()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet2$Response(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;

    /**
     * idProvincia
     */
    idProvincia: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<ProvinciaEntity>> {

    const rb = new RequestBuilder(this.rootUrl, ProvinciaControllerService.ObtenerPorIdUsingGet2Path, 'get');
    if (params) {
      rb.path('idDepartamento', params.idDepartamento, {"style":"simple"});
      rb.path('idProvincia', params.idProvincia, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ProvinciaEntity>;
      })
    );
  }

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerPorIdUsingGet2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet2(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;

    /**
     * idProvincia
     */
    idProvincia: number;
    context?: HttpContext
  }
): Observable<ProvinciaEntity> {

    return this.obtenerPorIdUsingGet2$Response(params).pipe(
      map((r: StrictHttpResponse<ProvinciaEntity>) => r.body as ProvinciaEntity)
    );
  }

}

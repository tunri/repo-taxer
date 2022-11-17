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

import { DistritoEntity } from '../models/distrito-entity';


/**
 * Distrito Controller
 */
@Injectable({
  providedIn: 'root',
})
export class DistritoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation filtrarPorProvinciaUsingGet
   */
  static readonly FiltrarPorProvinciaUsingGetPath = '/api/v1/distritos/filtrarporprovincia/{idDepartamento}/{idProvincia}';

  /**
   * filtrarPorProvincia.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filtrarPorProvinciaUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrarPorProvinciaUsingGet$Response(params: {

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
): Observable<StrictHttpResponse<Array<DistritoEntity>>> {

    const rb = new RequestBuilder(this.rootUrl, DistritoControllerService.FiltrarPorProvinciaUsingGetPath, 'get');
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
        return r as StrictHttpResponse<Array<DistritoEntity>>;
      })
    );
  }

  /**
   * filtrarPorProvincia.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filtrarPorProvinciaUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filtrarPorProvinciaUsingGet(params: {

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
): Observable<Array<DistritoEntity>> {

    return this.filtrarPorProvinciaUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DistritoEntity>>) => r.body as Array<DistritoEntity>)
    );
  }

  /**
   * Path part for operation obtenerPorIdUsingGet1
   */
  static readonly ObtenerPorIdUsingGet1Path = '/api/v1/distritos/obtener/{idDepartamento}/{idProvincia}/{idDistrito}';

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerPorIdUsingGet1()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet1$Response(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;

    /**
     * idProvincia
     */
    idProvincia: number;

    /**
     * idDistrito
     */
    idDistrito: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DistritoEntity>> {

    const rb = new RequestBuilder(this.rootUrl, DistritoControllerService.ObtenerPorIdUsingGet1Path, 'get');
    if (params) {
      rb.path('idDepartamento', params.idDepartamento, {"style":"simple"});
      rb.path('idProvincia', params.idProvincia, {"style":"simple"});
      rb.path('idDistrito', params.idDistrito, {"style":"simple"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DistritoEntity>;
      })
    );
  }

  /**
   * obtenerPorId.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerPorIdUsingGet1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorIdUsingGet1(params: {

    /**
     * idDepartamento
     */
    idDepartamento: number;

    /**
     * idProvincia
     */
    idProvincia: number;

    /**
     * idDistrito
     */
    idDistrito: number;
    context?: HttpContext
  }
): Observable<DistritoEntity> {

    return this.obtenerPorIdUsingGet1$Response(params).pipe(
      map((r: StrictHttpResponse<DistritoEntity>) => r.body as DistritoEntity)
    );
  }

}

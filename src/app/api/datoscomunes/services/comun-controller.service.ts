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

import { ComunResponse } from '../models/comun-response';


/**
 * Comun Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ComunControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation obtenerPorTipoUsingGet
   */
  static readonly ObtenerPorTipoUsingGetPath = '/api/v1/comunes/filtrarportipo';

  /**
   * obtenerPorTipo.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obtenerPorTipoUsingGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorTipoUsingGet$Response(params?: {

    /**
     * tipoMaestroId
     */
    tipoMaestroId?: number;

    /**
     * municipalidadId
     */
    municipalidadId?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ComunResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ComunControllerService.ObtenerPorTipoUsingGetPath, 'get');
    if (params) {
      rb.query('tipoMaestroId', params.tipoMaestroId, {"style":"form"});
      rb.query('municipalidadId', params.municipalidadId, {"style":"form"});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ComunResponse>>;
      })
    );
  }

  /**
   * obtenerPorTipo.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `obtenerPorTipoUsingGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obtenerPorTipoUsingGet(params?: {

    /**
     * tipoMaestroId
     */
    tipoMaestroId?: number;

    /**
     * municipalidadId
     */
    municipalidadId?: number;
    context?: HttpContext
  }
): Observable<Array<ComunResponse>> {

    return this.obtenerPorTipoUsingGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ComunResponse>>) => r.body as Array<ComunResponse>)
    );
  }

}

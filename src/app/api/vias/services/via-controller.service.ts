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

import { ViaRequest } from '../models/via-request';
import { ViaResponse } from '../models/via-response';


/**
 * Via Controller
 */
@Injectable({
  providedIn: 'root',
})
export class ViaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listarUsingPost
   */
  static readonly ListarUsingPostPath = '/api/v1/vias/listar';

  /**
   * listar.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listarUsingPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listarUsingPost$Response(params?: {
    context?: HttpContext
    body?: ViaRequest
  }
): Observable<StrictHttpResponse<Array<ViaResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ViaControllerService.ListarUsingPostPath, 'post');
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
        return r as StrictHttpResponse<Array<ViaResponse>>;
      })
    );
  }

  /**
   * listar.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listarUsingPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listarUsingPost(params?: {
    context?: HttpContext
    body?: ViaRequest
  }
): Observable<Array<ViaResponse>> {

    return this.listarUsingPost$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ViaResponse>>) => r.body as Array<ViaResponse>)
    );
  }

}

import { Injectable } from '@angular/core';
import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

type ErrorHandle = {
	status?: number;
	message?: string;
};

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<ErrorHandle>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				const { status } = error;
				const errorMsg = {
					status: error.status,
					message: '',
				};

				if (status >= 500) {
					errorMsg.message = error.message;
				} else if (status >= 400) {
					errorMsg.message = error.error.message || error.error.mensaje;
				} else {
					errorMsg.message = 'Error';
				}

				// // client error
				// if (error.error instanceof ErrorEvent) {
				// 	errorMsg.message = error.error.message;
				// } else {
				// 	// server error
				// 	errorMsg.message = error.message;
				// }
				return throwError(() => errorMsg);
			})
		);
	}
}

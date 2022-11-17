import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorCatchingInterceptor } from './error.interceptor';

export const httpInterceptorProviders = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ErrorCatchingInterceptor,
		multi: true,
	},
];

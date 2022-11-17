import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule as ApiModuleContribuyente } from './api/contribuyente/api.module';
import { ApiModule as ApiModuleDatosComunes } from './api/datoscomunes/api.module';
import { NgBootstrapModule } from './bootstrap/bootstrap.module';

// views
import { PageNotFoundComponent } from './views';

// components
import { AppComponent } from './app.component';
import { AlertaComponent } from './shared/components/alert/alert.component';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent, AlertaComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ApiModuleDatosComunes, // buscar mas informacion sobre la inyeccion de ApiModule
		ApiModuleContribuyente, //
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgBootstrapModule,
	],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

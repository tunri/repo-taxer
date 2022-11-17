/**
 * @description
 * Encargado de la ‘orquestación’ de los diferentes componentes que conforman
 * el Registro de Contribuyente y componente vinculado a la ruta '/contribuyente/registro'
 * @author jerson
 */
 import { Component, OnInit, ViewChild } from '@angular/core';
 import { Router, ActivatedRoute } from '@angular/router';
 import { finalize } from 'rxjs';
 import { ContribuyenteControllerService } from 'src/app/api/contribuyente/services';
 import { PATH_SEARCH_TAXPAYER } from 'src/app/core/data/slug-routes';
 import { AlertService } from 'src/app/shared/components/alert/alert.service';
 import { DialogConfirmService } from 'src/app/shared/components/dialog-confirm/dialog-confirm.service';
 import { DatosContribuyenteComponent } from '../../components';
 
 @Component({
	 selector: 'app-registro-contribuyente',
	 templateUrl: './registro-contribuyente.component.html',
	 styleUrls: ['./registro-contribuyente.component.scss'],
 })
 export class RegistroContribuyenteComponent implements OnInit {
	 activeTab = 1;
	 loading = false;
	 numContribuyente!: number;
	 municipalidadId!: number;
 
	 private keyStorageNumContribuyente = 'numContribuyente';
 
	 // Acceso a componente 'Datos Contribuyente'
	 @ViewChild('contribuyente') contribuyente?: DatosContribuyenteComponent;
 
	 constructor(
		 private router: Router,
		 private route: ActivatedRoute,
		 private alertService: AlertService,
		 private contribuyenteService: ContribuyenteControllerService,
		 private dialogConfirm: DialogConfirmService
	 ) {}
 
	 ngOnInit(): void {
		 this.municipalidadId = 1;
		 this.numContribuyente = this.getNumContribuyente()!;
 
		 console.log(this.contribuyente?.numeroDj)
	 }
 
	 /**
	  * Ejecuta metodos de acuerdo al actual Tab Activo, generalmente
	  * para invocar procesos de validacion y/o integracion y pasar
	  * al siguiente tab
	  * @param index: indice del actual tab activo
	  */
	 onNext(index: number) {
		 switch (index) {
			 case 1:
				 this.guardarContribuyente();
				 break;
			 case 2:
				 this.activeTab = 3;
				 break;
			 case 3:
				 this.activeTab = 4;
				 break;
			 case 4:
				 this.activeTab = 5;
				 break;
			 case 5:
				 this.gurdarYGenerarDJ();
				 break;
			 default:
				 break;
		 }
	 }
 
	 /**
	  * Metodo que se invoca para cancelar el proceso de registro
	  */
	 onCancel() {
		 this.dialogConfirm
			 .confirm({
				 title: '¿Cancelar el registro de un nuevo contribuyente?',
				 message: '',
			 })
			 .closed.subscribe({
				 next: (response) => {
					 if (response) {
						 this.removeNumContribuyente();
						 this.router.navigateByUrl(`/${PATH_SEARCH_TAXPAYER}`);
					 }
				 },
			 });
	 }
 
	 /**
	  * Retorna el texto a mostrar en el boton primario
	  */
	 getTextNext() {
		 if (this.loading) return 'Grabando';
 
		 return this.activeTab !== 5 ? 'Siguiente' : 'Guardar';
	 }
 
	 private saveNumContribuyente(value: number) {
		 window.localStorage.setItem(
			 this.keyStorageNumContribuyente,
			 value.toString()
		 );
	 }
 
	 // Remueve el numContribuyente de LocalStorage
	 private removeNumContribuyente() {
		 window.localStorage.removeItem(this.keyStorageNumContribuyente);
	 }
 
	 /**
	  * Retorna el Numero de contribuyente guardado en localStorage o desde la URL,
	  * caso contrario retorna null
	  * @returns
	  */
 
	 private getNumContribuyente() {
		 const numLocalStorage = window.localStorage.getItem(
			 this.keyStorageNumContribuyente
		 );
 
		 const { id: idRoute } = this.route.snapshot.params;
 
		 if (idRoute) return Number(idRoute);
 
		 if (numLocalStorage) return Number(numLocalStorage);
 
		 return null;
	 }
 
	 /**
	  * Implementacion de Guardar Datos Contribuyente
	  * pasa a los demas componentes el 'Numero de Contribuyente'
	  */
	 private guardarContribuyente(): void {
		 const ref = this.contribuyente?.onNextRef();
		 if (ref) {
			 this.loading = true;
			 ref.pipe(finalize(() => (this.loading = false))).subscribe({
				 next: (response: any) => {
					 if (response && response.success) {
						 const { message, data } = response;
						 if (data) {
							 this.alertService.success(message);
							 this.numContribuyente = data.contribuyenteNumero;
							 this.saveNumContribuyente(this.numContribuyente);
							 this.activeTab = 2;
						 }
					 }
				 },
				 error: (error) => this.alertService.error(error.message),
			 });
		 }
	 }
 
	 /**
	  * Metodo que se invoca en el ultimo paso para crear el Numero DJ
	  */
	 private gurdarYGenerarDJ(): void {
		 this.loading = true;
		 this.contribuyenteService
			 .procesarCrearDjUsingPut({
				 contribuyenteNumero: this.numContribuyente,
				 municipalidadId: this.municipalidadId,
			 })
			 .pipe(finalize(() => (this.loading = false)))
			 .subscribe({
				 next: (response) => {
					 this.alertService.success('Numero DJ Generado');
					 this.router.navigateByUrl(`/${PATH_SEARCH_TAXPAYER}`);
				 },
				 error: (error) => this.alertService.error(error.message),
			 });
	 }
 }
 
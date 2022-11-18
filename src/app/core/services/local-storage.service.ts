import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private ls = window.localStorage;

	constructor() {}

	/**
	 * Guarda un valor en localStorage identificado con una key
	 * @param key
	 * @param value
	 */

	saveItem(key: string, value: string) {
		this.ls.setItem(key, value);
	}

	/**
	 * Remueve un valor en localStorage identificado con una key
	 * @param key
	 * @param value
	 */

	removeItem(key: string) {
		this.ls.removeItem(key);
	}

	/**
	 * Obtiene un valor en localStorage identificado con una key
	 * @param key
	 * @param value
	 */

	getItem(key: string) {
		this.ls.getItem(key);
	}

	exits(key: string): boolean {
		return Boolean(this.getItem(key));
	}
}

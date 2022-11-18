import { IContribuyenteLocalStorage } from '../models/custom-contribuyente.model';

const ls = window.localStorage;

// Singleton
export class ContribuyenteStorageSingleton {
	private static instance: ContribuyenteStorageSingleton;

	private key = 'schema';

	private keyContribuyente = 'contribuyente';
	private keySustentos = 'sustentos';
	private keyMediosContacto = 'contactos';

	private domicilioRelacionado: any[] = [];
	private relacionados: any[] = [];
	private domicilios: any[] = [];
	private sustentos: any[] = [];

	private constructor() {}

	public static getInstance(): ContribuyenteStorageSingleton {
		if (!ContribuyenteStorageSingleton.instance) {
			ContribuyenteStorageSingleton.instance =
				new ContribuyenteStorageSingleton();
		}

		return ContribuyenteStorageSingleton.instance;
	}

	// Contribuyente Storage
	initContribuyente(value: Object) {
		const token = ls.getItem(this.keyContribuyente);

		if (!token) {
			this.saveContribuyente(value);
		}
	}

	saveContribuyente(value: Object) {
		const data = this.getContribuyente();
		ls.setItem(
			this.keyContribuyente,
			JSON.stringify({ ...JSON.parse(data!), ...value })
		);
	}

	getContribuyente() {
		return ls.getItem(this.keyContribuyente);
	}

	// Sustento Storage
	initSustentos(value: any[]) {
		const sustentos = this.getSustentos();

		if (!sustentos) {
			this.saveSustento(value);
		}
	}

	saveSustento(value: any[]) {
		// const data = this.getSustentos();
		ls.setItem(this.keySustentos, JSON.stringify(value));
	}

	getSustentos() {
		return ls.getItem(this.keySustentos);
	}

	// Medios Contacto Storage
	initMediosContacto(value: any[]) {
		const data = this.getMediosContacto();

		if (!data) {
			this.saveMediosContacto(value);
		}
	}

	saveMediosContacto(value: any[]) {
		ls.setItem(this.keyMediosContacto, JSON.stringify(value));
	}

	getMediosContacto() {
		return ls.getItem(this.keyMediosContacto);
	}

	clearStorage(){
		ls.removeItem(this.keyContribuyente);
		ls.removeItem(this.keyMediosContacto);
		ls.removeItem(this.keySustentos);
	}
}

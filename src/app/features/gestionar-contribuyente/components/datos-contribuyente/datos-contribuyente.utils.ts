import { ContribuyentePersonaRequest } from 'src/app/api/contribuyente/models';
import {
	SLUG_PERSONA_JURIDICA,
	SLUG_PERSONA_NATURAL,
} from 'src/app/core/data/datos-comunes';
import { IDatosContribuyente } from 'src/app/core/models/custom-contribuyente.model';

import { parseStringDate, toNgDateStruct } from 'src/app/utils/calendar';

export const formToPayload = (FormValue: any): ContribuyentePersonaRequest => {
	const {
		tipMedDeterminaId,
		medDeterminaId,
		modOficio,
		fecInscripcion,
		tipPersonaId,
		segContribuyenteId,
		docIdentidadId,
		numDocIdentidad,
		razonSocial,
		apePaterno,
		apeMaterno,
		nombres,
		fecFallecimiento,
		fallecio,
		genero,
		fecNacimiento,
		estCivilTipId,
	} = FormValue;

	// Datos obligatorios
	const payload = {
		fuenteInfoId: 1,
		tipMedDeterminaId,
		medDeterminaId,
		modOficio,
		fecInscripcion: parseStringDate(fecInscripcion),
		tipPersonaId,
		segContribuyenteId,
		docIdentidadId,
		numDocIdentidad,
		razonSocial: '',
		apePaterno: '',
		apeMaterno: '',
		nombres: '',
		genero: '',
		fecFallecimiento: '',
		fecNacimiento: '',
		estCivilTipId: 0,
		fallecio: 0,
	};

	// datos agregados dinamicamente

	if (tipPersonaId === SLUG_PERSONA_JURIDICA) {
		payload.razonSocial = razonSocial;
	} else {
		payload.apePaterno = apePaterno;
		payload.apeMaterno = apeMaterno;
		payload.nombres = nombres;
		payload.fallecio = fallecio;
		payload.estCivilTipId = estCivilTipId;
		payload.fecNacimiento = parseStringDate(fecNacimiento);
		payload.fecFallecimiento = fallecio
			? parseStringDate(fecFallecimiento)
			: '';
		payload.genero = genero;
	}

	return payload;
};

/**
 * Retorna el objecto de valores iniciales para el Formulario
 * @param payload: Respuesta de API
 * @returns: {}
 */
export const payloadToForm = (payload: IDatosContribuyente) => {
	const {
		tipMedDeterminaId,
		medDeterminaId,
		modOficio,
		fecInscripcion,
		tipPersonaId,
		segContribuyenteId,
		docIdentidadId,
		numDocIdentidad,
		razonSocial,
		apePaterno,
		apeMaterno,
		nombres,
		fecFallecimiento,
		fallecio,
		genero,
		fecNacimiento,
		estCivilTipId,
	} = payload;

	const _fecFallecimiento =
		fecFallecimiento && fallecio ? toNgDateStruct(fecFallecimiento) : null;

	const _fecNacimiento = fecNacimiento ? toNgDateStruct(fecNacimiento) : null;

	return {
		tipMedDeterminaId,
		medDeterminaId,
		modOficio,
		fecInscripcion: fecInscripcion ? toNgDateStruct(fecInscripcion) : null,
		tipPersonaId,
		segContribuyenteId,
		docIdentidadId,
		numDocIdentidad,
		razonSocial,
		apePaterno,
		apeMaterno,
		nombres,
		fecFallecimiento: _fecFallecimiento,
		fallecio,
		genero,
		fecNacimiento: _fecNacimiento,
		estCivilTipId,
	};
};

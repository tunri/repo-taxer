import {
	ContactoContribuyenteListaResponse,
	DocumentoSustentoBuscarResponse,
	DomicilioBuscarResponse,
	RelacionadoBuscarResponse,
	DomicilioRelacionadoBuscarResponse,
} from 'src/app/api/contribuyente/models';

export type DomicilioTabla = DomicilioBuscarResponse & {
    selected               : boolean;
};

export type DocumentoSustentoTabla = DocumentoSustentoBuscarResponse & {
    selected               : boolean;
    index                  : number;
    accion?                : string;
};

export type MedioContactoTabla = ContactoContribuyenteListaResponse & {
    selected               : boolean;
    index                  : number;
};

export type RelacionadoBuscarModel = RelacionadoBuscarResponse & {
    selected               : boolean;
};

export type DomicilioRelacionadoModel = DomicilioRelacionadoBuscarResponse & {
    selected               : boolean;
};

export interface IDatosContribuyente {
    rowNum?                : number;
    municipalidadId?       : number;
    contribuyenteNumero?   : number;
    fecInscripcion?        : string;
    fechaDj?               : string;
    numeroDj?              : number;
    personaId?             : number;
    numOperacionId?        : number;
    tipPersonaId?          : number;
    desTipPersonaId?       : string;
    motivoDjId?            : number;
    desMotivoDjId?         : string;
    estadoDjId?            : number;
    desEstadoDjId?         : string;
    modOficio?             : number;
    tipMedDeterminaId?     : number;
    desTipMedDeterminaId?  : string;
    medDeterminaId?        : number;
    desMedDeterminaId?     : string;
    segContribuyenteId?    : number;
    desSegContribuyenteId? : string;
    fuenteInfoId?          : number;
    desFuenteInfoId?       : string;
    docIdentidadId?        : number;
    desDocIdentidadId?     : string;
    numDocIdentidad?       : string;
    apePaterno?            : string;
    apeMaterno?            : string;
    nombres?               : string;
    razonSocial?           : null;
    nombreCompleto?        : string;
    fecNacimiento?         : string;
    estCivilTipId?         : number;
    desEstCivilTipId?      : string;
    genero?                : string;
    fallecio?              : number;
    fecFallecimiento?      : null;
    usuarioAudi?           : null;
    fechaAudi?             : string;
    terminalAudit?         : string;
}

export type IContribuyenteLocalStorage = {
    contribuyente          : any;
    contactos              : any[];
    domicilioRelacionado   : any[];
    domicilios             : any[];
    relacionados           : any[];
    sustentos              : any[];
};

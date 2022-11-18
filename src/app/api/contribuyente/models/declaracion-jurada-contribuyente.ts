/* tslint:disable */
/* eslint-disable */
import { ContactoContribuyenteMasivoRequest } from './contacto-contribuyente-masivo-request';
import { ContribuyentePersonaRequest } from './contribuyente-persona-request';
import { DocumentoSustentoMasivoRequest } from './documento-sustento-masivo-request';
import { DomicilioMasivoRequest } from './domicilio-masivo-request';
import { DomicilioRelacionadoMasivoRequest } from './domicilio-relacionado-masivo-request';
import { RelacionadoPersonaMasivoRequest } from './relacionado-persona-masivo-request';
export interface DeclaracionJuradaContribuyente {
  contactos?: Array<ContactoContribuyenteMasivoRequest>;
  contribuyente?: ContribuyentePersonaRequest;
  domicilioRelacionado?: Array<DomicilioRelacionadoMasivoRequest>;
  domicilios?: Array<DomicilioMasivoRequest>;
  relacionados?: Array<RelacionadoPersonaMasivoRequest>;
  sustentos?: Array<DocumentoSustentoMasivoRequest>;
}

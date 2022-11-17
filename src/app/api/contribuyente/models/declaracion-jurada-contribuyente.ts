/* tslint:disable */
/* eslint-disable */
import { ContactoContribuyenteRequest } from './contacto-contribuyente-request';
import { ContribuyentePersonaRequest } from './contribuyente-persona-request';
import { DocumentoSustentoRequest } from './documento-sustento-request';
import { DomicilioRelacionadoRequest } from './domicilio-relacionado-request';
import { DomicilioRequest } from './domicilio-request';
import { RelacionadoPersonaRequest } from './relacionado-persona-request';
export interface DeclaracionJuradaContribuyente {
  contactos?: Array<ContactoContribuyenteRequest>;
  contribuyente?: ContribuyentePersonaRequest;
  domicilioRelacionado?: Array<DomicilioRelacionadoRequest>;
  domicilios?: Array<DomicilioRequest>;
  relacionados?: Array<RelacionadoPersonaRequest>;
  sustentos?: Array<DocumentoSustentoRequest>;
}

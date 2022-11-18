/* tslint:disable */
/* eslint-disable */
export interface DomicilioRequest {
  departamentoId: number;
  descripcionDomicilio?: string;
  descripcionInterior?: string;
  distritoId: number;
  edificacionId?: number;
  estructurado?: number;
  fuenteInformacionId?: number;
  ingreso?: string;
  kilometro?: string;
  latitud?: number;
  letra1?: string;
  letra2?: string;
  longitud?: number;
  lote?: string;
  manzana?: string;
  numero1?: number;
  numero2?: number;
  piso?: string;
  provinciaId: number;
  referencia?: string;
  subLote?: string;
  subZonaUrbanaId?: number;
  tipDomicilioId: number;
  tipoInteriorId?: number;
  tipoPredioId: number;
  viaDepartamentoId?: number;
  viaDistritoId?: number;
  viaId?: number;
  viaProvinciaId?: number;
  zonaUrbanaId?: number;
}

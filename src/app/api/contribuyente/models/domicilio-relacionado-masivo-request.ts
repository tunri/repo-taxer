/* tslint:disable */
/* eslint-disable */
export interface DomicilioRelacionadoMasivoRequest {
  accion?: 'ACTUALIZAR' | 'CREAR' | 'ELIMINAR';
  carretera?: string;
  codCatastral?: string;
  departamentoId: number;
  desDomicilio?: string;
  desInterior?: string;
  distritoId: number;
  domRelacionadoNumero?: number;
  edificacionId?: number;
  fuenteInfoId?: number;
  ingreso?: string;
  kilometro?: string;
  letra1?: string;
  letra2?: string;
  lote?: string;
  manzana?: string;
  nombrePredio?: string;
  numero1?: number;
  numero2?: number;
  parcela?: string;
  piso?: string;
  provinciaId: number;
  referencia?: string;
  relContribuyenteNumero?: number;
  subLote?: number;
  subZonaUrbanaId?: number;
  tipInteriorId?: number;
  tipPreRusticoId?: number;
  tipPredioId: number;
  viaDepartamentoId?: number;
  viaDistritoId?: number;
  viaId?: number;
  viaProvinciaId?: number;
  zonaUrbanaId?: number;
}

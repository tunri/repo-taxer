/* tslint:disable */
/* eslint-disable */
export interface DocumentoSustentoRequest {
  accion?: 'ACTUALIZAR' | 'CREAR' | 'ELIMINAR';
  docSusContribuyenteId: number;
  folios: number;
  forPresentacionId: number;
  nroDocSustento: string;
  tipDocSustentoId: number;
}

/* tslint:disable */
/* eslint-disable */
export interface ContactoContribuyenteMasivoRequest {
  accion?: 'ACTUALIZAR' | 'CREAR' | 'ELIMINAR';
  claMedContactoId?: number;
  descripcion?: string;
  medConContribuyenteId?: number;
  principal?: number;
  tipMedContactoId?: number;
}

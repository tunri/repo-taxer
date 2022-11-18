/* tslint:disable */
/* eslint-disable */
export interface RelacionadoPersonaMasivoRequest {
  accion?: 'ACTUALIZAR' | 'CREAR' | 'ELIMINAR';
  anexo?: string;
  apeMaterno?: string;
  apePaterno?: string;
  correoElectronico?: string;
  docIdentidadId: number;
  fecVigFinal?: string;
  fecVigInicial: string;
  nombres?: string;
  numDocIdentidad: string;
  relContribuyenteNumero?: number;
  telefonoCelular?: string;
  telefonoFijo?: string;
  tipRelacionadoId: number;
}

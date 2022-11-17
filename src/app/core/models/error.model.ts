import { ErrorDetalleModel } from "./";

export interface ErrorModel{
    codigo: string,
    mensaje: string,
    errores?: ErrorDetalleModel[]
}
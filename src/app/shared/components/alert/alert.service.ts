import { Injectable } from '@angular/core';
import { ErrorDetalleModel, ErrorModel } from 'src/app/core/models';

interface Alerta {
  message?: string;
  classname?: string;
  delay?: number;
  title?: string;
  errores?: ErrorDetalleModel[];
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  toasts: Alerta[] = [];

  success(message: string) {
    this.show(message, 'bg-alert-success mb-1', 5000);
  }

  error(message: string) {
    this.show(message, 'bg-alert-danger mb-1', 5000);
  }

  errorModel(errorModel: ErrorModel) {
    const message: string = `${errorModel.codigo} - ${errorModel.mensaje}`;
    this.show(message, 'bg-alert-danger mb-1', 10000, errorModel.errores);
  }

  warning(message: string) {
    this.show(message, 'bg-alert-warning mb-1', 5000);
  }

  info(message: string) {
    this.show(message, 'bg-alert-info mb-1', 5000);
  }

  show(
    message: string,
    clasname: string,
    delay: number,
    errores?: ErrorDetalleModel[]
  ) {
    this.toasts.push({
      message: message,
      classname: clasname,
      delay: delay,
      errores: errores,

    });
  }

  remove(toast: any | null) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}

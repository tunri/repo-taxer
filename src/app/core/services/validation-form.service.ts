import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationFormService {
  constructor() {}

  /**
   * @description retorna true si el campo es invalido, considera el touched y dirty del input
   * @param input: {AbstractControl} de un input
   * @param submitted:{boolean} indica si hizo click a enviar, guardar, etc.
   * @returns {boolean}
   */
  isControlInvalid(input: AbstractControl, submitted: boolean): boolean {
    return input.invalid && (input.dirty || input.touched || submitted);
  }
}

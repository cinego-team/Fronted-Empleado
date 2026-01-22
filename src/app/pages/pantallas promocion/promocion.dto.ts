export class EditPromocionInput {
  id?: number;
  nombre?: string;
  porcentajeDescuento?: number;
  tipoClienteId?: number;
  diaId?: number;
}
export class EditPromocionOutput {
  nombre?: string;
  porcentajeDescuento?: number;
  diaId?: number;
  tipoClienteId?: number;
}

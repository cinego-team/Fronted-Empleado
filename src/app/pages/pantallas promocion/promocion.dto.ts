export class EditPromocionInput {
  id?: number;
  nombre?: string;
  porcentajeDescuento?: number;
  tipoCliente?: string;
  dia?: string;
}
export class EditPromocionOutput {
  nombre?: string;
  porcentajeDescuento?: number;
  dia?: string;
  tipoCliente?: string;
}

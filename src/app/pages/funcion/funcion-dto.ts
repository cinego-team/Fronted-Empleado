export class EditFuncion {
  peliculaId?: number;
  fecha?: Date;
  estaDisponible?: boolean;
  sala?: {
    id?: number;
    nroSala?: number;
  };
  idioma?: {
    id?: number;
    nombre?: string;
  };
  formato?: {
    id?: number;
    nombre?: string;
    precio?: number;
  };
}
export class FuncionInput {
  id?: number;
  peliculaId?: number;
  fecha?: Date;
  estaDisponible?: boolean;
  sala?: {
    id?: number;
    nroSala?: number;
  };
  idioma?: {
    id?: number;
    nombre?: string;
  };
  formato?: {
    id?: number;
    nombre?: string;
    precio?: number;
  };
}

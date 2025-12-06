export class EditFuncion {
  peliculaId?: number;
  fecha?: Date;
  hora?: Date;
  disponible?: boolean;
  sala?: {
    numeroSala?: number;
  };
  formato?: {
    nombre?: string;
    precio?: number;
  };
}
export class FuncionInput {
  id?: number;
  peliculaId?: number;
  fecha?: Date;
  hora?: Date;
  disponible?: boolean;
  sala?: {
    numeroSala?: number;
  };
  formato?: {
    nombre?: string;
    precio?: number;
  };
}

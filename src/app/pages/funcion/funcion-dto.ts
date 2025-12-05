export class EditFuncion {
  pelicula?: string;
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
  pelicula?: string;
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

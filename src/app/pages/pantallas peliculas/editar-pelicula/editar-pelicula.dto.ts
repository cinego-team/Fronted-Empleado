export interface EmpleadoInput {
  id: number;
  legajo: number;
  nombre: string;
  apellido: string;
}
export class EditPeliculaInput {
  id!: number; // obligatorio para update
  titulo!: string;
  sinopsis!: string;
  director!: string;
  duracion!: number;
  fechaEstreno!: string;
  genero!: {
    id: number;
    nombre: string;
  };
  clasificacion!: {
    id: number;
    nombre: string;
  };

  estado!: {
    id: number;
    nombre: string;
  };
  empleado!: EmpleadoInput;
  urlImagen!: string;
}

export class EditPeliculaOutput {
  titulo!: string;
  sinopsis!: string;
  director!: string;
  duracion!: number;
  fechaEstreno!: string;
  genero!: {
    id: number;
    nombre: string;
  };
  clasificacion!: {
    id: number;
    nombre: string;
  };

  estado!: {
    id: number;
    nombre: string;
  };
  empleado!: EmpleadoInput;
  urlImagen!: string;
}

export interface EmpleadoInput {
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
  idioma!: string; // nombre
  genero!: string; // nombre
  clasificacion!: string; // nombre
  estado!: string; // nombre
  empleado!: EmpleadoInput;
  urlImagen!: string;
}

export class EditPeliculaOutput {
  titulo!: string;
  sinopsis!: string;
  director!: string;
  duracion!: number;
  fechaEstreno!: string;
  idioma!: string; // nombre
  genero!: string; // nombre
  clasificacion!: string; // nombre
  estado!: string; //nombre
  empleado!: EmpleadoInput;
  urlImagen!: string;
}

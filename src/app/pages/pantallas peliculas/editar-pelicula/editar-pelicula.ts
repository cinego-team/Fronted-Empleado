import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditPeliculaOutput } from './editar-pelicula.dto';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-pelicula.html',
  styleUrls: ['./editar-pelicula.css'],
})
export class EditarPelicula implements OnInit {
  pelicula: any;
  originalPelicula: any;
  form!: FormGroup;

  estados: any[] = [];
  clasificaciones: any[] = [];
  generos: any[] = [];
  idiomas: any[] = [];
  anios: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const peliculaId = this.route.snapshot.paramMap.get('id');
    this.initialization(peliculaId);
  }

  async initialization(peliculaId: string | null): Promise<void> {
    if (!peliculaId) {
      alert('No se proporcionó un ID de película válido.');
      return;
    }

    try {
      // 1Obtener la película
      const fetched = await this.apiService.getPeliculaById(+peliculaId);
      console.log('Película obtenida:', fetched);
      this.pelicula = { ...fetched };
      this.originalPelicula = { ...fetched };

      //  Crear el formulario
      // Normalizar posibles valores que pueden venir como objeto o como id directo
      const estadoId =
        fetched.estado && typeof fetched.estado === 'object'
          ? (fetched.estado as any).id
          : fetched.estado;
      const clasificacionId =
        fetched.clasificacion && typeof fetched.clasificacion === 'object'
          ? (fetched.clasificacion as any).id
          : fetched.clasificacion;
      const generoId =
        fetched.genero && typeof fetched.genero === 'object'
          ? (fetched.genero as any).id
          : fetched.genero;
      const idiomaId =
        fetched.idioma && typeof fetched.idioma === 'object'
          ? (fetched.idioma as any).id
          : fetched.idioma;

      this.form = this.fb.group({
        titulo: [fetched.titulo || '', [Validators.required, Validators.minLength(2)]],
        duracion: [fetched.duracion || '', [Validators.required, Validators.min(1)]],
        fechaEstrenoDia: [new Date(fetched.fechaEstreno).getDate()],
        fechaEstrenoMes: [new Date(fetched.fechaEstreno).getMonth() + 1],
        fechaEstrenoAnio: [new Date(fetched.fechaEstreno).getFullYear()],
        director: [fetched.director || '', Validators.required],
        sinopsis: [fetched.sinopsis || ''],
        urlImagen: [
          fetched.urlImagen || '',
          [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i)],
        ],
        estado: [estadoId || ''],
        clasificacion: [clasificacionId || ''],
        genero: [generoId || ''],
        idioma: [idiomaId || ''],
      });

      // Cargar listas para los selects
      const [estados, clasificaciones, generos, idiomas] = await Promise.all([
        this.apiService.getAllEstados(),
        this.apiService.getAllClasificaciones(),
        this.apiService.getAllGeneros(),
        this.apiService.getAllIdiomas(),
      ]);
      this.estados = estados;
      this.clasificaciones = clasificaciones;
      this.generos = generos;
      this.idiomas = idiomas;

      //  Generar lista de años (para el select)
      const currentYear = new Date().getFullYear();
      this.anios = Array.from({ length: 100 }, (_, i) => currentYear - i);
    } catch (error) {
      console.error('Error en initialization:', error);
      alert('Error al obtener la película o cargar datos del backend.');
    }
  }

  onBack() {
    this.router.navigate(['/pelicula/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const updated: EditPeliculaOutput = this.form.value;
    const modifiedKeys = Object.keys(updated).filter(
      (key) => (updated as any)[key] !== (this.originalPelicula as any)[key]
    );

    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
      return;
    }

    const peliculaActualizada: EditPeliculaOutput = { ...this.originalPelicula, ...updated };

    this.apiService
      .updatePelicula(peliculaActualizada)
      .then(() => {
        alert('Película actualizada correctamente.');
        this.router.navigate(['/pelicula/lista']);
      })
      .catch((error) => {
        console.error('Error al actualizar la película:', error);
        alert('Error al actualizar la película.');
      });
  }
}

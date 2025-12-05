import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-pelicula',
  templateUrl: './editar-pelicula.html',
  styleUrls: ['./editar-pelicula.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditPeliculaComponent implements OnInit {
  peliculaId!: number;
  pelicula: any = null;
  form!: FormGroup;
  idiomas: any[] = [];
  generos: any[] = [];
  clasificaciones: any[] = [];
  estados: any[] = [];
  anios: number[] = [];

  constructor(
    private apiService: ApiServicePelicula,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.peliculaId = Number(this.route.snapshot.paramMap.get('id'));

    this.generarAnios();
    this.crearFormulario();
    this.cargarListas();
    this.cargarPelicula();
  }

  // FORMULARIO REACTIVO
  crearFormulario(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      estado: ['', Validators.required],
      duracion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      fechaEstrenoDia: ['', Validators.required],
      fechaEstrenoMes: ['', Validators.required],
      fechaEstrenoAnio: ['', Validators.required],
      genero: ['', Validators.required],
      director: ['', Validators.required],
      idioma: ['', Validators.required],
      sinopsis: ['', Validators.required],
      urlImagen: ['', Validators.required],
    });
  }

  generarAnios(): void {
    const anioActual = new Date().getFullYear();
    for (let a = anioActual; a >= 1900; a--) this.anios.push(a);
  }

  // Cargar listas del backend
  cargarListas(): void {
    this.apiService.getAllIdiomas().then((data) => (this.idiomas = data));
    this.apiService.getAllGeneros().then((data) => (this.generos = data));
    this.apiService.getAllClasificaciones().then((data) => (this.clasificaciones = data));
    this.apiService.getAllEstados().then((data) => (this.estados = data));
  }

  // Cargar película existente
  cargarPelicula(): void {
    this.apiService.getPeliculaById(this.peliculaId).then((data) => {
      this.pelicula = {
        id: data.id,
        titulo: data.titulo,
        sinopsis: data.sinopsis,
        director: data.director,
        duracion: data.duracion,
        fechaEstreno: data.fechaEstreno,
        idioma: data.idioma.nombre,
        genero: data.genero.nombre,
        clasificacion: data.clasificacion.nombre,
        estado: data.estado.nombre,
        empleado: { id: 1 },
        urlImagen: data.urlImagen,
      };

      this.setFechaEstreno(data.fechaEstreno);
    });
  }

  //convertir la fecha
  setFechaEstreno(fecha: string): void {
    const d = new Date(fecha);
    this.form.patchValue({
      fechaEstrenoDia: d.getDate(),
      fechaEstrenoMes: d.getMonth() + 1,
      fechaEstrenoAnio: d.getFullYear(),
    });
  }

  // GUARDAR CAMBIOS

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const v = this.form.value;

    const payload = {
      ...this.pelicula,
      titulo: v.titulo,
      sinopsis: v.sinopsis,
      director: v.director,
      duracion: v.duracion,
      idioma: v.idioma,
      genero: v.genero,
      clasificacion: v.clasificacion,
      estado: v.estado,
      urlImagen: v.urlImagen,
      fechaEstreno: `${v.fechaEstrenoAnio}-${v.fechaEstrenoMes}-${v.fechaEstrenoDia}`,
    };

    this.apiService
      .updatePelicula(payload)
      .then(() => {
        alert('Película actualizada correctamente');
        this.router.navigate(['/pelicula/lista']);
      })
      .catch((err) => console.error(err));
  }

  onBack(): void {
    this.router.navigate(['/pelicula/lista']);
  }
  inicio(): void {
    this.router.navigate(['/home']);
  }
}

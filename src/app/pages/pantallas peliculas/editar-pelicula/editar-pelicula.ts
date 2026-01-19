import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { CommonModule } from '@angular/common';
import { Header } from '../../../shared/header/header';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';

@Component({
  selector: 'app-edit-pelicula',
  templateUrl: './editar-pelicula.html',
  styleUrls: ['./editar-pelicula.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
})
export class EditPeliculaComponent implements OnInit {
  peliculaId!: number;
  pelicula: any = null;
  originalPelicula: any;
  form!: FormGroup;
  generos: any[] = [];
  clasificaciones: any[] = [];
  estados: any[] = [];
  anios: number[] = [];
  empleadoLogueado: { id: number; legajo: number; nombre: string; apellido: string } | null = null;

  compareById(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  constructor(
    private apiService: ApiServicePelicula,
    private apiServiceUsuario: ApiServiceUsuario,  
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.pelicula ??
      (history.state as any)?.pelicula;

    if (!navState) {
      alert('No se encontró la película. Volvé al listado.');
      this.router.navigate(['/pelicula/lista']);
      return;
    }

    this.pelicula = { ...navState };
    this.originalPelicula = { ...navState };

    this.generarAnios();
    this.crearFormulario();
    
    // Esperar a que las listas se carguen ANTES de setear los valores
    await this.cargarListas();
    this.empleadoLogueado = await this.apiServiceUsuario.getEmpleadoCompletoDesdeToken();
    this.cargarPeliculaEnFormulario();
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      estado: [null, Validators.required],
      duracion: ['', Validators.required],
      clasificacion: [null, Validators.required],
      fechaEstrenoDia: ['', Validators.required],
      fechaEstrenoMes: ['', Validators.required],
      fechaEstrenoAnio: ['', Validators.required],
      genero: [null, Validators.required],
      director: ['', Validators.required],
      sinopsis: ['', Validators.required],
      urlImagen: [''],
    });
  }

  generarAnios(): void {
    const anioActual = new Date().getFullYear();
    for (let a = anioActual; a >= 1900; a--) this.anios.push(a);
  }

  // Cargar listas del backend - ahora es async
  async cargarListas(): Promise<void> {
    try {
      const [generos, clasificaciones, estados] = await Promise.all([
        this.apiService.getAllGeneros(),
        this.apiService.getAllClasificaciones(),
        this.apiService.getAllEstados(),
      ]);
      this.generos = generos;
      this.clasificaciones = clasificaciones;
      this.estados = estados;
    } catch (error) {
      console.error('Error cargando listas:', error);
    }
  }

  cargarPeliculaEnFormulario(): void {
    const p = this.pelicula;

    // Buscar los objetos en las listas cargadas
    const generoObj = this.generos.find(g => g.id === p.genero?.id) || null;
    const clasificacionObj = this.clasificaciones.find(c => c.id === p.clasificacion?.id) || null;
    const estadoObj = this.estados.find(e => e.id === p.estado?.id) || null;

    this.form.patchValue({
      titulo: p.titulo,
      sinopsis: p.sinopsis,
      director: p.director,
      duracion: p.duracion,
      genero: generoObj,
      clasificacion: clasificacionObj,
      estado: estadoObj,
      urlImagen: p.urlImagen,
    });

    // Cargar la fecha de estreno
    if (p.fechaEstreno) {
      this.setFechaEstreno(p.fechaEstreno);
    }
  }

  setFechaEstreno(fecha: string): void {
    const d = new Date(fecha);
    this.form.patchValue({
      fechaEstrenoDia: d.getDate(),
      fechaEstrenoMes: d.getMonth() + 1,
      fechaEstrenoAnio: d.getFullYear(),
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
      return;
    }

    const v = this.form.value;

    // Formatear la fecha correctamente con padding de ceros
    const mes = String(v.fechaEstrenoMes).padStart(2, '0');
    const dia = String(v.fechaEstrenoDia).padStart(2, '0');
    const empleadoLogueado = JSON.parse(localStorage.getItem('empleado') || '{}');

    const payload = {
      id: this.pelicula.id,
      titulo: v.titulo,
      sinopsis: v.sinopsis,
      director: v.director,
      duracion: Number(v.duracion),
      urlImagen: v.urlImagen,
      fechaEstreno: `${v.fechaEstrenoAnio}-${mes}-${dia}`,
      genero: { id: v.genero.id, nombre: v.genero.nombre },
      clasificacion: { id: v.clasificacion.id, nombre: v.clasificacion.nombre },
      estado: { id: v.estado.id, nombre: v.estado.nombre },
      empleado: empleadoLogueado,
    };

    this.apiService
      .updatePeliculaAdmin(payload)
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
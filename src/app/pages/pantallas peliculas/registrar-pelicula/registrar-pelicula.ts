import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';

@Component({
  selector: 'app-registrar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './registrar-pelicula.html',
  styleUrl: './registrar-pelicula.css',
})
export class RegistrarPelicula implements OnInit {
  form!: FormGroup;

  estados: any[] = [];
  clasificaciones: any[] = [];
  generos: any[] = [];
  idiomas: any[] = [];
  empleadoLogueado: { id: number; legajo: number; nombre: string; apellido: string } | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServicePelicula,
    private apiServiceUsuario: ApiServiceUsuario,
  ) {}

  async ngOnInit(): Promise<void> {
    // Formulario nuevo
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      duracion: ['', Validators.required],
      fechaEstreno: ['', Validators.required],
      director: ['', Validators.required],
      sinopsis: ['', Validators.required],
      urlImagen: ['', Validators.required],
      estado: ['', Validators.required],
      clasificacion: ['', Validators.required],
      genero: ['', Validators.required],
    });
    this.empleadoLogueado = await this.apiServiceUsuario.getEmpleadoCompletoDesdeToken();

    // Cargar listas desde backend
    try {
      this.estados = await this.apiService.getAllEstados();
      this.clasificaciones = await this.apiService.getAllClasificaciones();
      this.generos = await this.apiService.getAllGeneros(1, 99999);
      console.log(this.generos);
    } catch (error) {
      console.error('Error al cargar datos del backend:', error);
    }
  }

  OnBack() {
    this.router.navigate(['/pelicula/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }

  async onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      const data = this.form.value;

      const estadoId = Number(data.estado);
      const clasificacionId = Number(data.clasificacion);
      const generoId = Number(data.genero);

      const estadoObj = this.estados.find((e) => e.id === estadoId);
      const clasificacionObj = this.clasificaciones.find((c) => c.id === clasificacionId);
      const generoObj = this.generos.find((g) => g.id === generoId);

      if (!estadoObj || !clasificacionObj || !generoObj) {
        console.log('[v0] No encontrados:', { estadoObj, clasificacionObj, generoObj });
        alert('Error: No se encontraron los datos de estado, clasificación o género.');
        return;
      }

      const peliculaParaEnviar = {
        titulo: data.titulo,
        sinopsis: data.sinopsis,
        director: data.director,
        duracion: Number(data.duracion),
        fechaEstreno: data.fechaEstreno,
        urlImagen: data.urlImagen,
        estado: { id: estadoObj.id, nombre: estadoObj.nombre },
        clasificacion: { id: clasificacionObj.id, nombre: clasificacionObj.nombre },
        genero: { id: generoObj.id, nombre: generoObj.nombre },
        empleado: this.empleadoLogueado ?? { id: 0, legajo: 0, nombre: '', apellido: '' },
      };

      await this.apiService.createPeliculaAdmin(peliculaParaEnviar);
      alert('Película creada correctamente.');
      this.router.navigate(['/pelicula/lista']);
    } catch (error) {
      console.error('Error al crear película:', error);
      alert('Error al crear la película.');
    }
  }
}

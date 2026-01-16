import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';

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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServicePelicula
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

    // Cargar listas desde backend
    try {
      this.estados = await this.apiService.getAllEstados();
      this.clasificaciones = await this.apiService.getAllClasificaciones();
      this.generos = await this.apiService.getAllGeneros();
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

      // Convertir ID → nombre (lo que necesita tu DTO)
      const peliculaParaEnviar = {
        titulo: data.titulo,
        sinopsis: data.sinopsis,
        director: data.director,
        duracion: data.duracion,
        fechaEstreno: data.fechaEstreno,
        urlImagen: data.urlImagen,

        estado: this.estados.find((e) => e.id === Number(data.estado))?.nombre,
        clasificacion: this.clasificaciones.find((c) => c.id === Number(data.clasificacion))
          ?.nombre,
        genero: this.generos.find((g) => g.id === Number(data.genero))?.nombre,

        empleado: null,
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

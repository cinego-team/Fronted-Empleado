import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-registrar-pelicula',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-pelicula.html',
  styleUrl: './registrar-pelicula.css',
})
export class RegistrarPelicula implements OnInit {
  form!: FormGroup;
  restaurant: any;
  error: string | null = null;
  estados: any[] = [];
  clasificaciones: any[] = [];
  generos: any[] = [];
  idiomas: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private apiService: ApiService) {}
  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      duracion: ['', [Validators.required, Validators.min(0)]],
      fechaEstrenoDia: [''],
      fechaEstrenoMes: [''],
      fechaEstrenoAnio: [''],
      director: [''],
      sinopsis: [''],
      urlImagen: [
        [
          '',
          Validators.required,
          Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i),
        ],
      ],

      estado: [''],
      clasificacion: [''],
      genero: [''],
      idioma: [''],
    });
    try {
      this.estados = await this.apiService.getAllEstados();
      this.clasificaciones = await this.apiService.getAllClasificaciones();
      this.generos = await this.apiService.getAllGeneros();
      this.idiomas = await this.apiService.getAllIdiomas();
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
      const { fechaEstrenoDia, fechaEstrenoMes, fechaEstrenoAnio, ...rest } = this.form.value;

      const fechaEstreno = `${fechaEstrenoAnio}-${String(fechaEstrenoMes).padStart(
        2,
        '0'
      )}-${String(fechaEstrenoDia).padStart(2, '0')}`;

      const pelicula = { ...rest, fechaEstreno };

      await this.apiService.createPelicula(pelicula);

      alert('Película creada correctamente.');
      this.router.navigate(['/pelicula/lista']);
    } catch (error) {
      console.error('Error al crear la película:', error);
      alert('Error al crear la película. Por favor, inténtalo de nuevo más tarde.');
    }
  }
}

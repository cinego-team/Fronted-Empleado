import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';

@Component({
  selector: 'app-registrar-funcion',
  standalone: true,
  templateUrl: './registrar-funcion.html',
  styleUrl: './registrar-funcion.css',
  imports: [ReactiveFormsModule],
})
export class RegistrarFuncion {
  form: FormGroup;

  peliculas: any[] = [];
  formatos: any[] = [];
  salas: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServiceFunciones,
    private apiService2: ApiServicePelicula
  ) {
    this.form = this.fb.group({
      pelicula: ['', Validators.required],
      formato: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      sala: ['', Validators.required],
      disponible: [true, Validators.required],
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      this.peliculas = await this.apiService2.getPeliculas();
      this.formatos = await this.apiService.findAll();
      this.salas = await this.apiService.getAllSalas();
    } catch (err) {
      console.error('Error al cargar los combos:', err);
      alert('Error al cargar datos.');
    }
  }

  registrar() {
    if (this.form.invalid) {
      alert('Por favor, completa correctamente todos los campos.');
      return;
    }

    const dto = {
      pelicula: this.form.value.pelicula,
      fecha: this.form.value.fecha,
      hora: this.form.value.hora,
      disponible: this.form.value.disponible === 'true',
      sala: {
        numeroSala: Number(this.form.value.sala),
      },
      formato: this.form.value.formato,
    };

    this.apiService
      .createFuncion(dto)
      .then(() => {
        alert('Función creada correctamente.');
        this.router.navigate(['/funcion/lista']);
      })
      .catch((err) => {
        console.error(err);
        alert('Error al crear la función.');
      });
  }

  volver() {
    this.router.navigate(['/funcion/lista']);
  }
}

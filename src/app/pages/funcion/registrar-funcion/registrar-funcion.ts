import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-registrar-funcion',
  standalone: true,
  templateUrl: './registrar-funcion.html',
  styleUrl: './registrar-funcion.css',
  imports: [CommonModule, ReactiveFormsModule, Header], // Agregar CommonModule
})
export class RegistrarFuncion {
  form: FormGroup;

  peliculas: any[] = [];
  formatos: any[] = [];
  salas: any[] = [];
  idiomas: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServiceFunciones,
    private apiService2: ApiServicePelicula,
  ) {
    this.form = this.fb.group({
      pelicula: [null, Validators.required],
      formato: [null, Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      sala: [null, Validators.required],
      disponible: [true, Validators.required],
      idioma: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      this.peliculas = await this.apiService2.getPeliculasParaSelec();
      this.formatos = await this.apiService.findAllAdmin();
      this.salas = await this.apiService.getSalasForSelec();
      this.idiomas = await this.apiService.getAllIdiomas();
    } catch (err) {
      alert('Error al cargar datos.');
    }
  }

  async registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa correctamente todos los campos.');
      return;
    }

    const { pelicula, formato, fecha, hora, sala, disponible, idioma } = this.form.value;

    const dto = {
      peliculaId: pelicula.id,
      fecha: fecha,
      hora: hora,
      estaDisponible: disponible,
      sala: {
        id: sala.id,
        nroSala: sala.nroSala,
      },
      formato: {
        id: formato.id,
        nombre: formato.nombre,
        precio: formato.precio,
      },
      idioma: {
        id: idioma.id,
        nombre: idioma.nombre,
      },
    };

    try {
      await this.apiService.createFuncionAdmin(dto);
      alert('Función creada correctamente.');
      this.router.navigate(['/funcion/lista']);
    } catch (err) {
      console.error(err);
      alert('Error al crear la función.');
    }
  }

  volver() {
    this.router.navigate(['/funcion/lista']);
  }
}

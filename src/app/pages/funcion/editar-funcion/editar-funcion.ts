import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-editar-funcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header],
  templateUrl: './editar-funcion.html',
  styleUrls: ['./editar-funcion.css'],
})
export class EditarFuncion implements OnInit {
  form!: FormGroup;

  peliculas: any[] = [];
  formatos: any[] = [];
  salas: any[] = [];
  idiomas: any[] = [];

  dataFuncion: any;

  constructor(
    private router: Router,
    private apiService: ApiServiceFunciones,
    private apiService2: ApiServicePelicula,
    private fb: FormBuilder,
  ) {}

  async ngOnInit() {
    this.dataFuncion = history.state.funcion;

    if (!this.dataFuncion) {
      alert('No se recibió la función.');
      this.router.navigate(['/funcion/lista']);
      return;
    }

    this.inicializarFormulario();
    await this.cargarListas(); // <-- Agregar await aquí
    this.cargarFuncionEnFormulario();
  }

  inicializarFormulario() {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      pelicula: ['', Validators.required],
      formato: ['', Validators.required],
      idioma: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      sala: ['', Validators.required],
      disponible: ['', Validators.required],
    });
  }

  async cargarListas() {
    this.peliculas = await this.apiService2.getPeliculasParaSelec();
    this.formatos = await this.apiService.findAllAdmin();
    this.idiomas = await this.apiService.getAllIdiomas();
    this.salas = await this.apiService.getSalasForSelec();
  }

  cargarFuncionEnFormulario() {
    const f = this.dataFuncion;
    const peliculaSeleccionada = this.peliculas.find((p) => p.id === f.peliculaId);

    this.form.patchValue({
      id: f.id,
      pelicula: peliculaSeleccionada,
      formato: f.formato,
      idioma: f.idioma,
      sala: f.sala,
      fecha: f.fecha,
      hora: f.hora,
      disponible: f.estaDisponible,
    });
  }

  compareById(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  }

  compareBoolean(val1: any, val2: any): boolean {
    return val1 === val2;
  }

  editar() {
    if (this.form.invalid) {
      alert('Complete los campos correctamente.');
      return;
    }

    const f = this.form.value; // <- Valores del formulario
    const original = this.dataFuncion;

    const cambios: any = {};

    // Película
    if (f['pelicula']?.id !== original.peliculaId) {
      cambios.peliculaId = f['pelicula'].id;
    }

    // Formato
    if (f['formato']?.id !== original.formato?.id) {
      cambios.formato = {
        id: f['formato'].id,
        nombre: f['formato'].nombre,
        precio: f['formato'].precio,
      };
    }

    // Idioma
    if (f['idioma']?.id !== original.idioma?.id) {
      cambios.idioma = {
        id: f['idioma'].id,
        nombre: f['idioma'].nombre,
      };
    }

    // Sala
    if (f['sala']?.id !== original.sala?.id) {
      cambios.sala = {
        id: f['sala'].id,
        nroSala: f['sala'].nroSala,
      };
    }

    // Fecha y hora
    if (f['fecha'] !== original.fecha || f['hora'] !== original.hora) {
      cambios.fecha = f['fecha'];
      cambios.hora = f['hora'];
    }

    // Disponible
    const disponible = f['disponible'] === true || f['disponible'] === 'true';
    if (disponible !== original.estaDisponible) {
      cambios.estaDisponible = disponible;
    }

    // Si no hay cambios
    if (Object.keys(cambios).length === 0) {
      alert('No se realizaron cambios.');
      return;
    }

    // ID de la función
    cambios.id = original.id;

    this.apiService
      .updateFuncionAdmin(cambios)
      .then(() => {
        alert('Función actualizada correctamente.');
        this.router.navigate(['/funcion/lista']);
      })
      .catch((error) => {
        console.error('Error al actualizar función:', error);
        alert('Error al actualizar la función.');
      });
  }

  volver() {
    this.router.navigate(['/funcion/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

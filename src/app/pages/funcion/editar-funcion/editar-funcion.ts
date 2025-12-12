import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { ApiServicePelicula } from '../../../services/api.service.pelicula';

@Component({
  selector: 'app-editar-funcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dataFuncion = history.state.funcion;

    if (!this.dataFuncion) {
      alert('No se recibió la función.');
      this.router.navigate(['/funcion/lista']);
      return;
    }

    this.inicializarFormulario();
    this.cargarListas();
    this.cargarFuncionEnFormulario();
  }

  inicializarFormulario() {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      peliculaId: ['', Validators.required],
      formato: ['', Validators.required],
      idioma: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      sala: ['', Validators.required],
      estaDisponible: ['', Validators.required],
    });
  }

  async cargarListas() {
    this.peliculas = await this.apiService2.getPeliculasForAdmin();
    this.formatos = await this.apiService.findAll();
    this.idiomas = await this.apiService2.getAllIdiomas();
    this.salas = await this.apiService.getSalas();
  }

  cargarFuncionEnFormulario() {
    const f = this.dataFuncion;

    const fechaObj = new Date(f.fecha);

    this.form.patchValue({
      id: f.id,
      peliculaId: f.peliculaId,
      formato: f.formato,
      idioma: f.idioma,
      sala: f.sala,
      fecha: fechaObj.toISOString().substring(0, 10), // yyyy-mm-dd
      hora: fechaObj.toTimeString().substring(0, 5), // HH:mm
      estaDisponible: f.estaDisponible,
    });
  }

  editar() {
    if (this.form.invalid) {
      alert('Complete los campos correctamente.');
      return;
    }

    const cambios: any = {};

    const f = this.form.value;

    // Valores originales recibidos en this.dataFuncion
    const original = this.dataFuncion;
    if (f.peliculaId !== original.peliculaId) {
      cambios.peliculaId = f.peliculaId;
    }
    if (f.formato?.id !== original.formato?.id) {
      cambios.formato = {
        id: f.formato.id,
        nombre: f.formato.nombre,
        precio: f.formato.precio,
      };
    }
    if (f.idioma?.id !== original.idioma?.id) {
      cambios.idioma = {
        id: f.idioma.id,
        nombre: f.idioma.nombre,
      };
    }
    if (f.sala?.id !== original.sala?.id) {
      cambios.sala = {
        id: f.sala.id,
        nroSala: f.sala.nroSala,
      };
    }
    if (f.fecha !== original.fecha || f.hora !== original.hora) {
      cambios.fecha = new Date(`${f.fecha}T${f.hora}:00`);
    }
    const disponible = f.estaDisponible === true || f.estaDisponible === 'true';
    if (disponible !== original.estaDisponible) {
      cambios.estaDisponible = disponible;
    }

    // Si no hay cambios, no llamar al backend
    if (Object.keys(cambios).length === 0) {
      alert('No se realizaron cambios.');
      return;
    }

    // Agregamos el id de la función
    cambios.id = original.id;

    this.apiService
      .updateFuncion(cambios)
      .then(() => {
        alert('Función actualizada correctamente.');
        this.router.navigate(['/funcion/lista']);
      })
      .catch(() => {
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

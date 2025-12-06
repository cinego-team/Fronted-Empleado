import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceFunciones,
    private apiService2: ApiServicePelicula,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.inicializarFormulario();
    this.cargarListas();
    this.cargarFuncion(id);
  }

  inicializarFormulario() {
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }],
      peliculaId: ['', Validators.required],
      formato: [null, Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      sala: ['', Validators.required],
      disponible: ['', Validators.required],
    });
  }

  async cargarListas() {
    this.peliculas = await this.apiService2.getPeliculas();
    this.formatos = await this.apiService.findAll();
    this.salas = await this.apiService.getAllSalas();
  }

  async cargarFuncion(id: number) {
    try {
      const f = await this.apiService.getFuncionById(id);

      this.form.patchValue({
        id: f.id,
        peliculaId: f.peliculaId,
        formato: {
          nombre: f.formato.nombre,
          precio: f.formato.precio,
        },
        fecha: new Date(f.fecha).toISOString().substring(0, 10),
        hora: f.hora,
        sala: f.NumeroSala,
        disponible: f.disponible,
      });
    } catch (e) {
      alert('Error al cargar la función');
    }
  }

  editar() {
    if (this.form.invalid) {
      alert('Complete los campos correctamente.');
      return;
    }

    const dtoFuncion = {
      pelicula: this.form.value.pelicula,
      fecha: this.form.value.fecha,
      hora: this.form.value.hora,
      disponible: this.form.value.disponible === 'true' || this.form.value.disponible === true,
      sala: { numeroSala: Number(this.form.value.sala) },
      formato: {
        nombre: this.form.value.formato.nombre,
        precio: this.form.value.formato.precio,
      },
    };

    this.apiService
      .updateFuncion(dtoFuncion)
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

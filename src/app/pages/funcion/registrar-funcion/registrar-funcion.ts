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
  idiomas: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiServiceFunciones,
    private apiService2: ApiServicePelicula
  ) {
    this.form = this.fb.group({
      pelicula: ['', Validators.required], // objeto película
      formato: ['', Validators.required], // objeto formato
      fecha: ['', Validators.required], // yyyy-mm-dd
      hora: ['', Validators.required], // hh:mm
      sala: ['', Validators.required], // objeto sala
      disponible: [true, Validators.required],
      idioma: ['', Validators.required], // objeto idioma
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    try {
      this.peliculas = await this.apiService2.getPeliculasForAdmin();
      this.formatos = await this.apiService.findAll();
      this.salas = await this.apiService.getSalas();
      this.idiomas = await this.apiService2.getAllIdiomas();
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

    const { pelicula, formato, fecha, hora, sala, disponible, idioma } = this.form.value;

    const fechaHora = `${fecha}T${hora}:00`;

    const dto = {
      peliculaId: pelicula.id,
      fecha: fechaHora,
      estaDisponible: disponible,

      sala: {
        id: sala.id,
        nroSala: sala.numero,
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

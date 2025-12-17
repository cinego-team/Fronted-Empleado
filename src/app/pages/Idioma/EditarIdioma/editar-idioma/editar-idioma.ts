import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Header } from '../../../../shared/header/header';
import { ApiServiceFunciones } from '../../../../services/api.service.funciones';

@Component({
  selector: 'app-editar-idioma',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './editar-idioma.html',
  styleUrls: ['./editar-idioma.css'],
})
export class EditarIdiomaComponent implements OnInit {
  idioma: any;
  originalIdioma: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceFunciones
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.idioma ??
      (history.state as any)?.idioma;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró la clasificación. Volvé al listado.');
      this.router.navigate(['/clasificacion/lista']);
      return;
    }

    // Setear datos
    this.idioma = { ...navState };
    this.originalIdioma = { ...navState };
  }

  onSave() {
    const modifiedKeys = Object.keys(this.idioma).filter(
      (key) => key !== 'id' && this.idioma[key] !== this.originalIdioma[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.idioma).length - 1) {
      this.apiService
        .updateIdioma(this.idioma)
        .then(() => {
          alert('Idioma actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el idioma:', error);
          alert('Error al actualizar el idioma.');
        });
    }

    this.router.navigate(['/idioma/lista']);
  }

  volver() {
    this.router.navigate(['/idioma/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

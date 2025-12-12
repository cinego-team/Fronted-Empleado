import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiServicePelicula } from '../../../../services/api.service.pelicula';

@Component({
  selector: 'app-editar-genero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-genero.html',
  styleUrls: ['./editar-genero.css'],
})
export class EditarGeneroComponent implements OnInit {
  genero: any;
  originalGenero: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServicePelicula
  ) {}
  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.genero ??
      (history.state as any)?.genero;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró el genero. Volvé al listado.');
      this.router.navigate(['/genero/lista']);
      return;
    }

    // Setear datos
    this.genero = { ...navState };
    this.originalGenero = { ...navState };
  }

  onSave() {
    const modifiedKeys = Object.keys(this.genero).filter(
      (key) => key !== 'id' && this.genero[key] !== this.originalGenero[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.genero).length - 1) {
      this.apiService
        .updateGenero(this.genero)
        .then(() => {
          alert('Genero actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el genero:', error);
          alert('Error al actualizar el genero.');
        });
    }

    this.router.navigate(['/genero/lista']);
  }

  volver() {
    this.router.navigate(['/genero/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

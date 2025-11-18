import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-editar-idioma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-idioma.html',
  styleUrls: ['./editar-idioma.css'],
})
export class EditarIdiomaComponent implements OnInit {
  idioma: any;
  originalIdioma: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const idiomaId = this.route.snapshot.paramMap.get('id');
    this.initialization(idiomaId);
  }

  async initialization(idiomaId: string | null): Promise<void> {
    if (!idiomaId) {
      alert('No se proporcionó un ID de idioma válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getIdiomaById(+idiomaId);
      console.log('Idioma obtenido:', fetched);
      this.idioma = { ...fetched };
      this.originalIdioma = { ...fetched };
    } catch (error) {
      alert('Error al obtener el idioma:');
    }
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
}

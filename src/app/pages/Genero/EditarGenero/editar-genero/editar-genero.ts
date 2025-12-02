import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

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
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const generoId = this.route.snapshot.paramMap.get('id');
    this.initialization(generoId);
  }

  async initialization(generoId: string | null): Promise<void> {
    if (!generoId) {
      alert('No se proporcionó un ID de genero válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getGeneroById(+generoId);
      console.log('Genero obtenido:', fetched);
      this.genero = { ...fetched };
      this.originalGenero = { ...fetched };
    } catch (error) {
      alert('Error al obtener el genero:');
    }
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

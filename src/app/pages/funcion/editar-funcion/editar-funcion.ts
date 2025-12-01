import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-editar-funcion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-funcion.html',
  styleUrls: ['./editar-funcion.css'],
})
export class EditarFuncionComponent implements OnInit {
  funcion: any;
  originalfuncion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const funcionId = this.route.snapshot.paramMap.get('id');
    this.initialization(funcionId);
  }

  async initialization(funcionId: string | null): Promise<void> {
    if (!funcionId) {
      alert('No se proporcionó un ID de funcion válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getFuncionById(+funcionId);
      console.log('funcion obtenido:', fetched);
      this.funcion = { ...fetched };
      this.originalfuncion = { ...fetched };
    } catch (error) {
      alert('Error al obtener el funcion:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.funcion).filter(
      (key) => key !== 'id' && this.funcion[key] !== this.originalfuncion[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.funcion).length - 1) {
      this.apiService
        .updateFuncion(this.funcion)
        .then(() => {
          alert('funcion actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el funcion:', error);
          alert('Error al actualizar el funcion.');
        });
    }

    this.router.navigate(['/funcion/lista']);
  }
   volver() {
    this.router.navigate(['/funciones']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}

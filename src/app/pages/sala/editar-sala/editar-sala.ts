import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-editar-sala',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './editar-sala.html',
  styleUrls: ['./editar-sala.css'],
})
export class EditarsalaComponent implements OnInit {
  sala: any;
  originalsala: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceFunciones,
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);

    if (!id) {
      alert('ID de sala inválido');
      this.router.navigate(['/sala/lista']);
      return;
    }

    try {
      const salaBackend = await this.apiService.getSalaById(id);

      this.sala = { ...salaBackend };
      this.originalsala = { ...salaBackend };
    } catch (error) {
      console.error('Error al cargar la sala:', error);
      alert('No se pudo cargar la sala');
      this.router.navigate(['/sala/lista']);
    }
  }

  onSave() {
    this.apiService
      .updateSala(this.sala)
      .then(() => {
        alert('Sala actualizada correctamente.');
        this.router.navigate(['/sala/lista']);
      })
      .catch((error) => {
        console.error('Error al actualizar la sala:', error);
        alert('Error al actualizar la sala.');
      });
  }

  volver() {
    this.router.navigate(['/sala/lista']);
  }
}

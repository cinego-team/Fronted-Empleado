import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-editar-formato',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-formato.html',
  styleUrl: './editar-formato.css',
})
export class EditarFormatoComponent implements OnInit {
  formato: any;
  originalFormato: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const formatoId = this.route.snapshot.paramMap.get('id');
    this.initialization(formatoId);
  }

  async initialization(formatoId: string | null): Promise<void> {
    if (!formatoId) {
      alert('No se proporcionó un ID de formato válido.');
      return;
    }
    try {
      const fetched = await this.apiService.findOne(+formatoId);
      console.log('Formato obtenido:', fetched);
      this.formato = { ...fetched };
      this.originalFormato = { ...fetched };
    } catch (error) {
      alert('Error al obtener el formato:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.formato).filter(
      (key) => key !== 'id' && this.formato[key] !== this.originalFormato[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.formato).length - 1) {
      this.apiService
        .update(this.formato)
        .then(() => {
          alert('Formato actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el formato:', error);
          alert('Error al actualizar el formato.');
        });
    }

    this.router.navigate(['/formato/lista']);
  }
  volver() {
    this.router.navigate(['/formato/lista']);
  }
}

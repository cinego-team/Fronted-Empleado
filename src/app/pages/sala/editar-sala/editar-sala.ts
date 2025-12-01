import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-editar-sala',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-sala.html',
  styleUrls: ['./editar-sala.css'],
})
export class EditarsalaComponent implements OnInit {
  sala: any;
  originalsala: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const salaId = this.route.snapshot.paramMap.get('id');
    this.initialization(salaId);
  }

  async initialization(salaId: string | null): Promise<void> {
    if (!salaId) {
      alert('No se proporcionó un ID de sala válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getSalaById(+salaId);
      console.log('sala obtenido:', fetched);
      this.sala = { ...fetched };
      this.originalsala = { ...fetched };
    } catch (error) {
      alert('Error al obtener el sala:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.sala).filter(
      (key) => key !== 'id' && this.sala[key] !== this.originalsala[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.sala).length - 1) {
      this.apiService
        .updateSala(this.sala)
        .then(() => {
          alert('sala actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el sala:', error);
          alert('Error al actualizar el sala.');
        });
    }

    this.router.navigate(['/sala/lista']);
  }
  volver() {
    this.router.navigate(['/sala/lista']);
  }
}

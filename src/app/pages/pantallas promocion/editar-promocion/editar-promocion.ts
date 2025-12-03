import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editar-promocion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-promocion.html',
  styleUrl: './editar-promocion.css',
})
export class EditarPromocion {
  promocion: any;
  originalPromocion: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const promocionId = this.route.snapshot.paramMap.get('id');
    this.initialization(promocionId);
  }

  async initialization(promocionId: string | null): Promise<void> {
    if (!promocionId) {
      alert('No se proporcionó un ID de promocion válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getPromocionById(+promocionId);
      console.log('Promocion obtenida:', fetched);
      this.promocion = { ...fetched };
      this.originalPromocion = { ...fetched };
    } catch (error) {
      alert('Error al obtener la promocion:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.promocion).filter(
      (key) => key !== 'id' && this.promocion[key] !== this.originalPromocion[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.promocion).length - 1) {
      this.apiService
        .updatePromocion(this.promocion)
        .then(() => {
          alert('Promocion actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar la promocion:', error);
          alert('Error al actualizar la promocion.');
        });
    }

    this.router.navigate(['/promocione/lista']);
  }
  volver() {
    this.router.navigate(['/promocione/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}

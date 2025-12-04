import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiServiceUsuario } from '../../../../services/api.service.usuario';

@Component({
  selector: 'app-editar-rol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-rol.html',
  styleUrls: ['./editar-rol.css'],
})
export class EditarRolComponent implements OnInit {
  rol: any;
  originalrol: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceUsuario
  ) {}

  ngOnInit() {
    const rolId = this.route.snapshot.paramMap.get('id');
    this.initialization(rolId);
  }

  async initialization(rolId: string | null): Promise<void> {
    if (!rolId) {
      alert('No se proporcionó un ID de rol válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getRolesById(+rolId);
      console.log('rol obtenido:', fetched);
      this.rol = { ...fetched };
      this.originalrol = { ...fetched };
    } catch (error) {
      alert('Error al obtener el rol:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.rol).filter(
      (key) => key !== 'id' && this.rol[key] !== this.originalrol[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.rol).length - 1) {
      this.apiService
        .updateRol(this.rol)
        .then(() => {
          alert('rol actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el rol:', error);
          alert('Error al actualizar el rol.');
        });
    }

    this.router.navigate(['/rol/lista']);
  }
  volver() {
    this.router.navigate(['/rol/lista']);
  }
}

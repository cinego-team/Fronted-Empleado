import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-tipo-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-tipo-cliente.html',
  styleUrl: './editar-tipo-cliente.css',
})
export class EditarTipoCliente implements OnInit {
  tipoCliente: any;
  originalTipoCliente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const tipoClienteId = this.route.snapshot.paramMap.get('id');
    this.initialization(tipoClienteId);
  }

  async initialization(tipoClienteId: string | null): Promise<void> {
    if (!tipoClienteId) {
      alert('No se proporcionó un ID de tipo de cliente válido.');
      return;
    }
    try {
      const fetched = await this.apiService.getTipoClienteById(+tipoClienteId);
      console.log('Tipo de cliente obtenido:', fetched);
      this.tipoCliente = { ...fetched };
      this.originalTipoCliente = { ...fetched };
    } catch (error) {
      alert('Error al obtener el tipo de cliente:');
    }
  }
  onSave() {
    const modifiedKeys = Object.keys(this.tipoCliente).filter(
      (key) => key !== 'id' && this.tipoCliente[key] !== this.originalTipoCliente[key]
    );
    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.tipoCliente).length - 1) {
      this.apiService
        .updateTipoCliente(this.tipoCliente)
        .then(() => {
          alert('Tipo de cliente actualizado correctamente.');
        })
        .catch((error) => {
          console.error('Error al actualizar el tipo de cliente:', error);
          alert('Error al actualizar el tipo de cliente.');
        });
    }

    this.router.navigate(['/tipo-cliente/lista']);
  }
  volver() {
    this.router.navigate(['/tipo-cliente/lista']);
  }
  inicio() {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceUsuario } from '../../../services/api.service.usuario';
import { Header } from '../../../shared/header/header';

@Component({
  selector: 'app-editar-tipo-cliente',
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './editar-tipo-cliente.html',
  styleUrl: './editar-tipo-cliente.css',
})
export class EditarTipoCliente implements OnInit {
  tipoCliente: any;
  originalTipoCliente: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceUsuario,
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.tipoCliente ??
      (history.state as any)?.tipoCliente;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró el tipo de cliente. Volvé al listado.');
      this.router.navigate(['/tipo-cliente/lista']);
      return;
    }

    // Setear datos
    this.tipoCliente = { ...navState };
    this.originalTipoCliente = { ...navState };
  }

  onSave() {
    // Detecta cambios respecto al objeto original
    const modifiedKeys = Object.keys(this.tipoCliente).filter(
      (key) => key !== 'id' && this.tipoCliente[key] !== this.originalTipoCliente[key],
    );

    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
      return;
    }

    this.apiService
      .updateTipoCliente(this.tipoCliente)
      .then(() => {
        alert('Tipo de cliente actualizado correctamente.');
        // Navega y pasa el estado para que la lista pueda recargarse
        this.router.navigate(['/tipo-cliente/lista'], { state: { reload: true } });
      })
      .catch((error) => {
        console.error('Error al actualizar el tipo de cliente:', error);
        alert('Error al actualizar el tipo de cliente.');
      });
  }

  volver() {
    this.router.navigate(['/tipo-cliente/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

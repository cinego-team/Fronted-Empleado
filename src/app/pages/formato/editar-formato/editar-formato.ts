import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';

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
    private apiService: ApiServiceFunciones
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.formato ??
      (history.state as any)?.formato;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró el formato. Volvé al listado.');
      this.router.navigate(['/formato/lista']);
      return;
    }

    // Setear datos
    this.formato = { ...navState };
    this.originalFormato = { ...navState };
  }

  onSave() {
    const campos = Object.keys(this.formato).filter((k) => k !== 'id');

    // verificar si TODOS los campos cambiaron
    const cambioCompleto = campos.every((key) => this.formato[key] !== this.originalFormato[key]);

    if (!cambioCompleto) {
      alert('Debe modificar todos los campos para actualizar.');
      return;
    }

    this.apiService
      .update(this.formato)
      .then(() => {
        alert('Formato actualizado correctamente.');
        this.router.navigate(['/formato/lista']);
      })
      .catch((error) => {
        console.error('Error al actualizar el formato:', error);
        alert('Error al actualizar el formato.');
      });
  }

  volver() {
    this.router.navigate(['/formato/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

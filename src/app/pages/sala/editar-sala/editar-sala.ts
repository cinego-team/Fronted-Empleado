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
    private apiService: ApiServiceFunciones
  ) {}

  ngOnInit() {
    // Recuperar el state desde la navegación
    const navState =
      (this.router.getCurrentNavigation()?.extras.state as any)?.sala ??
      (history.state as any)?.sala;

    if (!navState) {
      // Si no hay state, no se puede editar porque no hay datos
      alert('No se encontró el sala. Volvé al listado.');
      this.router.navigate(['/sala/lista']);
      return;
    }

    // Setear datos
    this.sala = { ...navState };
    this.originalsala = { ...navState };
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

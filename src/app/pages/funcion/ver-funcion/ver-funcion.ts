import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceFunciones } from '../../../services/api.service.funciones';

@Component({
  selector: 'app-ver-funcion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-funcion.html',
  styleUrls: ['./ver-funcion.css'],
})
export class VerFuncion implements OnInit {
  funcion: {
    id: number;
    peliculaId: number;
    fecha: Date;
    hora: Date;
    disponible: string;
    NumeroSala: number;
    formato: {
      nombre: string;
      precio: number;
    };
  } | null = null;

  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceFunciones
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.apiService
      .getFuncionById(id)
      .then((data) => {
        this.funcion = data;
        this.isLoading = false;
      })
      .catch((err) => {
        this.errorMessage = 'Error al cargar la función';
        this.isLoading = false;
      });
  }
  volver() {
    this.router.navigate(['/funcion/lista']);
  }

  inicio() {
    this.router.navigate(['/home']);
  }
}

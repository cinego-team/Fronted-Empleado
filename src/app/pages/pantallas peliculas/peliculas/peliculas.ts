import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { GlobalStatusService } from '../../../services/global-status.service';

interface Pelicula {
  id: number;
  titulo: string;
  director: string;
  duracion: number;
  sinopsis: string;
  poster: string;
  estado: string;
  clasificacion: string;
  genero: string;
}

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './peliculas.html',
  styleUrls: ['./peliculas.css']
})
export class PeliculaListaComponent implements OnInit {
  peliculas: Pelicula[] = [
    {
      id: 1,
      titulo: 'Avengers: Endgame',
      director: 'Russo Brothers',
      duracion: 181,
      sinopsis: 'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_614424-MLA52735656162_122022-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Acción'
    },
    {
      id: 2,
      titulo: 'El Padrino',
      director: 'Francis Ford Coppola',
      duracion: 175,
      sinopsis: 'El patriarca envejecido de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su hijo reacio.',
      poster: 'https://i5.walmartimages.com/seo/The-Godfather-Movie-Poster-VIto-Corleone-Red-Rose-Size-24-X-36_b9951cd0-7a18-4591-b01f-aeb91c810965.5533a48d9e52b1344767b4c521ddd607.jpeg',
      estado: 'En cartelera',
      clasificacion: 'R',
      genero: 'Drama'
    },
    {
      id: 3,
      titulo: 'Inception',
      director: 'Christopher Nolan',
      duracion: 148,
      sinopsis: 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_860530-MLA81194764967_122024-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Ciencia Ficción'
    },
    {
      id: 4,
      titulo: 'Titanic',
      director: 'James Cameron',
      duracion: 194,
      sinopsis: 'Una aristócrata de diecisiete años se enamora de un artista amable pero pobre a bordo del lujoso y desafortunado R.M.S. Titanic.',
      poster: 'https://http2.mlstatic.com/D_NQ_NP_641784-MLA72402615737_102023-O.webp',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Romance'
    },
    {
      id: 5,
      titulo: 'Jurassic Park',
      director: 'Steven Spielberg',
      duracion: 127,
      sinopsis: 'Un parque temático pragmático sufre un fallo de seguridad importante y libera dinosaurios.',
      poster: 'https://m.media-amazon.com/images/I/61iF3RSsLsL._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Aventura'
    },
    {
      id: 6,
      titulo: 'Matrix',
      director: 'Wachowski',
      duracion: 136,
      sinopsis: 'Un hacker descubre la verdadera naturaleza de su realidad y su papel en la guerra contra sus controladores.',
      poster: 'https://m.media-amazon.com/images/I/51ISve-1n1S._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'R',
      genero: 'Ciencia Ficción'
    },
    {
      id: 7,
      titulo: 'Forrest Gump',
      director: 'Robert Zemeckis',
      duracion: 142,
      sinopsis: 'Las presidencias de Kennedy y Johnson, la guerra de Vietnam y otros eventos se desarrollan desde la perspectiva de un hombre de Alabama.',
      poster: 'https://postercity.com.ar/wp-content/uploads/2021/07/Forrest-Gump.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Drama'
    },
    {
      id: 8,
      titulo: 'Interestelar',
      director: 'Christopher Nolan',
      duracion: 169,
      sinopsis: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
      poster: 'https://m.media-amazon.com/images/I/61ASebTsLpL._UF894,1000_QL80_.jpg',
      estado: 'En cartelera',
      clasificacion: 'PG-13',
      genero: 'Ciencia Ficción'
    }
  ];


  constructor(private router: Router,  private readonly apiService: ApiService,
      private readonly globalStatusService: GlobalStatusService) { }

    pelicula: Array<{
            id: number;
            titulo: string;
            sinopsis: string;
            director: string;
            duracion: number;
            fechaEsterno:string;
            idioma:string;
            genero:string;
            clasificación:string;
            estado:string;
  }> =[];
  
  actualPage: number = 1;
  
  ngOnInit(): void {
 //this.initialization();
}
 async initialization(): Promise<void> {
 this.globalStatusService.setLoading(true);
 await new Promise(resolve => setTimeout(resolve, 500)); // decorativo
 const data = await this.apiService.getPeliculas(); // ✅ pedir películas
 if (data.length === 0) {
   alert('No hay películas para mostrar.');
   this.globalStatusService.setLoading(false);
   this.actualPage--;
   return;
 }
 this.pelicula = data;
 this.globalStatusService.setLoading(false);
}

   selectedRow: number | null = null;
   selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

seleccionarPelicula(rowId: number): void {
  this.selectedRow = rowId;
  console.log('Fila seleccionada:', this.selectedRow, this.peliculas[this.selectedRow]);
}
 onNew() {
    this.router.navigate(['/registrar-pelicula']);
  }
onEdit() {
  //if (this.selectedRow === null) {
    //alert('Seleccioná una película primero.');
    //return;
  
  //const selectedPelicula = this.peliculas[this.selectedRow];
  this.router.navigate(['/editar-pelicula']);
}


/*onView(): void {
  if (this.selectedRow === null) {
    alert('Seleccioná una película primero.');
    return;
  }
  const selectedPelicula = this.peliculas[this.selectedRow];
  this.router.navigate(['/pelicula', selectedPelicula.id]);
}
*/
onView() {
   this.router.navigate(['/pelicula']);
}


onDelete(): void {
  if (this.selectedRow === null) {
    alert('Seleccioná una película primero.');
    return;
  }
  const selectedPelicula = this.peliculas[this.selectedRow];
  if (confirm(`¿Estás seguro de que querés eliminar ${selectedPelicula.titulo}?`)) {
    this.apiService.deletePelicula(selectedPelicula.id).then(() => {
      this.peliculas.splice(this.selectedRow!, 1);
      this.selectedRow = null;
      alert('Película eliminada correctamente.');
    });
  }
  
}
 onBack() {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiServiceUsuario } from '../../services/api.service.usuario';

interface usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    nroTelefono: string;
    legajo: number;
    role: {
        id: number;
        permissions: {
            id: number;
            code: string;
        };

    }
}
@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.css',
    standalone: true,
})
export class Header implements OnInit {
    userData: usuario | null = null;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private apiServiceUsuario: ApiServiceUsuario,
    ) { }
    ngOnInit(): void {
        this.initialization();
    }

    async initialization(): Promise<void> {
        try {
            this.userData = await this.apiServiceUsuario.getDatosUsuario();
        } catch (error) {
            console.error(error);
            this.errorMessage = 'No se pudo cargar el usuario';
        }
    }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstadoPelicula } from './editar-estado-pelicula';

describe('EditarEstadoPelicula', () => {
  let component: EditarEstadoPelicula;
  let fixture: ComponentFixture<EditarEstadoPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEstadoPelicula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEstadoPelicula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

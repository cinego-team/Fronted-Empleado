import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPelicula } from './registrar-pelicula';

describe('RegistrarPelicula', () => {
  let component: RegistrarPelicula;
  let fixture: ComponentFixture<RegistrarPelicula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPelicula]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPelicula);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

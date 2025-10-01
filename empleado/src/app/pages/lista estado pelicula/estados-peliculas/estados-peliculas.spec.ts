import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosPeliculas } from './estados-peliculas';

describe('EstadosPeliculas', () => {
  let component: EstadosPeliculas;
  let fixture: ComponentFixture<EstadosPeliculas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosPeliculas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosPeliculas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

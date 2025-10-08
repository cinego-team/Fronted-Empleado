import { ComponentFixture, TestBed } from '@angular/core/testing';

// Update the import path to the correct location of RegistrarIdioma
import { RegistrarIdioma } from './registrar-idioma';

describe('RegistarIdioma', () => {
  let component: RegistrarIdioma;
  let fixture: ComponentFixture<RegistrarIdioma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarIdioma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarIdioma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIdioma } from './editar-idioma';

describe('EditarIdioma', () => {
  let component: EditarIdioma;
  let fixture: ComponentFixture<EditarIdioma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarIdioma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIdioma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

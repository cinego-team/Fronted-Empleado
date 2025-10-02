import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarClasificacion } from './editar-clasificacion';

describe('EditarClasificacion', () => {
  let component: EditarClasificacion;
  let fixture: ComponentFixture<EditarClasificacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarClasificacion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarClasificacion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

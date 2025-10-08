import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFila } from './editar-fila';

describe('EditarFila', () => {
  let component: EditarFila;
  let fixture: ComponentFixture<EditarFila>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFila]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFila);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

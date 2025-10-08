import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGenero } from './editar-genero';

describe('EditarGenero', () => {
  let component: EditarGenero;
  let fixture: ComponentFixture<EditarGenero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarGenero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGenero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

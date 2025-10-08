import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFormato } from './editar-formato';

describe('EditarFormato', () => {
  let component: EditarFormato;
  let fixture: ComponentFixture<EditarFormato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarFormato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFormato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

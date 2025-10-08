import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoDni } from './editar-tipo-dni';

describe('EditarTipoDni', () => {
  let component: EditarTipoDni;
  let fixture: ComponentFixture<EditarTipoDni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTipoDni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoDni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

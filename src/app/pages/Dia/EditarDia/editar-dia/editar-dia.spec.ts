import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDia } from './editar-dia';

describe('EditarDia', () => {
  let component: EditarDia;
  let fixture: ComponentFixture<EditarDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

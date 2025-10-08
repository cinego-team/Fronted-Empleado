import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSala } from './editar-sala';

describe('EditarSala', () => {
  let component: EditarSala;
  let fixture: ComponentFixture<EditarSala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarSala]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarSala);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

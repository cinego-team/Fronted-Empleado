import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermiso } from './editar-permiso';

describe('EditarPermiso', () => {
  let component: EditarPermiso;
  let fixture: ComponentFixture<EditarPermiso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPermiso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPermiso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

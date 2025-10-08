import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPermiso } from './registrar-permiso';

describe('RegistrarPermiso', () => {
  let component: RegistrarPermiso;
  let fixture: ComponentFixture<RegistrarPermiso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarPermiso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPermiso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

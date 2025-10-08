import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarGenero } from './registrar-genero';

describe('RegistrarGenero', () => {
  let component: RegistrarGenero;
  let fixture: ComponentFixture<RegistrarGenero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarGenero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarGenero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

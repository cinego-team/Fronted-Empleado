import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFormato } from './registrar-formato';

describe('RegistrarFormato', () => {
  let component: RegistrarFormato;
  let fixture: ComponentFixture<RegistrarFormato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarFormato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarFormato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

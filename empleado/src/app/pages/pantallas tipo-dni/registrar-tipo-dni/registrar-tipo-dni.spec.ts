import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTipoDni } from './registrar-tipo-dni';

describe('RegistrarTipoDni', () => {
  let component: RegistrarTipoDni;
  let fixture: ComponentFixture<RegistrarTipoDni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarTipoDni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTipoDni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

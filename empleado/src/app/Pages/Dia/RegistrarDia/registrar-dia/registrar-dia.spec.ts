import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDia } from './registrar-dia';

describe('RegistrarDia', () => {
  let component: RegistrarDia;
  let fixture: ComponentFixture<RegistrarDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarButaca } from './registrar-butaca';

describe('RegistrarButaca', () => {
  let component: RegistrarButaca;
  let fixture: ComponentFixture<RegistrarButaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarButaca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarButaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

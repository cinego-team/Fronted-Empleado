import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarButaca } from './editar-butaca';

describe('EditarButaca', () => {
  let component: EditarButaca;
  let fixture: ComponentFixture<EditarButaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarButaca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarButaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

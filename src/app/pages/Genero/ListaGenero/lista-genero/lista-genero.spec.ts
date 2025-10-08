import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGenero } from './lista-genero';

describe('ListaGenero', () => {
  let component: ListaGenero;
  let fixture: ComponentFixture<ListaGenero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaGenero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaGenero);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

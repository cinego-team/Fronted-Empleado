import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIdioma } from './lista-idioma';

describe('ListaIdioma', () => {
  let component: ListaIdioma;
  let fixture: ComponentFixture<ListaIdioma>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaIdioma]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaIdioma);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFormato } from './lista-formato';

describe('ListaFormato', () => {
  let component: ListaFormato;
  let fixture: ComponentFixture<ListaFormato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFormato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFormato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

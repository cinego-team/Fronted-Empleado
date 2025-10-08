import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPermiso } from './lista-permiso';

describe('ListaPermiso', () => {
  let component: ListaPermiso;
  let fixture: ComponentFixture<ListaPermiso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPermiso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPermiso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

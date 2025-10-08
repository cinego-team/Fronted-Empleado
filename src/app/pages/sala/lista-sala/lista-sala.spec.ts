import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSala } from './lista-sala';

describe('ListaSala', () => {
  let component: ListaSala;
  let fixture: ComponentFixture<ListaSala>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSala]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSala);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

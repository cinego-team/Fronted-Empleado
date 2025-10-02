import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDia } from './lista-dia';

describe('ListaDia', () => {
  let component: ListaDia;
  let fixture: ComponentFixture<ListaDia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

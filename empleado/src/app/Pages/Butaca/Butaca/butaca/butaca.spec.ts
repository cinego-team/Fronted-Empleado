import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Butaca } from './butaca';

describe('Butaca', () => {
  let component: Butaca;
  let fixture: ComponentFixture<Butaca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Butaca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Butaca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

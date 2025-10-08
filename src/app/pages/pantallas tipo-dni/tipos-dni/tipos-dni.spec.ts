import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDni } from './tipos-dni';

describe('TiposDni', () => {
  let component: TiposDni;
  let fixture: ComponentFixture<TiposDni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposDni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposDni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

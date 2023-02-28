import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrterComponent } from './registrter.component';

describe('RegistrterComponent', () => {
  let component: RegistrterComponent;
  let fixture: ComponentFixture<RegistrterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

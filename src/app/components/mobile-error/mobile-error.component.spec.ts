import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileErrorComponent } from './mobile-error.component';

describe('MobileErrorComponent', () => {
  let component: MobileErrorComponent;
  let fixture: ComponentFixture<MobileErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragePopupComponent } from './average-popup.component';

describe('AveragePopupComponent', () => {
  let component: AveragePopupComponent;
  let fixture: ComponentFixture<AveragePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AveragePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AveragePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

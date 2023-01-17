import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardcoreLabsPopupComponent } from './hardcore-labs-popup.component';

describe('HardcoreLabsPopupComponent', () => {
  let component: HardcoreLabsPopupComponent;
  let fixture: ComponentFixture<HardcoreLabsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardcoreLabsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardcoreLabsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

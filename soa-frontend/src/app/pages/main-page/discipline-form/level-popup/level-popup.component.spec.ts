import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelPopupComponent } from './level-popup.component';

describe('LevelPopupComponent', () => {
  let component: LevelPopupComponent;
  let fixture: ComponentFixture<LevelPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

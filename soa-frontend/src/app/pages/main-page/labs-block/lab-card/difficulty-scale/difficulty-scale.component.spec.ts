import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyScaleComponent } from './difficulty-scale.component';

describe('DifficultyScaleComponent', () => {
  let component: DifficultyScaleComponent;
  let fixture: ComponentFixture<DifficultyScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyScaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

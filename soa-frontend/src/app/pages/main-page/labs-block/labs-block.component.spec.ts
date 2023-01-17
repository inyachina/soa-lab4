import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsBlockComponent } from './labs-block.component';

describe('LabsBlockComponent', () => {
  let component: LabsBlockComponent;
  let fixture: ComponentFixture<LabsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

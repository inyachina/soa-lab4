import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRuleComponent } from './filter-rule.component';

describe('FilterRuleComponent', () => {
  let component: FilterRuleComponent;
  let fixture: ComponentFixture<FilterRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

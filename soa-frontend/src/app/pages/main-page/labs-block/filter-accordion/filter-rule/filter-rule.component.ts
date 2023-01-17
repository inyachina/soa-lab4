import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {FilterFormGroup, FilterProperty, PropertyFormGroup} from "../../../../../types/LabType";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-filter-rule',
  templateUrl: './filter-rule.component.html',
  styleUrls: ['./filter-rule.component.scss']
})
export class FilterRuleComponent implements OnInit {
  @Output("changeSort")
  public changeSortEvent = new EventEmitter<FilterProperty>();
  @Input("propertyFormGroup")
  public propertyFormGroup!: PropertyFormGroup

  public filterFormGroup!: FilterFormGroup;
  public sortControl!: FormControl;
  public name!: string;
  public type!: string;

  constructor(private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.filterFormGroup = this.propertyFormGroup.controls.filter;
    this.sortControl = this.propertyFormGroup.controls.sort;
    this.name = this.propertyFormGroup.controls.name.getRawValue();
    this.type = this.propertyFormGroup.controls.type.getRawValue();
  }

  isDirtyForm = () => this.sortControl.dirty || this.filterFormGroup.controls.rule.dirty || this.filterFormGroup.controls.value.dirty

  isNumber = () => this.type == "number"

  isEnum = () => this.type == "enum"

  clearForm() {
    this.sortControl.setValue(null)
    this.filterFormGroup.controls.rule.setValue(null)
    this.filterFormGroup.controls.value.setValue(null)
    this.sortControl.markAsPristine()
    this.filterFormGroup.controls.rule.markAsPristine()
    this.filterFormGroup.controls.value.markAsPristine()
  }

  private checkedDifficulties = new Set<string>();
  checkDifficulty($event: MatCheckboxChange) {
    if ($event.checked) this.checkedDifficulties.add($event.source.value)
    else this.checkedDifficulties.delete($event.source.value)
    this.filterFormGroup.controls.value.setValue(this.checkedDifficulties)
  }
}

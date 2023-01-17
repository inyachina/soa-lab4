import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder} from "@angular/forms";
import {PropertyFormGroup} from "../../../../types/LabType";

@Component({
  selector: 'app-filter-accordion',
  templateUrl: './filter-accordion.component.html',
  styleUrls: ['./filter-accordion.component.scss']
})
export class FilterAccordionComponent implements OnInit {
  @Output("onSearch") public onSearchEvent = new EventEmitter();
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  public filterForm = this._fb.group(
    {
      // name: this._getPropertyFB("Name", "name", "string", "asc", "!=", "name"),
      // x: this._getPropertyFB("Coordinate X","x", "number", null, "=lt=", "2"),
      name: this._getPropertyFB("Name", "name", "string"),
      x: this._getPropertyFB("Coordinate X", "x", "number"),
      y: this._getPropertyFB("Coordinate Y", "y", "number"),
      difficulty: this._getPropertyFB("Difficulty", "difficulty", "enum"),
      minimalPoint: this._getPropertyFB("Minimal Point", "minimalPoint", "number"),
      creationDate: this._getPropertyFB("Creation Date", "creationDate", "string"),
      personalQualitiesMaximum: this._getPropertyFB("Personal Qualities Maximum", "personalQualitiesMaximum", "number"),
    });

  public disciplineFormGroup = this._fb.group(
    {
      name: this._getPropertyFB("Name", "discipline.name", "string"),
      lectureHours: this._getPropertyFB("Lecture Hours", "discipline.lectureHours", "number"),
      selfStudyHours: this._getPropertyFB("Self Study Hours", "discipline.selfStudyHours", "number"),
    })

  private _getPropertyFB(name: string, property: string, type: string, sort?: string | null, filterRule?: string | null, filterValue?: string | null) {
    return this._fb.group(
      {
        type: [type],
        name: [name],
        property: [property],
        sort: [sort],
        filter: this._fb.group(
          {
            rule: [filterRule],
            value: [filterValue],
          }
        )
      }
    )
  }

  public propertiesFormGroup: PropertyFormGroup[] = [
    this.filterForm.controls.name,
    this.filterForm.controls.x,
    this.filterForm.controls.y,
    this.filterForm.controls.creationDate,
    this.filterForm.controls.difficulty,
    this.filterForm.controls.minimalPoint,
    this.filterForm.controls.personalQualitiesMaximum,
  ]
  public disciplinePropertiesFormGroup: PropertyFormGroup[] = [
    this.disciplineFormGroup.controls.name,
    this.disciplineFormGroup.controls.selfStudyHours,
    this.disciplineFormGroup.controls.lectureHours,
  ]

  constructor(
    private _fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    //todo add info for filter *
    //todo после обновления страницы сохранять форму
    //todo добавить иквелс числам
    //todo заменить * на start_with
    //todo при фильтровке количество страниц равно общему количеству страниц для всех лаб
  }

  onSearch() {
    // @ts-ignore
    this.onSearchEvent.emit(
      {
        filterProperties: this.filterForm.getRawValue(),
        disciplineFilterProperties: this.disciplineFormGroup.getRawValue()
      })
  }
}

import {AfterViewInit, ChangeDetectorRef, Component, Injector, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Discipline, Lab, LabFormGroup, LabMapperDTO} from "../../../types/LabType";
import {map, Observable} from "rxjs";
import {HttpService} from "../../../services/http.service";
import {DISCIPLINE_SECOND_SERVICE_URI, DISCIPLINE_URI, LABS_URI} from "../../../../data/api";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuggestionPopupComponent} from "../../../common/suggestion-popup/suggestion-popup.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {LevelPopupComponent} from "../discipline-form/level-popup/level-popup.component";

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.html',
  styleUrls: ['./lab-form.scss']
})
export class LabForm implements AfterViewInit {
  @Input('editMode')
  public isEditMode = false;

  @Input('lab')
  public $lab!: Observable<Lab>;
  public lab?: Lab;
  public disciplines!: Discipline[];
  public filteredDisciplines!: Observable<Discipline[]>;
  public initialState?: string;

  public form: LabFormGroup = this._fb.group(
    {
      name: [null, Validators.required],
      x: [null, Validators.compose([Validators.required, Validators.max(295)])],
      y: [null, Validators.min(0)],
      creationDate: [null],
      minimalPoint: [null, Validators.compose([Validators.required, Validators.min(0)])],
      personalQualitiesMaximum: [null, Validators.compose([Validators.required, Validators.min(0)])],
      difficulty: [null, Validators.required],
      discipline: [null, Validators.required],
      // name: ["name", Validators.required],
      // x: [1, Validators.compose([Validators.required, Validators.max(295)])],
      // y: 1,
      // creationDate: [Date.now],
      // minimalPoint: [1, Validators.required],
      // personalQualitiesMaximum: [2, Validators.required],
      // difficulty: ["VERY_EASY", Validators.required],
      // discipline: ["soa", Validators.required],
    }
  );
  private _dialogRef!: any;

  constructor(
    private _fb: FormBuilder,
    private _http: HttpService,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
    private _injector: Injector,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
  }


  ngAfterViewInit(): void {
    if (!this.isEditMode) this._dialogRef = <MatDialogRef<LabForm>>this._injector.get(MatDialogRef<LabForm>)

    this.filteredDisciplines = this.form.controls.discipline.valueChanges
      .pipe(map(value => this._filter(value || '')),)
    this._http.getData<Discipline[]>(DISCIPLINE_URI).subscribe((res) => this.disciplines = res)
    this.$lab?.subscribe((lab) => this.setLabForm(lab))
  }

  private setLabForm(lab: Lab) {
    this.lab = lab
    this.form.controls.name.setValue(lab.name)
    this.form.controls.x.setValue(lab.x)
    this.form.controls.y.setValue(lab.y)
    this.form.controls.personalQualitiesMaximum.setValue(lab.personalQualitiesMaximum)
    this.form.controls.minimalPoint.setValue(lab.minimalPoint)
    this.form.controls.discipline.setValue(lab.discipline?.name)
    this.form.controls.difficulty.setValue(lab.difficulty)
    this.form.controls.creationDate.setValue(lab.creationDate)
    this.initialState = JSON.stringify(this.form.getRawValue())
    this._cdr.markForCheck()
  }

  private _filter(value: string): Discipline[] {
    const filterValue = value.toLowerCase();
    return this.disciplines.filter(option => option.name?.toLowerCase().includes(filterValue));
  }

  deleteLab() {
    this._dialog.open(SuggestionPopupComponent, {
      data: {
        text: "Are you sure that you want delete this lab?"
      }
    }).afterClosed().subscribe((res) => {
      if (!res) return;

      this._http.deleteData(LABS_URI + `/${this.lab?.id}`)
        .subscribe(() => {
            this._router.navigate([`/`], {
              queryParams: {
                tab: 'labs'
              }
            })
          }
        )
    })
  }

  editLab() {
    // @ts-ignore
    this._http.putData<Lab>(LABS_URI + `/${this.lab?.id}`, LabMapperDTO(this.form.getRawValue(), this.form.getRawValue().discipline))
      .subscribe((res) => {
        this.setLabForm(res);
        this._snackBar.open('Lab was successfully updated', 'Close', {
          duration: 3000,
        });
      })
  }

  saveLab() {
    this._dialogRef.close(this.form.getRawValue())
  }

  isDisabledSaveButton = () => !this.form.valid

  isDisabledEditButton = () => this.initialState === JSON.stringify(this.form.getRawValue())


  decreaseDifficulty() {
    this._dialog.open(LevelPopupComponent, {
      data: this.lab?.difficulty
    }).afterClosed().subscribe((step: number) => {
      if (!step) return;

      this._http.postData<Lab>(`${DISCIPLINE_SECOND_SERVICE_URI}/labwork/${this.lab?.id}/difficulty/decrease/${step}`).subscribe((lab) => {
          this.form.controls.difficulty.setValue(lab.difficulty);
          this._cdr.markForCheck();
        })
    })
  }

  isDisabledDecreaseButton = () => this.lab?.difficulty == "VERY_EASY";
}

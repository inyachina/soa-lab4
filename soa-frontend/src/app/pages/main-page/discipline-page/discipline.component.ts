import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Discipline, Lab} from "../../../types/LabType";
import {MatDialog} from "@angular/material/dialog";
import {DisciplineFormComponent} from "../discipline-form/discipline-form.component";
import {HttpService} from "../../../services/http.service";
import {DISCIPLINE_SECOND_SERVICE_URI, DISCIPLINE_URI} from "../../../../data/api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {SuggestionPopupComponent} from "../../../common/suggestion-popup/suggestion-popup.component";
import {HardcoreLabsPopupComponent} from "./hardcore-labs-popup/hardcore-labs-popup.component";

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource = new MatTableDataSource<Discipline>([]);
  public displayedColumns: string[] = ['name', 'lectureHours', 'selfStudyHours', 'action'];
  private isOpenPopup = false;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 15, 25, 50, 100];
  public disciplineAmount?: number;
  public filter?: string;
  public sort?: string;

  constructor(
    private dialog: MatDialog,
    private _http: HttpService,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef,
    private _dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getDisciplines()
    //todo remove
    // this.clickAddButton()
  }

  public getDisciplines() {
    this._http.getData<number>(DISCIPLINE_URI + "/amount").subscribe((length) => {
      this.disciplineAmount = length;
      this._http.getData<Discipline[]>(DISCIPLINE_URI, {
        page: this.pageIndex,
        size: this.pageSize
      }).subscribe((res: Discipline[]) => {
          this.dataSource.data = res;
          this._cdr.detectChanges();
        }
      )

    })
  }

  public clickAddButton() {
    this.isOpenPopup = !this.isOpenPopup;
    this.dialog.open(DisciplineFormComponent)
      .afterClosed()
      .subscribe((res) => {
        if (!res) return;

        this._http.postData<Discipline>(DISCIPLINE_URI, res).subscribe(
          (res: Discipline) => {
            this.getDisciplines()
          })
      })
  }

  public clickDeleteButton(discipline: Discipline) {
    this._dialog.open(SuggestionPopupComponent, {
      data: {
        text: "Are you sure that you want delete this discipline?"
      }
    }).afterClosed().subscribe((res) => {
      if (!res) return;

      this._http.deleteData(DISCIPLINE_URI + `/${discipline.id}`).subscribe((res) => {
        this.getDisciplines()
      })
    })
  }

  clickHardcoreLabs(discipline: Discipline) {
    this._http.getData<Lab[]>(DISCIPLINE_SECOND_SERVICE_URI + `/disciplines/${discipline.id}/get-hardcore`)
      .subscribe((res: Lab[]) => {
        this.dialog.open(HardcoreLabsPopupComponent, {
          data: res.filter(res => res.difficulty == "VERY_HARD").slice(0, 10),
        })
      })
  }

  onPageChange($event: any) {
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
    this.getDisciplines()
  }
}

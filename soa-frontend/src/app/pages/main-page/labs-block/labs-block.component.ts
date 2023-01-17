import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LabForm} from "../lab-form/lab-form";
import {HttpService} from "../../../services/http.service";
import {LABS_URI} from "../../../../data/api";
import {DifficultyType, Lab, LabMapperDTO, PropertyType} from "../../../types/LabType";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AveragePopupComponent} from "./average-popup/average-popup.component";
import {DeletePopupComponent} from "./delete-popup/delete-popup.component";

@Component({
  selector: 'app-labs-block',
  templateUrl: './labs-block.component.html',
  styleUrls: ['./labs-block.component.scss']
})
export class LabsBlockComponent implements OnInit {
  public labs: Lab[] = [];
  public pageIndex = 0;
  public pageSize = 15;
  public pageSizeOptions = [5, 10, 15, 25, 50, 100];
  public labAmount?: number;
  public filter?: string;
  public sort?: string;

  constructor(
    private dialog: MatDialog,
    private _http: HttpService,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.getLabs();
  }


  public getLabs() {
    this._http.getData<number>(LABS_URI + '/amount').subscribe((amount) => {
      if (!amount) {
        this.labs = [];
        return;
      }
      this.labAmount = amount;

      this._http.getData<Lab[]>(LABS_URI, {
        page: this.pageIndex,
        size: this.pageSize,
        sort: this.sort || null,
        filter: this.filter || null,
      }).subscribe((labs) => {
        if (!labs) return

        this.labs = labs;
        if (this.filter && (labs.length < this.pageSize)) {
          this.labAmount = labs.length;
        }
        this._cdr.markForCheck();
      })
    });
  }

  public clickAddButton() {
    this.dialog.open(LabForm).afterClosed()
      .subscribe((lab: Lab) => {
        // @ts-ignore
        this._http.postData(LABS_URI, LabMapperDTO(lab, lab.discipline))
          .subscribe((res) => {
              this._snackBar.open('Lab was successfully add', 'Close', {
                duration: 3000,
              });
              this.getLabs()
            }
          )
      });
  }

  clickAverageMinPointButton() {
    this._http.getData<number>(LABS_URI + '/average/minimal_point').subscribe((res) => {
      this.dialog.open(AveragePopupComponent, {
        data: res,
        panelClass: 'green-dialog'
      })
    })
  }

  clickDeleteByDifficultyButton() {
    this.dialog.open(DeletePopupComponent).afterClosed().subscribe((
      res: {
        flag: boolean,
        difficultyType: DifficultyType
      }
    ) => {
      if (!res.flag) return;

      this._http.deleteData<number>(LABS_URI + '/delete_by/difficulty', {difficulty: res.difficultyType})
        .subscribe((res) => {
          this._snackBar.open('Lab was successfully deleted', 'Close', {
            duration: 3000,
          });
          this.getLabs();
        })
    })

  }

  onPageChange($event: any) {
    this.pageSize = $event.pageSize
    this.pageIndex = $event.pageIndex
    this.getLabs()
  }


  private filterQuery: string[] = [];
  private sortQuery: string[] = [];

  searchLabs(query: {
    filterProperties: any,
    disciplineFilterProperties: any
  }) {
    this.filterQuery = [];
    this.sortQuery = [];
    this._parsePropsToString(query.filterProperties)
    this._parsePropsToString(query.disciplineFilterProperties)
    this.filter = this.filterQuery.join(";")
    this.sort = this.sortQuery.join(";")
    this.getLabs()
  }

  private _parsePropsToString(properties: any) {
    Object.keys(properties).forEach(key => {
      const property = properties[key] as PropertyType;
      if (property.filter?.rule !== null && property.filter?.value !== null)
        if (property.type == "enum") {
          let enumFilterQuery = [];
          for (const value of ((property.filter.value as unknown as Set<string>).values())) {
            enumFilterQuery.push(property.property + property.filter.rule + value)
          }
          this.filterQuery.push(enumFilterQuery.join(","))
        } else this.filterQuery.push(property.property + property.filter.rule + (property.type == "string" ? `"${property.filter.value}"` : property.filter.value))
      if (property.sort != null)
        this.sortQuery.push((property.property + "," + property.sort))
    });
  }
}

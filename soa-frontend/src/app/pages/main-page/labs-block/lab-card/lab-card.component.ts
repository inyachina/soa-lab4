import {Component, Input, OnInit} from '@angular/core';
import {Lab} from '../../../../types/LabType'
import {Router} from "@angular/router";

@Component({
  selector: 'app-lab-card',
  templateUrl: './lab-card.component.html',
  styleUrls: ['./lab-card.component.scss']
})
export class LabCardComponent implements OnInit {
  @Input("lab")
  public lab!: Lab;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public selectLab() {
    this.router.navigate([`/lab`, {
      id: this.lab.id
    }
    ])
  }

}

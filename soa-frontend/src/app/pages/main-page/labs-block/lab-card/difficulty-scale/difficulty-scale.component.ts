import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-difficulty-scale',
  templateUrl: './difficulty-scale.component.html',
  styleUrls: ['./difficulty-scale.component.scss']
})
export class DifficultyScaleComponent implements OnInit {
  @Input("difficulty")
  public difficulty!: string;
  public title!: string;
  public amount = 1;

  constructor() {
  }

  ngOnInit(): void {
    switch (this.difficulty) {
      case 'VERY_EASY':
        this.amount = 1;
        this.title= 'very easy';
        break;
      case 'NORMAL':
        this.amount = 2;
        this.title = 'normal'
        break;
      case 'VERY_HARD':
        this.amount = 3;
        this.title = 'very hard'
        break;
      case 'IMPOSSIBLE':
        this.amount = 4;
        this.title = 'impossible'
        break;
      case 'INSANE':
        this.amount = 5;
        this.title = 'insane';

    }

  }

}

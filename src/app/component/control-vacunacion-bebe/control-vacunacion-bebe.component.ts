import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-control-vacunacion-bebe',
  templateUrl: './control-vacunacion-bebe.component.html',
  styleUrls: ['./control-vacunacion-bebe.component.css']
})
export class ControlVacunacionBebeComponent {
  constructor(public route:ActivatedRoute){}
}

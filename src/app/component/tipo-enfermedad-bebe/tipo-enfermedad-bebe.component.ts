import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-enfermedad-bebe',
  templateUrl: './tipo-enfermedad-bebe.component.html',
  styleUrls: ['./tipo-enfermedad-bebe.component.css']
})
export class TipoEnfermedadBebeComponent {
  constructor(public route:ActivatedRoute){}
}

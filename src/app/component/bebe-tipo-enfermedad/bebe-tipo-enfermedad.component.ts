import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bebe-tipo-enfermedad',
  templateUrl: './bebe-tipo-enfermedad.component.html',
  styleUrls: ['./bebe-tipo-enfermedad.component.css']
})
export class BebeTipoEnfermedadComponent implements OnInit{
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }


}

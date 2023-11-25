import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipoenfermedad',
  templateUrl: './tipoenfermedad.component.html',
  styleUrls: ['./tipoenfermedad.component.css']
})
export class TipoenfermedadComponent implements OnInit{

constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }


}

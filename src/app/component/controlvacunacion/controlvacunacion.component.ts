import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-controlvacunacion',
  templateUrl: './controlvacunacion.component.html',
  styleUrls: ['./controlvacunacion.component.css']
})
export class ControlvacunacionComponent implements OnInit{

  constructor(public route:ActivatedRoute){}

  ngOnInit(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { BebeTipoEnfermedad } from 'src/app/model/BebeTipoEnfermedad';
import { BebeTipoEnfermedadService } from 'src/app/service/bebe-tipo-enfermedad.service';

@Component({
  selector: 'app-bebe-tipo-enfermedad-listar',
  templateUrl: './bebe-tipo-enfermedad-listar.component.html',
  styleUrls: ['./bebe-tipo-enfermedad-listar.component.css']
})
export class BebeTipoEnfermedadListarComponent implements OnInit{
   bebeTipoEnfermedades: BebeTipoEnfermedad[] = [];

  constructor(private bebeTipoEnfermedadService: BebeTipoEnfermedadService) {}

  ngOnInit(): void {
    this.loadBebeTipoEnfermedades();
  }

  loadBebeTipoEnfermedades(): void {
    this.bebeTipoEnfermedadService.getAllBebeTipoEnfermedades().subscribe(
      data => {
        this.bebeTipoEnfermedades = data;
      },
      error => {
        console.error('Error fetching bebeTipoEnfermedades', error);
      }
    );
  }


}

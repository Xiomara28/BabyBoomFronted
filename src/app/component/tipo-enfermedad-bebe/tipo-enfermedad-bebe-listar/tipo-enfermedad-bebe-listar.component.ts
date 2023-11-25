import { BebeTipoEnfermedad } from 'src/app/model/BebeTipoEnfermedad';
import { BebeTipoEnfermedadService } from 'src/app/service/bebe-tipo-enfermedad.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-enfermedad-bebe-listar',
  templateUrl: './tipo-enfermedad-bebe-listar.component.html',
  styleUrls: ['./tipo-enfermedad-bebe-listar.component.css']
})
export class TipoEnfermedadBebeListarComponent implements OnInit {
  bebeTipoEnfermedades: BebeTipoEnfermedad[] = [];
  filteredBebeTipoEnfermedades: BebeTipoEnfermedad[] = [];
  searchBebeTipoEnfermedad: string = '';

  constructor(private bebeTipoEnfermedadService: BebeTipoEnfermedadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadBebeTipoEnfermedades();
  }

  loadBebeTipoEnfermedades(): void {
    this.bebeTipoEnfermedadService.getAllBebeTipoEnfermedades().subscribe(
      (bebeTipoEnfermedades) => {
        this.bebeTipoEnfermedades = bebeTipoEnfermedades;
        this.filteredBebeTipoEnfermedades = [...bebeTipoEnfermedades];
      },
      (error) => {
        console.error('Error loading BebeTipoEnfermedades:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading BebeTipoEnfermedades',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteBebeTipoEnfermedad(bebeTipoEnfermedadId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this BebeTipoEnfermedad?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bebeTipoEnfermedadService.deleteRelacion(bebeTipoEnfermedadId).subscribe(
          () => {
            this.bebeTipoEnfermedades = this.bebeTipoEnfermedades.filter((bebeTipoEnfermedad) => bebeTipoEnfermedad.idTipoEnfermedadBebe !== bebeTipoEnfermedadId);
            this.filteredBebeTipoEnfermedades = this.filteredBebeTipoEnfermedades.filter((bebeTipoEnfermedad) => bebeTipoEnfermedad.idTipoEnfermedadBebe !== bebeTipoEnfermedadId);
            this.snackBar.open('BebeTipoEnfermedad deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting BebeTipoEnfermedad', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting BebeTipoEnfermedad',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchBebeTipoEnfermedadList(): void {
    if (this.searchBebeTipoEnfermedad) {
      const searchTerm = this.searchBebeTipoEnfermedad.trim().toLowerCase();
      this.filteredBebeTipoEnfermedades = this.bebeTipoEnfermedades.filter((BebeTipoEnfermedad) => {
        // Ajusta según los campos de tu entidad BebeControlVacunacion
        return (
          BebeTipoEnfermedad.idTipoEnfermedadBebe.toString().toLowerCase().includes(searchTerm) ||
          BebeTipoEnfermedad.bebe.nombreBebe.toLowerCase().includes(searchTerm) ||
          BebeTipoEnfermedad.tipoEnfermedad.nombreEnfermedad.toLowerCase().includes(searchTerm) ||
          BebeTipoEnfermedad.tipoEnfermedad.tipoTipoEnfermedad.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.loadBebeTipoEnfermedades();
    }
  }
  logData(data: any): void {
    console.log(data);
  }
}

import { BebeControlVacunacion } from './../../../model/BebeControlVacunacion';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BebeControlVacunacionService } from 'src/app/service/bebe-control-vacunacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-vacunacion-bebe-listar',
  templateUrl: './control-vacunacion-bebe-listar.component.html',
  styleUrls: ['./control-vacunacion-bebe-listar.component.css']
})
export class ControlVacunacionBebeListarComponent implements OnInit {
  bebeControlVacunaciones: BebeControlVacunacion[] = [];
  filteredBebeControlVacunaciones: BebeControlVacunacion[] = [];
  searchBebeControlVacunacion: string = '';

  constructor(private bebeControlVacunacionService: BebeControlVacunacionService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadBebeControlVacunaciones();
  }

  loadBebeControlVacunaciones(): void {
    this.bebeControlVacunacionService.getAllBebeControlVacunaciones().subscribe(
      (bebeControlVacunaciones) => {
        this.bebeControlVacunaciones = bebeControlVacunaciones;
        this.filteredBebeControlVacunaciones = [...bebeControlVacunaciones];
      },
      (error) => {
        console.error('Error loading BebeControlVacunaciones:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading BebeControlVacunaciones',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteBebeControlVacunacion(bebeControlVacunacionId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this BebeControlVacunacion?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bebeControlVacunacionService.deleteBebeControlVacunacionById(bebeControlVacunacionId).subscribe(
          () => {
            this.bebeControlVacunaciones = this.bebeControlVacunaciones.filter((bebeControlVacunacion) => bebeControlVacunacion.idControlVacunacionBebe !== bebeControlVacunacionId);
            this.filteredBebeControlVacunaciones = this.filteredBebeControlVacunaciones.filter((bebeControlVacunacion) => bebeControlVacunacion.idControlVacunacionBebe !== bebeControlVacunacionId);
            this.snackBar.open('BebeControlVacunacion deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting BebeControlVacunacion', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting BebeControlVacunacion',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchBebeControlVacunacionList(): void {
    if (this.searchBebeControlVacunacion) {
      const searchTerm = this.searchBebeControlVacunacion.trim().toLowerCase();
      this.filteredBebeControlVacunaciones = this.bebeControlVacunaciones.filter((bebeControlVacunacion) => {
        // Ajusta según los campos de tu entidad BebeControlVacunacion
        return (
          bebeControlVacunacion.bebe.idBebe.toString().toLowerCase().includes(searchTerm) ||
          bebeControlVacunacion.controlVacunacion.tipoVacuna.toLowerCase().includes(searchTerm) ||
          bebeControlVacunacion.bebe.nombreBebe.toLowerCase().includes(searchTerm)
          // Agrega más campos según sea necesario
          // Example: bebeControlVacunacion.otroCampo.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.loadBebeControlVacunaciones();
    }
  }
  

  logData(data: any): void {
    console.log(data);
  }
}

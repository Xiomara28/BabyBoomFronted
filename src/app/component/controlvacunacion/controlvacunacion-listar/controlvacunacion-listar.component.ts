import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ControlVacunacion } from 'src/app/model/ControlVacunacion';
import { ControlVacunacionService } from 'src/app/service/controlvacunacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-controlvacunacion-listar',
  templateUrl: './controlvacunacion-listar.component.html',
  styleUrls: ['./controlvacunacion-listar.component.css']
})
export class ControlVacunacionListarComponent implements OnInit {
  controlVacunaciones: ControlVacunacion[] = [];
  filteredControlVacunaciones: ControlVacunacion[] = [];
  searchControlVacunacion: string = '';

  constructor(private controlVacunacionService: ControlVacunacionService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadControlVacunaciones();
  }

  loadControlVacunaciones(): void {
    this.controlVacunacionService.getAllControlVacunaciones().subscribe(
      (controlVacunaciones) => {
        this.controlVacunaciones = controlVacunaciones;
        this.filteredControlVacunaciones = [...controlVacunaciones];
      },
      (error) => {
        console.error('Error loading vaccination controls:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading vaccination controls',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteControlVacunacion(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this vaccination control?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.controlVacunacionService.deleteControlVacunacion(id).subscribe(
          () => {
            this.controlVacunaciones = this.controlVacunaciones.filter((controlVacunacion) => controlVacunacion.idControlVacunacion !== id);
            this.filteredControlVacunaciones = this.filteredControlVacunaciones.filter((controlVacunacion) => controlVacunacion.idControlVacunacion !== id);
            this.snackBar.open('Vaccination control deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting vaccination control', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting vaccination control',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchControlVacunacionList(): void {
    if (this.searchControlVacunacion) {
      const searchTerm = this.searchControlVacunacion.trim().toLowerCase();
      this.filteredControlVacunaciones = this.controlVacunaciones.filter((controlVacunacion) => {
        return (
          controlVacunacion.tipoVacuna.toLowerCase().includes(searchTerm) ||
          controlVacunacion.estadoVacunacion.toLowerCase().includes(searchTerm) ||
          controlVacunacion.nombreVacunador.toLowerCase().includes(searchTerm) ||
          controlVacunacion.lugar.toLowerCase().includes(searchTerm)
          // Add more fields as needed
        );
      });
    } else {
      this.loadControlVacunaciones();
    }
  }

  editControlVacunacion(controlVacunacion: ControlVacunacion): void {
    // Add code for editing controlVacunacion if needed
  }
}

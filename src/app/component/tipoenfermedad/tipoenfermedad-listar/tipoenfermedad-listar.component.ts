import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoEnfermedad } from 'src/app/model/TipoEnfermedad';
import { TipoEnfermedadService } from 'src/app/service/tipoenfermedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-enfermedad-listar',
  templateUrl: './tipoenfermedad-listar.component.html',
  styleUrls: ['./tipoenfermedad-listar.component.css']
})
export class TipoEnfermedadListarComponent implements OnInit {
  tipoEnfermedades: TipoEnfermedad[] = [];
  filteredTipoEnfermedades: TipoEnfermedad[] = [];
  searchTipoEnfermedad: string = '';

  constructor(private tipoEnfermedadService: TipoEnfermedadService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTipoEnfermedades();
  }

  loadTipoEnfermedades(): void {
    this.tipoEnfermedadService.list().subscribe(
      (tipoEnfermedades) => {
        this.tipoEnfermedades = tipoEnfermedades;
        this.filteredTipoEnfermedades = [...tipoEnfermedades];
      },
      (error) => {
        console.error('Error loading tipoEnfermedades:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading tipoEnfermedades',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteTipoEnfermedad(idEnfermedad: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this type of disease?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipoEnfermedadService.delete(idEnfermedad).subscribe(
          () => {
            this.tipoEnfermedades = this.tipoEnfermedades.filter((tipoEnfermedad) => tipoEnfermedad.idEnfermedad !== idEnfermedad);
            this.filteredTipoEnfermedades = this.filteredTipoEnfermedades.filter((tipoEnfermedad) => tipoEnfermedad.idEnfermedad !== idEnfermedad);
            this.snackBar.open('Type of disease deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting type of disease', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting type of disease',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchTipoEnfermedadList(): void {
    if (this.searchTipoEnfermedad) {
      const searchTerm = this.searchTipoEnfermedad.trim().toLowerCase();
      this.filteredTipoEnfermedades = this.tipoEnfermedades.filter((tipoEnfermedad) => {
        return (
          tipoEnfermedad.nombreEnfermedad.toLowerCase().includes(searchTerm) ||
          tipoEnfermedad.tipoTipoEnfermedad.toLowerCase().includes(searchTerm)
          // Agrega más campos según sea necesario
        );
      });
    } else {
      this.loadTipoEnfermedades();
    }
  }

  editTipoEnfermedad(tipoEnfermedad: TipoEnfermedad): void {
  }
}

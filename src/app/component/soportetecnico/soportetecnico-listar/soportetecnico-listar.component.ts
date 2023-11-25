import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Soportetecnico } from 'src/app/model/Soportetecnico';
import { SoporteTecnicoService } from 'src/app/service/soportetecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soportetecnico-listar',
  templateUrl: './soportetecnico-listar.component.html',
  styleUrls: ['./soportetecnico-listar.component.css']
})
export class SoportetecnicoListarComponent implements OnInit {
  soporteTecnico: Soportetecnico[] = [];
  filteredSoportetecnico: Soportetecnico[] = [];
  searchSoportetecnico: string = '';

  constructor(private soporteTecnicoService: SoporteTecnicoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadSoporteTecnico();
  }

  loadSoporteTecnico(): void {
    this.soporteTecnicoService.list().subscribe(
      (soporteTecnico) => {
        this.soporteTecnico = soporteTecnico;
        this.filteredSoportetecnico = [...soporteTecnico];
      },
      (error) => {
        console.error('Error loading soporteTecnico:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading soportetECNICO',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteSoporteTecnico(idSoporte: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this type of disease?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.soporteTecnicoService.delete(idSoporte).subscribe(
          () => {
            this.soporteTecnico = this.soporteTecnico.filter((soporteTecnico) => soporteTecnico.idSoporte !== idSoporte);
            this.filteredSoportetecnico = this.filteredSoportetecnico.filter((soporteTecnico) => soporteTecnico.idSoporte !== idSoporte);
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

  searchSoporteTecnicoList(): void {
    if (this.searchSoportetecnico) {
      const searchTerm = this.searchSoportetecnico.trim().toLowerCase();
      this.filteredSoportetecnico = this.soporteTecnico.filter((soporteTecnico) => {
        return (
          soporteTecnico.nombreSoporte.toLowerCase().includes(searchTerm)
          // Agrega más campos según sea necesario
        );
      });
    } else {
      this.loadSoporteTecnico();
    }
  }

  editSoporteTecnico(soporteTecnico: Soportetecnico): void {
  }
}

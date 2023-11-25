import { ApoderadoService } from 'src/app/service/apoderado.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apoderado } from 'src/app/model/Apoderado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apoderado-listar',
  templateUrl: './apoderado-listar.component.html',
  styleUrls: ['./apoderado-listar.component.css']
})
export class ApoderadoListarComponent implements OnInit {
  apoderados: Apoderado[] = [];
  filteredApoderados: Apoderado[] = [];
  searchApoderado: string = '';

  constructor(private apoderadoService: ApoderadoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadApoderados();
  }

  loadApoderados(): void {
    this.apoderadoService.list().subscribe(
      (apoderados) => {
        this.apoderados = apoderados;
        this.filteredApoderados = [...apoderados];
      },
      (error) => {
        console.error('Error loading apoderados:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading apoderados',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteApoderado(apoderadoId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this apoderado?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apoderadoService.deleteApoderado(apoderadoId).subscribe(
          () => {
            this.apoderados = this.apoderados.filter((apoderado) => apoderado.idApoderado !== apoderadoId);
            this.filteredApoderados = this.filteredApoderados.filter((apoderado) => apoderado.idApoderado !== apoderadoId);
            this.snackBar.open('Apoderado deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting apoderado', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting apoderado',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchApoderadoList(): void {
    if (this.searchApoderado) {
      const searchTerm = this.searchApoderado.trim().toLowerCase();
      this.filteredApoderados = this.apoderados.filter((apoderado) => {
        return (
          apoderado.nombre.toLowerCase().includes(searchTerm) ||
          apoderado.apellido.toLowerCase().includes(searchTerm) ||
          apoderado.email.toLowerCase().includes(searchTerm)
          // Add more fields as needed
        );
      });
    } else {
      this.loadApoderados();
    }
  }

  // Add other methods as needed (e.g., editApoderado)
}

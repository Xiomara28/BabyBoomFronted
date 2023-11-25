import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medico } from 'src/app/model/Medico';
import { MedicoService } from 'src/app/service/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-listar',
  templateUrl: './medico-listar.component.html',
  styleUrls: ['./medico-listar.component.css']
})
export class MedicoListarComponent implements OnInit{
  medicos: Medico[] = [];
  filteredMedicos: Medico[] = [];
  searchMedico: string = '';

  constructor(private medicoService: MedicoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadMedicos();
  }

  loadMedicos(): void {
    this.medicoService.getAllMedicos().subscribe(
      (medicos) => {
        this.medicos = medicos;
        this.filteredMedicos = [...medicos];
      },
      (error) => {
        console.error('Error loading medics:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading medics',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  deleteMedico(id: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this medic?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.deleteMedico(id).subscribe(
          () => {
            this.medicos = this.medicos.filter((medico) => medico.idMedico !== id);
            this.filteredMedicos = this.filteredMedicos.filter((medico) => medico.idMedico !== id);
            this.snackBar.open('Medic deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting medic', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting medic',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchMedicoList(): void {
    if (this.searchMedico) {
      const searchTerm = this.searchMedico.trim().toLowerCase();
      this.filteredMedicos = this.medicos.filter((medico) => {
        return (
          medico.nombre.toLowerCase().includes(searchTerm) ||
          medico.apellido.toLowerCase().includes(searchTerm) ||
          medico.especialidad.toLowerCase().includes(searchTerm) ||
          medico.email.toLowerCase().includes(searchTerm)
          // Add more fields as needed
        );
      });
    } else {
      this.loadMedicos();
    }
  }

  editMedico(medico: Medico): void {
    // Add code for editing medic if needed
  }
}

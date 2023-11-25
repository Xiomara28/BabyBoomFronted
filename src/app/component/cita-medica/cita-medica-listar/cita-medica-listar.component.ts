import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaMedica } from 'src/app/model/CitaMedica';
import { CitaMedicaService } from 'src/app/service/citaMedica.service';
import Swal from 'sweetalert2';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import { MedicoService } from 'src/app/service/medico.service';

@Component({
  selector: 'app-cita-medica-listar',
  templateUrl: './cita-medica-listar.component.html',
  styleUrls: ['./cita-medica-listar.component.css']
})
export class CitaMedicaListarComponent implements OnInit {
  citaMedicas: CitaMedica[] = [];
  filteredCitaMedicas: CitaMedica[] = [];
  searchCitaMedica: string = '';

  constructor(private citaMedicaService: CitaMedicaService, private snackBar: MatSnackBar, private apoderadoService: ApoderadoService, private medicoSercive: MedicoService) {}

  ngOnInit(): void {
    this.loadCitaMedicas();
  }

  loadCitaMedicas(): void {
    this.citaMedicaService.getCitaMedicas().subscribe(
      (citaMedicas) => {
        this.citaMedicas = citaMedicas;
        this.filteredCitaMedicas = [...citaMedicas];
        console.log('CitaMedicas:', this.citaMedicas); // Agrega este log

        // Si tu servicio no proporciona la información del apoderado, puedes cargarla aquí
        this.loadApoderadosForCitaMedicas();
        this.loadMedicosForCitaMedicas();
      },
      (error) => {
        console.error('Error loading citaMedicas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading citaMedicas',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  loadApoderadosForCitaMedicas(): void {
    this.citaMedicas.forEach(citaMedica => {
      if (citaMedica.idApoderado) {
        this.apoderadoService.listId(citaMedica.idApoderado).subscribe(
          (apoderado) => {
            citaMedica.apoderado = apoderado;
          },
          (error) => {
            console.error('Error loading apoderado for citaMedica:', error);
          }
        );
      }
    });
  }

  loadMedicosForCitaMedicas(): void {
    this.citaMedicas.forEach(citaMedica => {
      if (citaMedica.idMedico) {
        this.medicoSercive.getMedicoById(citaMedica.idMedico).subscribe(
          (medico) => {
            citaMedica.medico = medico;
          },
          (error) => {
            console.error('Error loading medico for citaMedica:', error);
          }
        );
      }
    });
  }

  deleteCitaMedica(citaMedicaId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this citaMedica?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citaMedicaService.deleteCitaMedica(citaMedicaId).subscribe(
          () => {
            this.citaMedicas = this.citaMedicas.filter((citaMedica) => citaMedica.idCitaMedica !== citaMedicaId);
            this.filteredCitaMedicas = this.filteredCitaMedicas.filter((citaMedica) => citaMedica.idCitaMedica !== citaMedicaId);
            this.snackBar.open('CitaMedica deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting citaMedica', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting citaMedica',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchCitaMedicaList(): void {
    if (this.searchCitaMedica) {
      const searchTerm = this.searchCitaMedica.trim().toLowerCase();
      this.filteredCitaMedicas = this.citaMedicas.filter((citaMedica) => {
        return (
          citaMedica.tituloCita.toLowerCase().includes(searchTerm) ||
          citaMedica.fecha.toString().toLowerCase().includes(searchTerm) ||
          citaMedica.lugar.toLowerCase().includes(searchTerm) ||
          citaMedica.nombreClinica.toLowerCase().includes(searchTerm) ||
          (citaMedica.apoderado ? (citaMedica.apoderado.nombre + ' ' + citaMedica.apoderado.apellido).toLowerCase().includes(searchTerm) : false)
          ||
          (citaMedica.medico ? (citaMedica.medico.nombre + ' ' + citaMedica.medico.apellido).toLowerCase().includes(searchTerm) : false)
          // Ajusta según la estructura de tu apoderado
          // Agrega más campos según sea necesario
        );
      });
    } else {
      this.loadCitaMedicas();
    }
  }
}

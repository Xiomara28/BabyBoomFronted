import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Problema } from 'src/app/model/Problema';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import { ProblemaService } from 'src/app/service/problema.service';
import { SoporteTecnicoService } from 'src/app/service/soportetecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-problema-listar',
  templateUrl: './problema-listar.component.html',
  styleUrls: ['./problema-listar.component.css'],
  providers: [ApoderadoService, SoporteTecnicoService]
})
export class ProblemaListarComponent implements OnInit {
  problemas: Problema[] = [];
  filteredProblemas: Problema[] = [];
  searchProblema: string = '';

  constructor(private problemaService: ProblemaService, private snackBar: MatSnackBar, private apoderadoService: ApoderadoService, private soporteTecnicoService: SoporteTecnicoService) {}

  ngOnInit(): void {
    this.loadProblemas();
  }

  loadProblemas(): void {
    this.problemaService.getProblemas().subscribe(
      (problemas) => {
        this.problemas = problemas;
        this.filteredProblemas = [...problemas];
        console.log('Problemas:', this.problemas); // Agrega este log

        // Si tu servicio no proporciona la información del apoderado, puedes cargarla aquí
        this.loadApoderadosForProblemas();
        this.loadSoporteTecnicoForProblemas();
      },
      (error) => {
        console.error('Error loading bebes:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading bebes',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  loadApoderadosForProblemas(): void {
    this.problemas.forEach(problema => {
      if (problema.idApoderado) {
        this.apoderadoService.listId(problema.idApoderado).subscribe(
          (apoderado) => {
            problema.apoderado = apoderado;
          },
          (error) => {
            console.error('Error loading apoderado for problema:', error);
          }
        );
      }
    });
  }
  loadSoporteTecnicoForProblemas(): void {
    this.problemas.forEach(problema => {
      if (problema.idSoporteTecnico) {
        this.soporteTecnicoService.getById(problema.idSoporteTecnico).subscribe(
          (soporteTecnico) => {
            problema.soporteTecnico = soporteTecnico;
          },
          (error) => {
            console.error('Error loading soporte for problema:', error);
          }
        );
      }
    });
  }

  deleteProblema(problemaId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this problema?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.problemaService.deleteProblema(problemaId).subscribe(
          () => {
            this.problemas = this.problemas.filter((problema) => problema.idProblema !== problemaId);
            this.filteredProblemas = this.filteredProblemas.filter((problema) => problema.idProblema !== problemaId);
            this.snackBar.open('Problema deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting Problema', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting Problema',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchProblemaList(): void {
    if (this.searchProblema) {
      const searchTerm = this.searchProblema.trim().toLowerCase();
      this.filteredProblemas = this.problemas.filter((problema) => {
        return (
          problema.titulo.toLowerCase().includes(searchTerm) ||
          problema.descripcion.toLowerCase().includes(searchTerm) ||
          problema.fechaInicio.toString().toLowerCase().includes(searchTerm) ||
          problema.fechaFin.toString().toLowerCase().includes(searchTerm) ||
          (problema.apoderado ? (problema.apoderado.nombre + ' ' + problema.apoderado.apellido).toLowerCase().includes(searchTerm) : false) ||
          (problema.soporteTecnico ? (problema.soporteTecnico.nombreSoporte).toLowerCase().includes(searchTerm) : false)
          // Ajusta según la estructura de tu apoderado
          // Agrega más campos según sea necesario
        );
      });
    } else {
      this.loadProblemas();
    }
  }

}

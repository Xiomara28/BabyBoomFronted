import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bebe } from 'src/app/model/bebe';
import { BebeService } from 'src/app/service/bebe.service';
import Swal from 'sweetalert2';
import { ApoderadoService } from 'src/app/service/apoderado.service';

@Component({
  selector: 'app-bebe-listar',
  templateUrl: './bebe-listar.component.html',
  styleUrls: ['./bebe-listar.component.css'],
  providers: [ApoderadoService]
})
export class BebeListarComponent implements OnInit {
  bebes: Bebe[] = [];
  filteredBebes: Bebe[] = [];
  searchBebe: string = '';

  constructor(private bebeService: BebeService, private snackBar: MatSnackBar, private apoderadoService: ApoderadoService) {}

  ngOnInit(): void {
    this.loadBebes();
  }

  loadBebes(): void {
    this.bebeService.getBebes().subscribe(
      (bebes) => {
        this.bebes = bebes;
        this.filteredBebes = [...bebes];
        console.log('Bebes:', this.bebes); // Agrega este log
  
        // Si tu servicio no proporciona la información del apoderado, puedes cargarla aquí
        this.loadApoderadosForBebes();
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

  loadApoderadosForBebes(): void {
    this.bebes.forEach(bebe => {
      if (bebe.apoderadoId) {
        this.apoderadoService.listId(bebe.apoderadoId).subscribe(
          (apoderado) => {
            bebe.apoderado = apoderado;
          },
          (error) => {
            console.error('Error loading apoderado for bebe:', error);
          }
        );
      }
    });
  }

  deleteBebe(bebeId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this bebe?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bebeService.deleteBebe(bebeId).subscribe(
          () => {
            this.bebes = this.bebes.filter((bebe) => bebe.idBebe !== bebeId);
            this.filteredBebes = this.filteredBebes.filter((bebe) => bebe.idBebe !== bebeId);
            this.snackBar.open('Bebe deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting bebe', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting bebe',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchBebeList(): void {
    if (this.searchBebe) {
      const searchTerm = this.searchBebe.trim().toLowerCase();
      this.filteredBebes = this.bebes.filter((bebe) => {
        return (
          bebe.nombreBebe.toLowerCase().includes(searchTerm) ||
          bebe.fechaBebe.toString().toLowerCase().includes(searchTerm) ||
          (bebe.apoderado ? (bebe.apoderado.nombre + ' ' + bebe.apoderado.apellido).toLowerCase().includes(searchTerm) : false)
          // Ajusta según la estructura de tu apoderado
          // Agrega más campos según sea necesario
        );
      });
    } else {
      this.loadBebes();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BebeService } from 'src/app/service/bebe.service';
import { Bebe } from 'src/app/model/bebe';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apoderado } from 'src/app/model/Apoderado';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls:['./create-edit.component.css']
})
export class BebeCreateEditComponent implements OnInit {
  customBebeForm: FormGroup;
  apoderados: Apoderado[] = [];
  idBebe!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private bebeService: BebeService,
    private apoderadoService: ApoderadoService,
    private snackBar: MatSnackBar,
    private router: Router,  
    private activatedRoute: ActivatedRoute
  ) {
    this.customBebeForm = this.formBuilder.group({
      idBebe: [""],
      nombreBebe: ['', Validators.required],
      fechaBebe: ['', Validators.required],
      apoderadoId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadApoderados();
    this.idBebe = this.activatedRoute.snapshot.params['idBebe'];

    if (this.idBebe !== 0 && this.idBebe !== undefined) {
      this.modoInsertar = false;
      this.bebeService.getBebeById(this.idBebe).subscribe(
        {
          next: (data: Bebe) => {
            this.customBebeForm.get("idBebe")?.setValue(data.idBebe);
            this.customBebeForm.get("nombreBebe")?.setValue(data.nombreBebe);
            this.customBebeForm.get("fechaBebe")?.setValue(data.fechaBebe);
            this.customBebeForm.get("apoderadoId")?.setValue(data.apoderadoId);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving bebé information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.idBebe = 0;
      this.modoInsertar = true;
    }
  }

  loadApoderados(): void {
    this.apoderadoService.list().subscribe(
      (apoderados) => {
        this.apoderados = apoderados;
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

  addCustomBebe(): void {
    if (this.customBebeForm.valid) {
      const newBebe = this.customBebeForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.bebeService.createBebe(newBebe).subscribe(
        () => {
          console.log('Bebé ' + actionText + ' successfully');
          this.customBebeForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Bebé ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          // Navega a la vista BebeComponent después de ejecutar la función
          this.router.navigate(['/bebe']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' bebé', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' bebé',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/bebe']);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
        timer: 3000,
        showConfirmButton: false
      });

      this.router.navigate(['/bebe']);
    }
  }
}

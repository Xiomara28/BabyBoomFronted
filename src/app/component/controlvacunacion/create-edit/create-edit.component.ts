import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlVacunacion } from 'src/app/model/ControlVacunacion';
import { ControlVacunacionService } from 'src/app/service/controlvacunacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class ControlVacunacionCreateEditComponent implements OnInit{

  customControlVacunacionForm: FormGroup;
  controlVacunacionId!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private controlVacunacionService: ControlVacunacionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customControlVacunacionForm = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      tipoVacuna: ['', Validators.required],
      estadoVacunacion: ['', Validators.required],
      nombreVacunador: ['', Validators.required],
      lugar: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.controlVacunacionId = this.activatedRoute.snapshot.params['id'];

    if (this.controlVacunacionId !== 0 && this.controlVacunacionId !== undefined) {
      this.modoInsertar = false;
      this.controlVacunacionService.getControlVacunacionById(this.controlVacunacionId).subscribe(
        {
          next: (data: ControlVacunacion) => {
            this.customControlVacunacionForm.patchValue(data);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving vaccination control information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.controlVacunacionId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomControlVacunacion(): void {
    if (this.customControlVacunacionForm.valid) {
      const newControlVacunacion = this.customControlVacunacionForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.controlVacunacionService.createControlVacunacion(newControlVacunacion).subscribe(
        () => {
          console.log('Vaccination control ' + actionText + ' successfully');
          this.customControlVacunacionForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Vaccination control ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/ControlVacunacion']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' vaccination control', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' vaccination control',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/ControlVacunacion']);
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

      this.router.navigate(['/ControlVacunacion']);
    }
  }
}

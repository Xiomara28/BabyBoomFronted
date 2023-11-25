import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from 'src/app/model/Medico';
import { MedicoService } from 'src/app/service/medico.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico-create-edit',
  templateUrl: './medico-create-edit.component.html',
  styleUrls: ['./medico-create-edit.component.css']
})
export class MedicoCreateEditComponent implements OnInit{
  customMedicoForm: FormGroup;
  medicoId!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customMedicoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      especialidad: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.medicoId = this.activatedRoute.snapshot.params['id'];

    if (this.medicoId !== 0 && this.medicoId !== undefined) {
      this.modoInsertar = false;
      this.medicoService.getMedicoById(this.medicoId).subscribe(
        {
          next: (data: Medico) => {
            this.customMedicoForm.patchValue(data);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving medic information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.medicoId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomMedico(): void {
    if (this.customMedicoForm.valid) {
      const newMedico = this.customMedicoForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.medicoService.createMedico(newMedico).subscribe(
        () => {
          console.log('Medic ' + actionText + ' successfully');
          this.customMedicoForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Medic ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/Medico']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' medic', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' medic',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/Medico']);
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

      this.router.navigate(['/Medico']);
    }
  }

}

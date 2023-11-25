import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Apoderado } from 'src/app/model/Apoderado';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class ApoderadoCrearEditarComponent implements OnInit {
  customApoderadoForm: FormGroup;
  apoderadoId!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apoderadoService: ApoderadoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customApoderadoForm = this.formBuilder.group({
      idApoderado: [""],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.apoderadoId = this.activatedRoute.snapshot.params['idApoderado'];

    if (this.apoderadoId !== 0 && this.apoderadoId !== undefined) {
      this.modoInsertar = false;
      this.apoderadoService.listId(this.apoderadoId).subscribe(
        {
          next: (data: Apoderado) => {
            this.customApoderadoForm.get("idApoderado")?.setValue(data.idApoderado);
            this.customApoderadoForm.get("nombre")?.setValue(data.nombre);
            this.customApoderadoForm.get("apellido")?.setValue(data.apellido);
            this.customApoderadoForm.get("email")?.setValue(data.email);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving apoderado information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.apoderadoId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomApoderado(): void {
    if (this.customApoderadoForm.valid) {
      const newApoderado = this.customApoderadoForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      if (this.modoInsertar) {
        // Insert new apoderado
        this.apoderadoService.insert(newApoderado).subscribe(
          () => {
            console.log('Apoderado ' + actionText + ' successfully');
            this.customApoderadoForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Apoderado ' + actionText + ' successfully',
              timer: 3000,
              showConfirmButton: false
            });

            // Navigate to the apoderados view after successful insertion
            this.router.navigate(['/apoderados']);
          },
          (error: any) => {
            console.error('Error adding apoderado', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error adding apoderado',
              timer: 3000,
              showConfirmButton: false
            });

            this.router.navigate(['/apoderados']);
          }
        );
      } else {
        // Update existing apoderado
        this.apoderadoService.update(newApoderado).subscribe(
          () => {
            console.log('Apoderado ' + actionText + ' successfully');
            this.customApoderadoForm.reset();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Apoderado ' + actionText + ' successfully',
              timer: 3000,
              showConfirmButton: false
            });

            // Navigate to the apoderados view after successful update
            this.router.navigate(['/apoderados']);
          },
          (error: any) => {
            console.error('Error updating apoderado', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error updating apoderado',
              timer: 3000,
              showConfirmButton: false
            });

            this.router.navigate(['/apoderados']);
          }
        );
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
        timer: 3000,
        showConfirmButton: false
      });

      this.router.navigate(['/apoderados']);
    }
  }
}

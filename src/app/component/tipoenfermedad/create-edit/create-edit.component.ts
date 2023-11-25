import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoEnfermedad } from 'src/app/model/TipoEnfermedad';
import { TipoEnfermedadService } from 'src/app/service/tipoenfermedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class TipoEnfermedadCreateEditComponent implements OnInit {
  customTipoEnfermedadForm: FormGroup;
  tipoEnfermedadId!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private tipoEnfermedadService: TipoEnfermedadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customTipoEnfermedadForm = this.formBuilder.group({
      idEnfermedad: [""],
      nombreEnfermedad: ['', Validators.required],
      tipoTipoEnfermedad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.tipoEnfermedadId = this.activatedRoute.snapshot.params['idEnfermedad'];

    if (this.tipoEnfermedadId !== 0 && this.tipoEnfermedadId !== undefined) {
      this.modoInsertar = false;
      this.tipoEnfermedadService.getById(this.tipoEnfermedadId).subscribe(
        {
          next: (data: TipoEnfermedad) => {
            this.customTipoEnfermedadForm.get("idEnfermedad")?.setValue(data.idEnfermedad);
            this.customTipoEnfermedadForm.get("nombreEnfermedad")?.setValue(data.nombreEnfermedad);
            this.customTipoEnfermedadForm.get("tipoTipoEnfermedad")?.setValue(data.tipoTipoEnfermedad);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving type of disease information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.tipoEnfermedadId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomTipoEnfermedad(): void {
    if (this.customTipoEnfermedadForm.valid) {
      const newTipoEnfermedad = this.customTipoEnfermedadForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.tipoEnfermedadService.create(newTipoEnfermedad).subscribe(
        () => {
          console.log('Type of disease ' + actionText + ' successfully');
          this.customTipoEnfermedadForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Type of disease ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          // Navigates to the TipoEnfermedadListComponent after executing the function
          this.router.navigate(['/tipoEnfermedad']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' type of disease', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' type of disease',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/tipoEnfermedad']);
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

      this.router.navigate(['/tipoEnfermedad']);
    }
  }
}

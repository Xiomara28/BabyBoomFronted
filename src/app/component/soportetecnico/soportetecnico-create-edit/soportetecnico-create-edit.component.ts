import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Soportetecnico } from 'src/app/model/Soportetecnico';
import { SoporteTecnicoService } from 'src/app/service/soportetecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soportetecnico-create-edit',
  templateUrl: './soportetecnico-create-edit.component.html',
  styleUrls: ['./soportetecnico-create-edit.component.css']
})
export class SoportetecnicoCreateEditComponent implements OnInit {
  customSoporteTecnicoForm: FormGroup;
  soporteTecnicoId!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private soporteTecnicoService: SoporteTecnicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customSoporteTecnicoForm = this.formBuilder.group({
      idSoporte: [""],
      nombreSoporte: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.soporteTecnicoId = this.activatedRoute.snapshot.params['idSoporte'];

    if (this.soporteTecnicoId !== 0 && this.soporteTecnicoId !== undefined) {
      this.modoInsertar = false;
      this.soporteTecnicoService.getById(this.soporteTecnicoId).subscribe(
        {
          next: (data: Soportetecnico) => {
            this.customSoporteTecnicoForm.get("idSoporte")?.setValue(data.idSoporte);
            this.customSoporteTecnicoForm.get("nombreSoporte")?.setValue(data.nombreSoporte);

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
      this.soporteTecnicoId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomSoporteTecnico(): void {
    if (this.customSoporteTecnicoForm.valid) {
      const newSoporteTecnico = this.customSoporteTecnicoForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.soporteTecnicoService.create(newSoporteTecnico).subscribe(
        () => {
          console.log('Type of disease ' + actionText + ' successfully');
          this.customSoporteTecnicoForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Type of disease ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          // Navigates to the TipoEnfermedadListComponent after executing the function
          this.router.navigate(['/soporteTecnico']);
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

          this.router.navigate(['/soporteTecnico']);
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

      this.router.navigate(['/soporteTecnico']);
    }
  }
}

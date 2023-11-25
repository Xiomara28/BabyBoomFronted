import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Apoderado } from 'src/app/model/Apoderado';
import { CitaMedica } from 'src/app/model/CitaMedica';
import { Medico } from 'src/app/model/Medico';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import { CitaMedicaService } from 'src/app/service/citaMedica.service';
import { MedicoService } from 'src/app/service/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita-medica-create-edit',
  templateUrl: './cita-medica-create-edit.component.html',
  styleUrls: ['./cita-medica-create-edit.component.css']
})
export class CitaMedicaCreateEditComponent implements OnInit {
  customCitaMedicaForm: FormGroup;
  apoderados: Apoderado[] = [];
  medico: Medico[] = [];
  idCitaMedica!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private citaMedicaService: CitaMedicaService,
    private apoderadoService: ApoderadoService,
    private medicoService:MedicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customCitaMedicaForm = this.formBuilder.group({
      idCitaMedica: [""],
      lugar: ['', Validators.required],
      nombreClinica: ['', Validators.required],
      tituloCita: ['', Validators.required],
      fecha: ['', Validators.required],
      idApoderado: ['', Validators.required],
      idMedico: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadApoderados();
    this.loadMedicos();
    this.idCitaMedica = this.activatedRoute.snapshot.params['idCitaMedica'];

    if (this.idCitaMedica !== 0 && this.idCitaMedica !== undefined) {
      this.modoInsertar = false;
      this.citaMedicaService.getCitaMedicaById(this.idCitaMedica).subscribe(
        {
          next: (data: CitaMedica) => {
            this.customCitaMedicaForm.get("idCitaMedica")?.setValue(data.idCitaMedica);
            this.customCitaMedicaForm.get("lugar")?.setValue(data.lugar);
            this.customCitaMedicaForm.get("nombreClinica")?.setValue(data.nombreClinica);
            this.customCitaMedicaForm.get("tituloCita")?.setValue(data.tituloCita);
            this.customCitaMedicaForm.get("fecha")?.setValue(data.fecha);
            this.customCitaMedicaForm.get("idApoderado")?.setValue(data.idApoderado);
            this.customCitaMedicaForm.get("idMedico")?.setValue(data.idMedico);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving cita medica information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.idCitaMedica = 0;
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
  loadMedicos(): void {
    this.medicoService.getAllMedicos().subscribe(
      (medico) => {
        this.medico = medico;
      },
      (error) => {
        console.error('Error loading medico:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading medico',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  addCustomCitaMedica(): void {
    if (this.customCitaMedicaForm.valid) {
      const newCitaMedica = this.customCitaMedicaForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.citaMedicaService.createCitaMedica(newCitaMedica).subscribe(
        () => {
          console.log('CitaMedica ' + actionText + ' successfully');
          this.customCitaMedicaForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Cita ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          // Navega a la vista BebeComponent después de ejecutar la función
          this.router.navigate(['/citaMedica']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' problemas', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' problemas',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/citaMedica']);
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

      this.router.navigate(['/citaMedica']);
    }
  }
}

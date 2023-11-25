import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Apoderado } from 'src/app/model/Apoderado';
import { Problema } from 'src/app/model/Problema';
import { Soportetecnico } from 'src/app/model/Soportetecnico';
import { ApoderadoService } from 'src/app/service/apoderado.service';
import { ProblemaService } from 'src/app/service/problema.service';
import { SoporteTecnicoService } from 'src/app/service/soportetecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-problema-create-edit',
  templateUrl: './problema-create-edit.component.html',
  styleUrls: ['./problema-create-edit.component.css']
})
export class ProblemaCreateEditComponent implements OnInit {
  customProblemaForm: FormGroup;
  apoderados: Apoderado[] = [];
  soporteTecnico: Soportetecnico[] = [];
  idProblema!: number;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private problemaService: ProblemaService,
    private apoderadoService: ApoderadoService,
    private soporteTecnicoService:SoporteTecnicoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customProblemaForm = this.formBuilder.group({
      idProblema: [""],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      idApoderado: ['', Validators.required],
      idSoporteTecnico: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadApoderados();
    this.loadSoporteTecnico();
    this.idProblema = this.activatedRoute.snapshot.params['idProblema'];

    if (this.idProblema !== 0 && this.idProblema !== undefined) {
      this.modoInsertar = false;
      this.problemaService.getProblemaById(this.idProblema).subscribe(
        {
          next: (data: Problema) => {
            this.customProblemaForm.get("idProblema")?.setValue(data.idProblema);
            this.customProblemaForm.get("titulo")?.setValue(data.titulo);
            this.customProblemaForm.get("descripcion")?.setValue(data.descripcion);
            this.customProblemaForm.get("fechaInicio")?.setValue(data.fechaInicio);
            this.customProblemaForm.get("fechaFin")?.setValue(data.fechaFin);
            this.customProblemaForm.get("idApoderado")?.setValue(data.idApoderado);
            this.customProblemaForm.get("idSoporteTecnico")?.setValue(data.idSoporteTecnico);
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
      this.idProblema = 0;
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
  loadSoporteTecnico(): void {
    this.soporteTecnicoService.list().subscribe(
      (soporteTecnico) => {
        this.soporteTecnico = soporteTecnico;
      },
      (error) => {
        console.error('Error loading soporteTecnico:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading soporteTecnico',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  addCustomProblema(): void {
    if (this.customProblemaForm.valid) {
      const newProblema = this.customProblemaForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.problemaService.createProblema(newProblema).subscribe(
        () => {
          console.log('Problema ' + actionText + ' successfully');
          this.customProblemaForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Bebé ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          // Navega a la vista BebeComponent después de ejecutar la función
          this.router.navigate(['/problemas']);
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

          this.router.navigate(['/problemas']);
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

      this.router.navigate(['/problemas']);
    }
  }

}

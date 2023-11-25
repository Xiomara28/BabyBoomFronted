import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { BebeTipoEnfermedad } from 'src/app/model/BebeTipoEnfermedad';
import { TipoEnfermedad } from 'src/app/model/TipoEnfermedad';
import { Bebe } from 'src/app/model/bebe';
import { BebeTipoEnfermedadService } from 'src/app/service/bebe-tipo-enfermedad.service';
import { BebeService } from 'src/app/service/bebe.service';
import { TipoEnfermedadService } from 'src/app/service/tipoenfermedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-vacunacion-bebe-editar-crear',
  templateUrl: './control-vacunacion-bebe-editar-crear.component.html',
  styleUrls: ['./control-vacunacion-bebe-editar-crear.component.css']
})
export class ControlVacunacionBebeEditarCrearComponent {
  customRelacionForm: FormGroup;
  bebes: Bebe[] = [];
  tiposEnfermedad: TipoEnfermedad[] = [];
  idRelacion: number | undefined;
  modoInsertar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private bebeTipoEnfermedadService: BebeTipoEnfermedadService,
    private bebeService: BebeService,
    private tipoEnfermedadService: TipoEnfermedadService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customRelacionForm = this.formBuilder.group({
      id: [''],
      bebe: ['', Validators.required],
      tipoEnfermedad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBebes();
    this.loadTiposEnfermedad();
    this.idRelacion = this.activatedRoute.snapshot.params['id'];

    if (this.idRelacion !== 0 && this.idRelacion !== undefined) {
      this.modoInsertar = false;
      this.bebeTipoEnfermedadService.getBebeTipoEnfermedadById(this.idRelacion).subscribe(
        {
          next: (data: BebeTipoEnfermedad) => {
            this.customRelacionForm.get('id')?.setValue(data.idTipoEnfermedadBebe);
            this.customRelacionForm.get('bebe')?.setValue(data.bebe);
            this.customRelacionForm.get('tipoEnfermedad')?.setValue(data.tipoEnfermedad);
          },
          error: (err) => {
            console.log(err);
            this.showErrorMessage('Error al recuperar la información de la relación');
          }
        }
      );
    } else {
      this.idRelacion = 0;
      this.modoInsertar = true;
    }
  }

  loadBebes(): void {
    this.bebeService.getBebes().subscribe(
      (bebes) => {
        this.bebes = bebes;
      },
      (error) => {
        console.error('Error al cargar los bebés:', error);
        this.showErrorMessage('Error al cargar los bebés');
      }
    );
  }

  loadTiposEnfermedad(): void {
    this.tipoEnfermedadService.list().subscribe(
      (tiposEnfermedad) => {
        this.tiposEnfermedad = tiposEnfermedad;
      },
      (error) => {
        console.error('Error al cargar los tipos de enfermedad:', error);
        this.showErrorMessage('Error al cargar los tipos de enfermedad');
      }
    );
  }

  addCustomRelacion(): void {
    if (this.customRelacionForm.valid) {
      const newRelacion = this.customRelacionForm.value;
      const actionText = this.modoInsertar ? 'agregada' : 'actualizada';

      this.bebeTipoEnfermedadService.createBebeTipoEnfermedad(newRelacion).subscribe(
        () => {
          console.log('Relación ' + actionText + ' exitosamente');
          this.customRelacionForm.reset();
          this.showSuccessMessage('Relación ' + actionText + ' exitosamente');
          this.router.navigate(['/tipoEnfermedadBebe']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'agregando' : 'actualizando') + ' la relación', error);
          this.showErrorMessage('Error ' + (this.modoInsertar ? 'agregando' : 'actualizando') + ' la relación');
          this.router.navigate(['/tipoEnfermedadBebe']);
        }
      );
    } else {
      this.showErrorMessage('Por favor complete todos los campos obligatorios');
      this.router.navigate(['/tipoEnfermedadBebe']);
    }
  }

  private showSuccessMessage(message: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  }

  private showErrorMessage(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  }
}

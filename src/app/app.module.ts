import { NgModule } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule} from '@angular/material/table';//add
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';//add
import { MatSortModule } from '@angular/material/sort'; //add
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import{MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BebeComponent } from './component/bebe/bebe.component';
import { BebeListarComponent } from './component/bebe/bebe-listar/bebe-listar.component';
import { BebeCreateEditComponent } from './component/bebe/create-edit/create-edit.component';
import { ApoderadoComponent } from './component/apoderado/apoderado.component';
import { ApoderadoCrearEditarComponent } from './component/apoderado/create-edit/create-edit.component';
import { ApoderadoListarComponent } from './component/apoderado/apoderado-listar/apoderado-listar.component';
import { TipoenfermedadComponent } from './component/tipoenfermedad/tipoenfermedad.component';
import { TipoEnfermedadCreateEditComponent } from './component/tipoenfermedad/create-edit/create-edit.component';
import { TipoEnfermedadListarComponent } from './component/tipoenfermedad/tipoenfermedad-listar/tipoenfermedad-listar.component';
import { ControlvacunacionComponent } from './component/controlvacunacion/controlvacunacion.component';
import { ControlVacunacionListarComponent } from './component/controlvacunacion/controlvacunacion-listar/controlvacunacion-listar.component';
import { ControlVacunacionCreateEditComponent } from './component/controlvacunacion/create-edit/create-edit.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BebeTipoEnfermedadComponent } from './component/bebe-tipo-enfermedad/bebe-tipo-enfermedad.component';
import { BebeTipoEnfermedadListarComponent } from './component/bebe-tipo-enfermedad/bebe-tipo-enfermedad-listar/bebe-tipo-enfermedad-listar.component';
import { MatMenuModule } from '@angular/material/menu';
import { TipoEnfermedadBebeComponent } from './component/tipo-enfermedad-bebe/tipo-enfermedad-bebe.component';
import { CreateEditComponent } from './component/tipo-enfermedad-bebe/create-edit/create-edit.component';
import { TipoEnfermedadBebeListarComponent } from './component/tipo-enfermedad-bebe/tipo-enfermedad-bebe-listar/tipo-enfermedad-bebe-listar.component';
import { ControlVacunacionBebeComponent } from './component/control-vacunacion-bebe/control-vacunacion-bebe.component';
import { ControlVacunacionBebeListarComponent } from './component/control-vacunacion-bebe/control-vacunacion-bebe-listar/control-vacunacion-bebe-listar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlVacunacionBebeEditarCrearComponent } from './component/control-vacunacion-bebe/control-vacunacion-bebe-editar-crear/control-vacunacion-bebe-editar-crear.component';
import { ProblemaComponent } from './component/problema/problema.component';
import { ProblemaListarComponent } from './component/problema/problema-listar/problema-listar.component';
import { SoportetecnicoComponent } from './component/soportetecnico/soportetecnico.component';
import { SoportetecnicoListarComponent } from './component/soportetecnico/soportetecnico-listar/soportetecnico-listar.component';
import { SoportetecnicoCreateEditComponent } from './component/soportetecnico/soportetecnico-create-edit/soportetecnico-create-edit.component';
import { ProblemaCreateEditComponent } from './component/problema/problema-create-edit/problema-create-edit.component';
import { MedicoComponent } from './component/medico/medico.component';
import { MedicoListarComponent } from './component/medico/medico-listar/medico-listar.component';
import { MedicoCreateEditComponent } from './component/medico/medico-create-edit/medico-create-edit.component';
import { CitaMedicaComponent } from './component/cita-medica/cita-medica.component';
import { CitaMedicaListarComponent } from './component/cita-medica/cita-medica-listar/cita-medica-listar.component';
import { CitaMedicaCreateEditComponent } from './component/cita-medica/cita-medica-create-edit/cita-medica-create-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    BebeComponent,
    BebeListarComponent,
    BebeCreateEditComponent,
    ApoderadoComponent,
    ApoderadoListarComponent,
    ApoderadoCrearEditarComponent,
    TipoenfermedadComponent,
    ControlVacunacionCreateEditComponent,
    TipoEnfermedadListarComponent,
    ControlvacunacionComponent,
    ControlVacunacionListarComponent,
    TipoEnfermedadCreateEditComponent,
    BebeTipoEnfermedadComponent,
    BebeTipoEnfermedadListarComponent,
    TipoEnfermedadBebeComponent,
    CreateEditComponent,
    TipoEnfermedadBebeListarComponent,
    ControlVacunacionBebeComponent,
    ControlVacunacionBebeListarComponent,
    CreateEditComponent,
    ControlVacunacionBebeEditarCrearComponent,
    ProblemaComponent,
    ProblemaListarComponent,
    ProblemaCreateEditComponent,
    SoportetecnicoComponent,
    SoportetecnicoListarComponent,
    SoportetecnicoCreateEditComponent,
    MedicoComponent,
    MedicoListarComponent,
    MedicoCreateEditComponent,
    CitaMedicaComponent,
    CitaMedicaListarComponent,
    CitaMedicaCreateEditComponent

  ],
  imports: [
    MatFormFieldModule,
    MatSnackBarModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule, // add
    MatButtonModule, // Paginator add hand
    MatSortModule, // Paginator add hand
    MatPaginatorModule,// Paginator add hand
    ReactiveFormsModule, // por el Subject
    FormsModule, //add
    MatInputModule, //add
    MatDatepickerModule, //add
    MatNativeDateModule, //add
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatToolbarModule,
    CommonModule,
    HttpClientModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApoderadoComponent } from './component/apoderado/apoderado.component';
import { ApoderadoCrearEditarComponent } from './component/apoderado/create-edit/create-edit.component';
import { BebeComponent } from './component/bebe/bebe.component';
import { BebeCreateEditComponent } from './component/bebe/create-edit/create-edit.component';
import { BebeListarComponent } from './component/bebe/bebe-listar/bebe-listar.component';
import { ApoderadoListarComponent } from './component/apoderado/apoderado-listar/apoderado-listar.component';
import { TipoEnfermedadListarComponent } from './component/tipoenfermedad/tipoenfermedad-listar/tipoenfermedad-listar.component';
import { TipoEnfermedadCreateEditComponent } from './component/tipoenfermedad/create-edit/create-edit.component';
import { ControlVacunacionListarComponent } from './component/controlvacunacion/controlvacunacion-listar/controlvacunacion-listar.component';
import { ControlVacunacionCreateEditComponent } from './component/controlvacunacion/create-edit/create-edit.component';
import { TipoEnfermedadBebeListarComponent } from './component/tipo-enfermedad-bebe/tipo-enfermedad-bebe-listar/tipo-enfermedad-bebe-listar.component';
import { CreateEditComponent } from './component/tipo-enfermedad-bebe/create-edit/create-edit.component';
import { ControlVacunacionBebeListarComponent } from './component/control-vacunacion-bebe/control-vacunacion-bebe-listar/control-vacunacion-bebe-listar.component';
import { ControlVacunacionBebeEditarCrearComponent } from './component/control-vacunacion-bebe/control-vacunacion-bebe-editar-crear/control-vacunacion-bebe-editar-crear.component';
import { SoportetecnicoComponent } from './component/soportetecnico/soportetecnico.component';
import { SoportetecnicoCreateEditComponent } from './component/soportetecnico/soportetecnico-create-edit/soportetecnico-create-edit.component';
import { ProblemaComponent } from './component/problema/problema.component';
import { ProblemaCreateEditComponent } from './component/problema/problema-create-edit/problema-create-edit.component';
import { MedicoListarComponent } from './component/medico/medico-listar/medico-listar.component';
import { MedicoCreateEditComponent } from './component/medico/medico-create-edit/medico-create-edit.component';
import { CitaMedicaListarComponent } from './component/cita-medica/cita-medica-listar/cita-medica-listar.component';
import { CitaMedicaCreateEditComponent } from './component/cita-medica/cita-medica-create-edit/cita-medica-create-edit.component';


const routes: Routes = [

  { path: 'apoderados', component: ApoderadoListarComponent },
  { path: 'add-edit-apoderados', component: ApoderadoCrearEditarComponent },
  { path: 'new', component: ApoderadoCrearEditarComponent },
  { path: 'edit/:apoderadosId', component: ApoderadoCrearEditarComponent },

  { path: 'bebes', component: BebeListarComponent },
  { path: 'add-edit-bebes', component: BebeCreateEditComponent },
  { path: 'new', component: BebeCreateEditComponent },
  { path: 'editb/:bebesId', component: BebeCreateEditComponent },

  { path: 'tipoEnfermedad', component: TipoEnfermedadListarComponent },
  { path: 'add-edit-tipoEnfermedad', component: TipoEnfermedadCreateEditComponent },
  { path: 'new', component: TipoEnfermedadCreateEditComponent },
  { path: 'editte/:tipoEnfermedadId', component: TipoEnfermedadCreateEditComponent },

  { path: 'tipoEnfermedadBebe', component: TipoEnfermedadBebeListarComponent },
  { path: 'add-edit-tipoEnfermedadbebe', component: CreateEditComponent },
  { path: 'new', component: CreateEditComponent },
  { path: 'editteb/:tipoEnfermedadbebeId', component: CreateEditComponent },

  { path: 'controlVacunacionBebe', component: ControlVacunacionBebeListarComponent },
  { path: 'add-edit-controlVacunacionBebe', component: ControlVacunacionBebeEditarCrearComponent },
  { path: 'newcontrolvacunasbebe', component: ControlVacunacionBebeEditarCrearComponent },
  { path: 'editteb/:idControlVacunacionBebe', component: ControlVacunacionBebeEditarCrearComponent },


  { path: 'ControlVacunacion', component: ControlVacunacionListarComponent },
  { path: 'add-edit-ControlVacunacion', component: ControlVacunacionCreateEditComponent },
  { path: 'new', component: ControlVacunacionCreateEditComponent },
  { path: 'edit/:ControlVacunacionId', component: ControlVacunacionCreateEditComponent },

  { path: 'soporteTecnico', component: SoportetecnicoComponent },
  { path: 'add-edit-soporteTecnico', component:SoportetecnicoCreateEditComponent  },
  { path: 'new', component: SoportetecnicoCreateEditComponent },
  { path: 'editte/:soporteTecnico', component: SoportetecnicoCreateEditComponent },

  { path: 'problemas', component: ProblemaComponent },
  { path: 'add-edit-problemas', component:ProblemaCreateEditComponent  },
  { path: 'new', component: ProblemaCreateEditComponent },
  { path: 'editte/:problemasId', component: ProblemaCreateEditComponent },

  { path: 'Medico', component: MedicoListarComponent },
  { path: 'add-edit-Medico', component: MedicoCreateEditComponent },
  { path: 'new', component: MedicoCreateEditComponent },
  { path: 'editteb/:MedicoId', component: MedicoCreateEditComponent },

  { path: 'citaMedica', component: CitaMedicaListarComponent },
  { path: 'add-edit-citaMedica', component: CitaMedicaCreateEditComponent },
  { path: 'new', component: CitaMedicaCreateEditComponent },
  { path: 'editteb/:citaMedicaId', component: CitaMedicaCreateEditComponent },


  { path: '', redirectTo: '/bebes', pathMatch: 'full' },
  { path: '**', redirectTo: '/bebes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

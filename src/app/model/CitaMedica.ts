import { Apoderado } from "./Apoderado";
import { Medico } from "./Medico";

export class CitaMedica {
  idCitaMedica: number = 0;
  idApoderado: number = 0;
  idMedico: number = 0;
  tituloCita: string = '';
  fecha: Date = new Date();
  lugar: string = '';
  nombreClinica: string = '';
  apoderado: Apoderado | null = null;
  medico: Medico | null = null;
}

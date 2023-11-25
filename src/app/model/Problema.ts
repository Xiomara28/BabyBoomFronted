import { Apoderado } from "./Apoderado";
import { Soportetecnico } from "./Soportetecnico";


export class Problema {
  idProblema: number = 0;
  idApoderado: number = 0;
  idSoporteTecnico: number = 0;
  titulo: string = '';
  descripcion: string = '';
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  apoderado: Apoderado | null = null;
 soporteTecnico: Soportetecnico | null = null;
}

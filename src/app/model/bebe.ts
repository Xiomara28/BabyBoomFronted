import { Apoderado } from "./Apoderado";

export class Bebe {
  idBebe: number = 0;
  apoderadoId: number = 0;
  nombreBebe: string = '';
  fechaBebe: Date = new Date();
  apoderado: Apoderado | null = null;
}

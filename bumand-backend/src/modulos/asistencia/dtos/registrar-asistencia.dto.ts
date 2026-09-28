import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoAsistencia } from '../entidades/registro-asistencia.entidad';

export class RegistrarAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  becarioId: number;

  @IsEnum(TipoAsistencia)
  tipo: TipoAsistencia;

  @IsString()
  @IsNotEmpty()
  fecha: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  horaIngreso?: string;

  @IsOptional()
  @IsNumber()
  latIngreso?: number;

  @IsOptional()
  @IsNumber()
  lngIngreso?: number;
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { AsistenciaServicio } from './asistencia.servicio';
import { RegistroAsistencia } from './entidades/registro-asistencia.entidad';
import { RegistrarAsistenciaDto } from './dtos/registrar-asistencia.dto';

@Controller('asistencia')
export class AsistenciaControlador {
  constructor(private readonly asistenciaServicio: AsistenciaServicio) {}

  @Post()
  registrar(@Body() registrarAsistenciaDto: RegistrarAsistenciaDto): Promise<RegistroAsistencia> {
    return this.asistenciaServicio.registrar(registrarAsistenciaDto);
  }

  @Get()
  obtenerTodos(): Promise<RegistroAsistencia[]> {
    return this.asistenciaServicio.obtenerTodos();
  }
}

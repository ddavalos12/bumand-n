import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistroAsistencia } from './entidades/registro-asistencia.entidad';
import { RegistrarAsistenciaDto } from './dtos/registrar-asistencia.dto';

@Injectable()
export class AsistenciaServicio {
  constructor(
    @InjectRepository(RegistroAsistencia)
    private readonly asistenciaRepositorio: Repository<RegistroAsistencia>,
  ) {}

  async registrar(dto: RegistrarAsistenciaDto): Promise<RegistroAsistencia> {
    // Aquí validaremos que la fecha sea un Date
    const nuevoRegistro = this.asistenciaRepositorio.create({
      ...dto,
      fecha: new Date(dto.fecha),
    });
    return this.asistenciaRepositorio.save(nuevoRegistro);
  }

  async obtenerTodos(): Promise<RegistroAsistencia[]> {
    return this.asistenciaRepositorio.find();
  }
}

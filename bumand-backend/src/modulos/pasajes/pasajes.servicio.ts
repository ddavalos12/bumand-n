import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitudPasajes } from './entidades/solicitud-pasaje.entidad';
import { CrearSolicitudPasajeDto } from './dtos/crear-solicitud-pasaje.dto';

@Injectable()
export class PasajesServicio {
  constructor(
    @InjectRepository(SolicitudPasajes)
    private readonly solicitudRepositorio: Repository<SolicitudPasajes>,
  ) {}

  async crear(dto: CrearSolicitudPasajeDto): Promise<SolicitudPasajes> {
    const nuevaSolicitud = this.solicitudRepositorio.create(dto);
    return this.solicitudRepositorio.save(nuevaSolicitud);
  }

  async obtenerTodas(): Promise<SolicitudPasajes[]> {
    return this.solicitudRepositorio.find();
  }
}

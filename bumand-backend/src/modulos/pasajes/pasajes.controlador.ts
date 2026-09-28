import { Controller, Get, Post, Body } from '@nestjs/common';
import { PasajesServicio } from './pasajes.servicio';
import { SolicitudPasajes } from './entidades/solicitud-pasaje.entidad';
import { CrearSolicitudPasajeDto } from './dtos/crear-solicitud-pasaje.dto';

@Controller('pasajes')
export class PasajesControlador {
  constructor(private readonly pasajesServicio: PasajesServicio) {}

  @Post()
  crear(@Body() crearSolicitudPasajeDto: CrearSolicitudPasajeDto): Promise<SolicitudPasajes> {
    return this.pasajesServicio.crear(crearSolicitudPasajeDto);
  }

  @Get()
  obtenerTodas(): Promise<SolicitudPasajes[]> {
    return this.pasajesServicio.obtenerTodas();
  }
}

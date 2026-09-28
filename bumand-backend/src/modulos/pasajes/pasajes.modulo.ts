import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasajesControlador } from './pasajes.controlador';
import { PasajesServicio } from './pasajes.servicio';
import { SolicitudPasajes } from './entidades/solicitud-pasaje.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudPasajes])],
  controllers: [PasajesControlador],
  providers: [PasajesServicio],
  exports: [TypeOrmModule, PasajesServicio],
})
export class PasajesModulo {}

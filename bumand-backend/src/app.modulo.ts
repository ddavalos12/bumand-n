import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppControlador } from './app.controlador';
import { AppServicio } from './app.servicio';

// Entidades
import { Usuario } from './modulos/usuarios/entidades/usuario.entidad';
import { Becario } from './modulos/becarios/entidades/becario.entidad';
import { Iglesia } from './modulos/iglesias/entidades/iglesia.entidad';
import { LugarPractica } from './modulos/lugares-practica/entidades/lugar-practica.entidad';

// Módulos
import { UsuariosModulo } from './modulos/usuarios/usuarios.modulo';
import { BecariosModulo } from './modulos/becarios/becarios.modulo';
import { IglesiasModulo } from './modulos/iglesias/iglesias.modulo';
import { LugaresPracticaModulo } from './modulos/lugares-practica/lugares-practica.modulo';
import { AuthModulo } from './modulos/auth/auth.modulo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Usuario, Becario, Iglesia, LugarPractica],
      synchronize: false, // ¡No sincronizar en producción ni sobrescribir BD legacy!
    }),
    UsuariosModulo,
    BecariosModulo,
    IglesiasModulo,
    LugaresPracticaModulo,
    AuthModulo,
  ],
  controllers: [AppControlador],
  providers: [AppServicio],
})
export class AppModulo {}

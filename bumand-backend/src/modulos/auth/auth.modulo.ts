import { Module } from '@nestjs/common';
import { AuthControlador } from './auth.controlador';

@Module({
  controllers: [AuthControlador],
})
export class AuthModulo {}

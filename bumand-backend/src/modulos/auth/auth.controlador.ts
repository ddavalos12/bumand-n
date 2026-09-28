import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthControlador {
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return { mensaje: 'Login exitoso', token: 'fake-jwt-token' };
  }
}

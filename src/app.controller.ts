import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'Product Service API is running',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHealthCheck() {
    return {
      status: 'healthy',
      service: 'nest-product-service',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}

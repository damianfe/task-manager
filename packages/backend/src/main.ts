import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    // Configurar Swagger
    setupSwagger(app);

    await app.listen(3000);

    // Logs profesionales con Logger
    Logger.log(`🚀 Server running on: http://localhost:3000`, 'Bootstrap');
    Logger.log(
      `📄 API Docs available at: http://localhost:3000/api/docs`,
      'Swagger',
    );
  } catch (error) {
    Logger.error('❌ Error initializing the app:', error, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    // Configurar Swagger
    setupSwagger(app);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    await app.listen(4000);

    Logger.log(`🚀 Server running on: http://localhost:4000`, 'Bootstrap');
    Logger.log(
      `📄 API Docs available at: http://localhost:4000/api/docs`,
      'Swagger',
    );
  } catch (error) {
    Logger.error('❌ Error initializing the app:', error, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();

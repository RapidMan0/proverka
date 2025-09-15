import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // глобальный префикс для API
  app.setGlobalPrefix('api');

  // глобальная валидация DTO с кастомной формой ошибок
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatErrors = errors.map((err) => {
          return {
            field: err.property,
            message: Object.values(err.constraints || {}).join(', '),
          };
        });

        return new BadRequestException({
          statusCode: 400,
          errors: formatErrors,
        });
      },
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Project API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // доступ по /api/docs

  await app.listen(3000);
}
bootstrap();

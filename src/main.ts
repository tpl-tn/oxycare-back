import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import bodyParser = require('body-parser');
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('oxygenCar - API')
    .setDescription('oxygenCar API Description')
    .setVersion('0.0.1')
    .setLicense('tunpl License', 'https://github.com/tunpl/oxycare-mobile')
    .addBearerAuth({
		  type: 'http',
		  scheme: 'bearer',
		  bearerFormat: 'jwt'
		})
    .addTag('oxygenCar')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  app.enableCors();
  await app.listen(3000);
}
bootstrap();

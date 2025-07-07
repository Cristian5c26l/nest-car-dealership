import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,// Permite que los dtos eliminen propiedades de mas (DATA BASURA) que vengan en el body de la peticion las cuales no esten como requeridas en los dtos.
      forbidNonWhitelisted: true,// Permite que los dtos respondan con un bad request (400) cuando el body de la peticion venga con DATA DE MAS o DATA BASURA LA CUAL NO ESTÉ ESPECIFICADA COMO REQUERIDA EN DICHOS DTOS (clases).  
    }),
    // Put another pipe como yo necesite
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/**

 Mi resumen 

"whileList: true" de ValidationPipe

Sirve para que se acepte un body que luzca como cierto DTO, incluso si el body tiene propiedades adicionales
 El DTO se va a encargar de eliminarlas, y la instancia de dicho DTO ya no tendrá esas propiedades adicionales, solo las que tiene dicho DTO (clase).

"forbidNonWhitelisted: true" de ValidationPipe

A diferencia del anterior, si el body tiene propiedades extra a las propiedades que se especifican en el DTO, se va a responder con un error de bad request.

 
 */
import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  controllers: [ CarsController ],
  providers: [CarsService],
  exports: [CarsService], // Hacer que la misma instancia del servicio CarsService (que se crea y se inyecta al controlador CarsController al levantar la aplicacion), pueda ser accedida desde instancias de otros servicios (como SeedService)
})
export class CarsModule {}

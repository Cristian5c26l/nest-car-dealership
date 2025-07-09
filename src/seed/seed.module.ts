import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [CarsModule, BrandsModule],// Importar todo lo exportado por el modulo CarsModule, para que este modulo SeedModule pueda ocupar todo lo exportado por CarsModule (CarsModule puede exportar CarsService. Si es el caso, cuando SeedModule importa CarsModule, todas las piezas de SeedModule (como el SeedService) podrá utilizar la misma instancia de la clase CarsService (la cual es utilizada en CarsController del modulo CarsModule)).
})
export class SeedModule {}

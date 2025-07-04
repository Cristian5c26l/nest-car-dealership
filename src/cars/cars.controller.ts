import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsService: CarsService,
  ){}


  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {// Todos los argumentos (incluso los query parameters y los segmentos de red) que pertenezcan a la URL van a ser string, a menos qye se haga una configuracion previa en nest. El decorador Param se encarga de leer el segmento dinamico "id" (que está despues de /cars/ y que es obtenido por el decorador Get). Luego, se utiliza el Pipe ParseIntPipe para transformarlo a un numero. En caso de que pueda transformarlo a un numero, este, ya convertido a numero, se manda a la funcion getCarById, la cual lo recibe en el parametro "id" de dicha funcion. Si no puede convertilo a numero, se manda como respuesta a la peticion /cars/:id, el codigo de estado de error 400, sin ejecutar la funcion getCarById. Si se logra convertir a numero lo que está despues de /:id, se ejecuta la funcion getCarById para que trabaje con el parametro id tipo number y se manda al metodo findOneById de carsService.
    // console.log({ id });

    // throw new Error('Auxilio');// Genera una respuesta con codigo de estado 500

    return this.carsService.findOneById(+id);// con + convierto el string id (que puede ser "1") a un numero, es decir, pasamos de id = "1" a id = 1
  }

  @Post()
  createCar(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseIntPipe) id: number, // Recuperar el id que viene despues de /cars
    @Body() body: any,// Recuperar el body enviado a la peticion /cars/:id
  ) {
    return body;
  }

  @Delete(':id')
  deleteCar(
    @Param('id', ParseIntPipe) id: number// Recuperar el id que viene despues de /cars
  ) {
    return {
      method: 'DELETE',
      id,
    }
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
  // @UsePipes(ValidationPipe)
export class CarsController {

  constructor(
    private readonly carsService: CarsService,
  ){}


  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {// Todos los argumentos (incluso los query parameters y los segmentos) que pertenezcan a la URL van a ser string, a menos qye se haga una configuracion previa en nest. El decorador Param se encarga de leer el segmento dinamico "id" (que está despues de /cars/ y que es obtenido por el decorador Get). Luego, se utiliza el Pipe ParseUUIDPipe para validar que el valor de dicho segmento dinamico "id" sea un UUID. En caso que que sí sea un UUID, lo transforma a un string y despues lo manda al metodo funcion getCarById, la cual lo recibe en el parametro "id" de dicha funcion. Si no puede convertilo a string, se manda como respuesta a la peticion /cars/:id, el codigo de estado de error 400, sin ejecutar el metodo getCarById. Si se logra convertir a string lo que está despues de /:id, se ejecuta el metodo getCarById para que trabaje con el parametro id tipo string y se manda al metodo findOneById de carsService.
    console.log({ id });

    // throw new Error('Auxilio');// Genera una respuesta con codigo de estado 500

    return this.carsService.findOneById(id);// con + convierto el string id (que puede ser "1") a un numero, es decir, pasamos de id = "1" a id = 1
  }
    // getCarById(@Param('id', new ParseUUIDPipe({version: '4'}))


  @Post()
    // @UsePipes(ValidationPipe)
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string, // Recuperar el id que viene despues de /cars
    @Body() updateCarDto: UpdateCarDto,// Recuperar el body enviado a la peticion /cars/:id
  ) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  deleteCar(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.carsService.delete(id);
  }
}

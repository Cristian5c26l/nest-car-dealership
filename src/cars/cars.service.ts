import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla',
        // },
    ];
    
    findAll() {
        return this.cars;
    }

    findOneById(id: string) {// En este punto, el id es un numero. En caso de que car sea undefined, se lanza la excepcion NotFoundException, la cual hace que se tenga como respuesta a la peticion un codigo de error 404. Si el car existe o no es undefined, dicho car es la respuesta a la peticion la cual tendrá codigo de estado 200.
        const car = this.cars.find((car) => car.id === id);

        if (!car) throw new NotFoundException(`No car with id '${id}' found`);

        return car;
    }

    create(createCarDto: CreateCarDto) {

        const car = {
            id: uuid(),
            ...createCarDto,
        };
        
        this.cars.push(car);

        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        const carDB = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id != id)
            throw new BadRequestException(`Car id inside body and Car id inside URL are different`);

        const updatedCar = {
            ...carDB,// Esparcir todo el contenido que ya está del carro
            ...Object.fromEntries( Object.entries(updateCarDto).filter( ([_, value]) => value != undefined) ),// Sobreescribir el contenido ya esparcido POR el contenido que viene en updateCarDto (pero antes de ello, con Object.fromEntries, se eliminan las propiedades de updateCarDto que tengan como valor undefined) 
            id,// Sobreescribir el id para asegurarse de que sea un UUID
        }

        this.cars = this.cars.map((car) => car.id === id ? updatedCar : car);

        // console.log(updateCarDto);

        return updatedCar; //carro actualizado
    }

    delete(id: string) {
        const carDB = this.findOneById(id);

        this.cars = this.cars.filter((car) => car.id != id);// Filtrar el array de cars, de modo que se produzca un nuevo array que tenga puros carros con id's siferentes al id del carro que se quiere eliminar ("id" es el id del carro que se quiere eliminar)

        // return carDB; // Si no se retorna nada, nest no retorna undefined. Simplemente no retorna nada.
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}

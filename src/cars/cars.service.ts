import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 3,
            brand: 'Jeep',
            model: 'Cherokee',
        },
    ];
    
    findAll() {
        return this.cars;
    }

    findOneById(id: number) {// En este punto, el id es un numero. En caso de que car sea undefined, se lanza la excepcion NotFoundException, la cual hace que se tenga como respuesta a la peticion un codigo de error 404. Si el car existe o no es undefined, dicho car es la respuesta a la peticion la cual tendrá codigo de estado 200.
        const car = this.cars.find((car) => car.id === id);

        if (!car) throw new NotFoundException(`No car with id '${id}' found`);

        return car;
    }

}

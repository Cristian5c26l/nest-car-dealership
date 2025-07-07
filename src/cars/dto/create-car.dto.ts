import { IsString } from "class-validator";


export class CreateCarDto {

    // @IsString({message: 'brand must be a cool string (mensaje de respuesta modificado cuando brand no venga en el body de la peticion en cuestion (Post o Patch por ejemplo))'})
    @IsString()
    readonly brand: string;

    @IsString()
    // @MaxLength(3)
    readonly model: string;

}
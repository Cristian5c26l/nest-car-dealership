import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime(),
    // }
  ]

  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLowerCase(),
      createdAt: new Date().getTime(),
      
    }

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand)
      throw new NotFoundException(`Brand with id "${id}" not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    const brandDB = this.findOne(id);

    const updatedBrand = {
      ...brandDB, // Esparcir todo el contenido que ya está del brand
      ...Object.fromEntries(Object.entries(updateBrandDto).filter(([_, value]) => value != undefined)),// Sobreescribir el contenido ya esparcido POR el contenido que viene en updateBrandDto (pero antes de ello, con Object.fromEntries, se eliminan las propiedades de updateCarDto que tengan como valor undefined)
      updatedAt: new Date().getTime(),
      id,
    }

    this.brands = this.brands.map(brand => brand.id === id ? updatedBrand : brand);

    return updatedBrand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    this.brands = this.brands.filter(brand => brand.id !== id);
    return brand;
  }

  fillBrandsWithSeedData(brands: Brand[]) {
      this.brands = brands;
  }
}

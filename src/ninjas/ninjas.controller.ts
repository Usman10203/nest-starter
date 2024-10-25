import { Controller, Delete, Get, Post, Put, Query, Param, Body, NotFoundException, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';


@Controller('ninjas')
export class NinjasController {

    constructor(private readonly ninjasService: NinjasService) { }

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
        //const service = new NinjasService();
        //return service.getNinjas(weapon);
        return this.ninjasService.getNinjas(weapon);
    }

    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id: number) { //built in pipes used for data validation and data conversion 
        try {
            return this.ninjasService.getNinja(id);
        } catch (error) {

            throw new NotFoundException();
        }

        // return {
        //     id
        // };
    }

    @Post()
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
        // return {
        //     name: createNinjaDto.name
        // };
        return this.ninjasService.createNinja(createNinjaDto);
    }

    @Put(':id')
    updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
        // return { id };
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }

    @Delete(':id')
    deleteNinja(@Param('id') id: string) {
        return this.ninjasService.removeNinja(+id);
    }

}

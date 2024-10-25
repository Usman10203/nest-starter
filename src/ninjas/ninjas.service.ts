import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
@Injectable()
//Services functions contain all the logic
export class NinjasService {
    private ninjas = [
        { id: 1, name: "Ninja1", weapon: "stars" },
        { id: 2, name: "Ninja2", weapon: "nunchucks" },
    ];

    getNinjas(weapon?: 'stars' | 'nunchucks') {
        //returns ninjas based on weapons else returns all
        if (weapon) {
            return this.ninjas.filter((ninja) => ninja.weapon === weapon);
        }
        return this.ninjas;
    }

    getNinja(id: number) {
        const ninja = this.ninjas.find((ninja) => ninja.id === id);
        if (!ninja) {
            throw new Error('Ninja not found');
        }
        return ninja;
    }

    createNinja(createNinjaDto: CreateNinjaDto) {
        if (!createNinjaDto.weapon) {
            throw new BadRequestException('Weapon is required');
        }
        const newNinja = {
            ...createNinjaDto,
            id: Date.now(),
        }
        this.ninjas.push(newNinja);
        return newNinja;
    }

    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
        // const ninja = this.getNinja(id);
        this.ninjas = this.ninjas.map((ninja) => {
            if (ninja.id === id) {
                return { ...ninja, ...updateNinjaDto };
            }
            //return ninja;
            console.log(ninja)
        });
        return this.getNinja(id);
    }


    removeNinja(id: number) {
        const toBeRemoved = this.getNinja(id);
        this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
        return toBeRemoved
        // const index = this.ninjas.findIndex((ninja) => ninja.id === id);
        // if (index === -1) {
        //     throw new Error('Ninja not found');
        // }
        // this.ninjas.splice(index, 1);
        // return this.ninjas;
    }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal'

export default class AnimalesController {
    public async getAnimales(): Promise<Animal[]>{
        const user = await Animal.all()
        return user
    }

    public async setRegistrarAnimales({request,response}: HttpContextContract){
        const dataAnimal = request.only([
            'codigo_animal','nombre_animal','especie','raza','genero','edad'
        ])
        try{
            const codigoAnimal = dataAnimal.codigo_animal;
            const animalExistente: Number = await this.getValidarAnimalExistente(codigoAnimal)
            if(animalExistente === 0){
                await Animal.create(dataAnimal)
                response.status(200).json({"msg": "Registro completado con exito"})
            } else {
                response.status(400).json({"msg": "El codigo animal se encuentra registrado"})
            }
        } catch(error){
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor"})
        }
    }

    public async buscarPorId({request}: HttpContextContract){
        const id = request.param('id')
        const user = await Animal.find(id);
        return user
    }

    public async actualizarAnimal({request}: HttpContextContract){
        const id = request.param('id');
        const animal = await Animal.findOrFail(id)
        const datos = request.all();
      
            animal.nombre_animal = datos.nombre_animal
            animal.especie = datos.especie,
            animal.raza = datos.raza,
            animal.genero = datos.genero,
            animal.edad = datos.edad,
            await animal.save();
        return {"mensaje":"Actualizado correctamente","estado":200};

    }

    public async eliminarAnimal({request}: HttpContextContract){
        const id = request.param('id');
        await Animal.query().where('codigo_animal', id).delete();
        return("Registro eliminado")
    }

    public async filtroPorNombre({request}: HttpContextContract){
        const search = request.param('search')
        const animals = await Animal.query().where('nombre_animal', 'like', `${search}%`)
        return(animals)
    }

    public async filtroPorEspecie({request}: HttpContextContract){
        const especie = request.param('especie')
        const animals = await Animal.query().where('especie', especie)
        return(animals)
    }


    public async filtroMenores8Anos(){
        const animals = await Animal.query().where('edad', '<', 8)
        return(animals)
    }

    private async getValidarAnimalExistente(codigo_animal: Number): Promise<Number>{
        const total = await Animal.query().where({"codigo_animal":codigo_animal}).count('*').from('animals')
        return parseInt(total[0]["count(*)"])
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cliente from "App/Models/Cliente";


export default class ClientesController {
    public async getClientes(): Promise<Cliente[]>{
        const client = await Cliente.all()
        return client
    }

    public async setRegistrarClientes({request,response}: HttpContextContract){
        const dataCliente = request.only([
            'cedula','nombre','apellido','correo','telefono'
        ])
        try{
            const cedulaCliente = dataCliente.cedula;
            const ClienteExistente: Number = await this.getValidarClienteExistente(cedulaCliente)
            console.log(ClienteExistente)
            if(ClienteExistente === 0){
                await Cliente.create(dataCliente)
                response.status(200).json({"msg": "Registro completado con exito"})
            } else {
                response.status(400).json({"msg": "El codigo Cliente se encuentra registrado"})
            }
        } catch(error){
            console.log(error)
            response.status(500).json({"msg": "Error en el servidor"})
        }
    }

    public async actualizarCliente({request}: HttpContextContract){
        const cedula = request.param('cedula');
        const client = await Cliente.findOrFail(cedula)
        const datos = request.all();
            
            client.nombre = datos.nombre,
            client.apellido = datos.apellido,
            client.telefono= datos.telefono,
            client.correo = datos.correo,
            await client.save();
        return {"mensaje":"Actualizado correctamente","estado":200};

    }

    public async eliminarCliente({request}: HttpContextContract){
        const cedula = request.param('cedula');
        await Cliente.query().where('cedula', cedula).delete();
        return("Registro eliminado")
    }
        
    private async getValidarClienteExistente(cedula: string): Promise<Number>{
        const total = await Cliente.query().where({"cedula":cedula}).count('*').from('clientes')
        console.log(total)
        return parseInt(total[0]["count"])
    }   
}


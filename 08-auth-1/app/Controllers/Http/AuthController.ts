// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class AuthController {
    public async register({request,auth}){
        const name = request.input('name');
        const email = request.input('email');
        const password = request.input('password');
        const user = new User();

        user.name = name;
        user.email = email;
        user.password = password;
        await user.save();

        const token = await auth.use('api').login(user,{
            expiresIn: '30 mins'
        });

        return{
            token,
            "msg": "Usuario registrado con exito"
        }
    }

    public async login({request,auth,response}){

        const email = request.input('email');
        const password = request.input('password');
        try{
            const token = await auth.use('api').attempt(email,password,{
                expiresIn: '30 mins'
            });

            return{
                token,
                "msg": "Usuario logueado con exito"
            }
        }catch(error){
             return response.unauthorized('Credenciales invalidas')
        }
    }
}

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/listar-animales', 'AnimalesController.getAnimales')
  Route.get('/listar-especie/:especie', 'AnimalesController.filtroPorEspecie')
  Route.get('/listar-menores-8-anos', 'AnimalesController.filtroMenores8Anos')
  Route.get('/buscar-id/:id','AnimalesController.buscarPorId')
  Route.get('/filtrar-animal/:search','AnimalesController.filtroPorNombre')

  Route.post('/registro-animales','AnimalesController.setRegistrarAnimales')

  Route.put('/actualizar-animal/:id','AnimalesController.actualizarAnimal')

  Route.delete('/eliminar-animal/:id','AnimalesController.eliminarAnimal')
}).prefix('/api/v2')

// Route.get('/', async () => {
//   return { hello: 'world' }
// })

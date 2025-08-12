import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler
} from './user.controller';

export default async function userRoutes(app: FastifyInstance) {
  app.post('/usuario', createUserHandler);
  app.get('/usuarios', getAllUsersHandler);
  app.get('/usuario/:id', getUserByIdHandler);
  app.patch('/Attusuarios/:id', updateUserHandler);
  app.delete('/deleteUsuario/:id', deleteUserHandler);
}

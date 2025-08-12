import { FastifyReply, FastifyRequest } from 'fastify';
import { userSchema } from './user.schema';
import * as userService from './user.service';
import { z } from 'zod';

export async function createUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = userSchema.parse(request.body);
    const result = await userService.createUser(data);

    if ('error' in result) return reply.status(409).send(result);
    return reply.status(201).send(result);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'Erro de validação.' });
    }
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

export async function getAllUsersHandler(_, reply: FastifyReply) {
  const users = await userService.getAllUsers();
  return reply.status(200).send(users);
}

export async function getUserByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as any;
  const user = await userService.getUserById(parseInt(id));
  if (!user) return reply.status(404).send({ error: 'Usuário não encontrado' });
  return reply.status(200).send(user);
}

export async function updateUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const data = userSchema.parse(request.body);
    const updated = await userService.updateUser(parseInt(id), data);
    return reply.status(200).send(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'Erro de validação.' });
    }
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

export async function deleteUserHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const deleted = await userService.deleteUser(parseInt(id));
    return reply.status(200).send(deleted);
  } catch (err: any) {
    if (err.code === 'P2025') return reply.status(404).send({ error: 'Usuário não encontrado' });
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

import { FastifyReply, FastifyRequest } from 'fastify';
import { postSchema } from './post.schema';
import * as postService from './post.service';
import { z } from 'zod';

export async function createPostHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const data = postSchema.parse(request.body);
    const post = await postService.createPost(data);
    if (!post) return reply.status(404).send({ error: 'Usuário não cadastrado' });
    return reply.status(201).send(post);
  } catch (err) {
    if (err instanceof z.ZodError) return reply.status(400).send({ error: 'Erro de validação.' });
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

export async function getAllPostsHandler(_, reply: FastifyReply) {
  const posts = await postService.getAllPosts();
  return reply.status(200).send(posts);
}

export async function getPostByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as any;
  const post = await postService.getPostById(parseInt(id));
  if (!post) return reply.status(404).send({ error: 'Post não encontrado' });
  return reply.status(200).send(post);
}

export async function getPostsByUserHandler(request: FastifyRequest, reply: FastifyReply) {
  const { userId } = request.params as any;
  const posts = await postService.getPostsByUser(parseInt(userId));
  return reply.status(200).send(posts);
}

export async function updatePostHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const data = postSchema.parse(request.body);
    const updated = await postService.updatePost(parseInt(id), data);
    return reply.status(200).send(updated);
  } catch (err: any) {
    if (err.code === 'P2025') return reply.status(404).send({ error: 'Post não encontrado' });
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

export async function deletePostHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = request.params as any;
    const deleted = await postService.deletePost(parseInt(id));
    return reply.status(200).send(deleted);
  } catch (err: any) {
    if (err.code === 'P2025') return reply.status(404).send({ error: 'Post não encontrado' });
    return reply.status(500).send({ error: 'Erro interno no servidor.' });
  }
}

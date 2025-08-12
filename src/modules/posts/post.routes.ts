import { FastifyInstance } from 'fastify';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  getPostsByUserHandler,
  updatePostHandler,
  deletePostHandler
} from './post.controller';

export default async function postRoutes(app: FastifyInstance) {
  app.post('/post', createPostHandler);
  app.get('/posts', getAllPostsHandler);
  app.get('/post/:id', getPostByIdHandler);
  app.get('/leituraPostUser/:userId', getPostsByUserHandler);
  app.patch('/attPosts/:id', updatePostHandler);
  app.delete('/deletePosts/:id', deletePostHandler);
}

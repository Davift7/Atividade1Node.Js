import Fastify from 'fastify';
import userRoutes from './modules/users/user.routes';
import postRoutes from './modules/posts/post.routes';

const app = Fastify();

app.register(userRoutes);
app.register(postRoutes);

export default app;

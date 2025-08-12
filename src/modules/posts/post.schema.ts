import { z } from 'zod';

export const postSchema = z.object({
  titulo: z.string().min(1, 'O nome é obrigatório.'),
  conteudo: z.string().min(1, 'O conteudo é obrigatório.'),
  userId: z.number().int()
});

import { z } from 'zod';

export const userSchema = z.object({
  nome: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  foto: z.string().url('URL da foto inválida.').optional(),
});

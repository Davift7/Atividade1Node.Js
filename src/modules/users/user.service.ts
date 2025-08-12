import prisma from '../../plugins/prisma';
import bcrypt from 'bcrypt';

export async function createUser(data: any) {
  const usuarioExistente = await prisma.user.findUnique({
    where: { email: data.email }
  });
  if (usuarioExistente) {
    return { error: 'E-mail já cadastrado.' };
  }

  const hashedPassword = await bcrypt.hash(data.senha, 10);

  const novoUsuario = await prisma.user.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      foto: data.foto,
    },
  });

  return {
    id: novoUsuario.id,
    nome: novoUsuario.nome,
    email: novoUsuario.email,
    foto: novoUsuario.foto
  };
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: number, data: any) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}

import prisma from '../../plugins/prisma';

export async function createPost(data: any) {
  const userJaCriado = await prisma.user.findUnique({
    where: { id: data.userId }
  });

  if (!userJaCriado) return null;

  return prisma.post.create({
    data: {
      titulo: data.titulo,
      conteudo: data.conteudo,
      userId: data.userId
    }
  });
}

export async function getAllPosts() {
  return prisma.post.findMany({ include: { user: true } });
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: { user: true }
  });
}

export async function getPostsByUser(userId: number) {
  return prisma.post.findMany({
    where: { userId },
    include: { user: true }
  });
}

export async function updatePost(id: number, data: any) {
  return prisma.post.update({ where: { id }, data });
}

export async function deletePost(id: number) {
  return prisma.post.delete({ where: { id } });
}

import app from './app';

app.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando na porta 3000`);
});

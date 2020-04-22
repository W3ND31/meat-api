import { Server } from "./server/server";

const server = new Server();

server
  .bootstrap()
  .then((server) => {
    console.log(`O servidor está escutando na porta ${server.application.address().port}`);
  })
  .catch((error) => {
    console.log("Falha no server!");
    console.error(error);
    process.exit(1);
  });

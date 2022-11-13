const WebSocket = require("ws");

const server = new WebSocket.WebSocketServer({
  port: 3001,
});

const onError = (ws, error) => {
  console.log("ERRO FATAL!", error);
};

const getDateTime = () => {
  const dataAtual = new Date();
  return dataAtual.toLocaleString("pt-br") + " (" + dataAtual.getTime() + ")";
};

const onMessage = (ws, data) => {
  const retorno = `DATA/HORA SERVIDOR: ${getDateTime()}\nCONTEÚDO: ${data.toString()}`;
  ws.send(retorno);
};

server.on("connection", (ws) => {
  console.log("CONEXÃO ESTABELECIDA COM O CLIENTE!");

  ws.on("message", (data) => onMessage(ws, data));
  ws.on("error", (error) => onError(ws, error));
});

server.on("close", () => console.log("CONEXÃO FINALIZADA COM O CLIENTE!"));

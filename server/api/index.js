const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const getDateTime = () => {
  const dataAtual = new Date();
  return dataAtual.toLocaleString("pt-br") + " (" + dataAtual.getTime() + ")";
};

app.post("/", (req, res) => {
  const retorno = `DATA/HORA SERVIDOR: ${getDateTime()}\nCONTEÚDO: ${
    req.body.conteudo
  }`;

  res.send(retorno);
});

app.listen(3000);

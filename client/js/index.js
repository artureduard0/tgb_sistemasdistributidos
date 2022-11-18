$(document).ready(() => {
  const getDateTime = () => {
    const dataAtual = new Date();
    return dataAtual.toLocaleString("pt-br") + " (" + dataAtual.getTime() + ")";
  };

  const atualizarRequisicoes = (conteudo) => {
    const tRequisicoes = $("#tRequisicoes");
    const textoAtualizado =
      tRequisicoes.text() +
      `DATA/HORA CLIENTE: ${getDateTime()}\n` +
      `CONTEÚDO CLIENTE: ${conteudo}\n\n`;

    tRequisicoes.text(textoAtualizado);
  };

  const atualizarRespostas = (conteudo) => {
    const tRespostas = $("#tRespostas");
    const textoAtualizado =
      tRespostas.text() +
      `DATA/HORA CLIENTE: ${getDateTime()}\n` +
      `${conteudo}\n\n`;

    tRespostas.text(textoAtualizado);
  };

  const onOpenWs = (nroRepeticoes, conteudo, ws) => {
    console.log("CONEXÃO ESTABELECIDA COM O SERVIDOR!");

    for (let i = 0; i < nroRepeticoes; i++) {
      atualizarRequisicoes(conteudo);
      ws.send(conteudo);
    }
  };

  const onMessageWs = (event) => {
    atualizarRespostas(event.data);
  };

  const sendWithWs = (nroRepeticoes, conteudo) => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.addEventListener("open", () => onOpenWs(nroRepeticoes, conteudo, ws));
    ws.addEventListener("message", (event) => onMessageWs(event));
    ws.addEventListener("error", () =>
      alert("Erro ao se conectar com o websocket server!")
    );
  };

  const sendWithAjax = (nroRepeticoes, conteudo) => {
    for (let i = 0; i < nroRepeticoes; i++) {
      atualizarRequisicoes(conteudo);

      $.ajax({
        url: "http://localhost:3000/",
        type: "POST",
        data: {
          conteudo,
        },
      })
        .done(function (data) {
          atualizarRespostas(data);
        })
        .fail(function () {
          alert("Erro ao se conectar com a API.");
        });
    }
  };

  $("#btnEnviar").on("click", () => {
    const tipoReq = $("input[name='rTipoReq']:checked").data("tipo");
    const nroRepeticoes = parseInt($("#iRepeticoes").val());
    const conteudo = $("#taConteudo").val();

    if (tipoReq === "websocket") {
      sendWithWs(nroRepeticoes, conteudo);
    } else {
      sendWithAjax(nroRepeticoes, conteudo);
    }
  });

  $("#btnLimpar").on("click", () => {
    $("#iRepeticoes").val(1);
    $("#taConteudo").val("");
    $("#tRequisicoes").text("");
    $("#tRespostas").text("");
  });
});

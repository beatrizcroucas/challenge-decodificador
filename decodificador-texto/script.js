
const textoInput = document.getElementById("input");
const btnCriptografar = document.querySelector(".botao-cripto");
const btnDescriptografar = document.querySelector(".botao-descripto");
const resultadoElement = document.querySelector(".texto-criptografado");
const textoCriptografado = document.querySelector(".txt-cripto");
const botaoCopiar = document.querySelector(".botao-copiar"); 
const imagem = document.querySelector(".direita-imagem");
const direitaTitulo = document.querySelector(".direita-titulo");
const direitaParagrafo = document.querySelector(".direita-paragrafo");

//Botão para criptografar
btnCriptografar.addEventListener("click", () => {
  const texto = textoInput.value;
  resultadoElement.textContent = "";

  if (texto) {
    const textoCriptografado = criptografarTexto(texto);

    // Esconder elementos desnecessários
    imagem.style.display = "none";
    direitaTitulo.style.display = "none";
    direitaParagrafo.style.display = "none";

    resultadoElement.textContent = textoCriptografado;
    resultadoElement.style.display = "flex"; // Mostre o resultado
    botaoCopiar.style.display = "flex"; // Mostre o botão copiar
  }
});

//Botão para descriptografar
btnDescriptografar.addEventListener("click", () => {
  const texto = textoInput.value;
  resultadoElement.textContent = "";

  if (texto) {
    const textoDescriptografado = descriptografarTexto(texto);

    if (textoDescriptografado === "") {
      document.getElementById("erro").innerHTML = "Erro: O texto deve conter apenas palavras criptografadas";
      imagem.style.display = "block";
      direitaTitulo.style.display = "block";
      direitaParagrafo.style.display = "block";
      botaoCopiar.style.display = "none";
    } else {
      // Mostra o resultado da descriptografia
      resultadoElement.textContent = textoDescriptografado;
      resultadoElement.style.display = "flex"; // Mostre o resultado
      botaoCopiar.style.display = "flex";
      imagem.style.display = "none";
      direitaTitulo.style.display = "none";
      direitaParagrafo.style.display = "none";
    }
  }
});

//Realiza a criptografia
function criptografarTexto(texto) {
  const mapaCriptografia = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o: 'ober',
    u: 'ufat'
  };

  // Verifica se o texto contém apenas letras minúsculas e sem acento
  if (!/^[a-z]+$/.test(texto)) {
    document.getElementById("erro").innerHTML = "Erro: O texto deve conter apenas letras minúsculas e sem acento";
    document.getElementById("copiar").style.display = "none"; // Esconder o botão copiar
    document.getElementById("imagem").style.display = "block"; // Mostrar a imagem
    document.getElementById("nenhum-mensagem").style.display = "block"; // Mostrar o "nenhuma mensagem encontrada"
    document.getElementById("paragrafo").style.display = "block"; // Mostrar o parágrafo
    return "";
  }

  // Verifica se o texto contém acento ou letra maiúscula
  if (/[ÁÀÃÂÉÈÊÍÌÎÓÒÕÔÚÙÛ]/.test(texto) || /[A-Z]/.test(texto)) {
    document.getElementById("erro").innerHTML = "Erro: O texto deve conter apenas letras minúsculas e sem acento";
    document.getElementById("copiar").style.display = "none"; // Esconder o botão copiar
    document.getElementById("imagem").style.display = "block"; // Mostrar a imagem
    document.getElementById("nenhum-mensagem").style.display = "block"; // Mostrar o "nenhuma mensagem encontrada"
    document.getElementById("paragrafo").style.display = "block"; // Mostrar o parágrafo
    return "";
  }

  return texto.replace(/[eiaou]/gi, match => mapaCriptografia[match.toLowerCase()]);
}

//Realiza a descriptografia
function descriptografarTexto(texto) {
  const mapaDescriptografia = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober: 'o',
    ufat: 'u'
  };

  let textoDescriptografado = texto;

  try {
    textoDescriptografado = texto.replace(/(enter|imes|ai|ober|ufat)/gi, match => mapaDescriptografia[match]);
  } catch (error) {
    document.getElementById("erro").innerHTML = "Erro: O texto deve conter apenas palavras criptografadas";
    document.getElementById("copiar").style.display = "none"; // Esconder o botão copiar
    document.getElementById("imagem").style.display = "block"; // Mostrar a imagem
    document.getElementById("nenhum-mensagem").style.display = "block"; // Mostrar o "nenhuma mensagem encontrada"
    document.getElementById("paragrafo").style.display = "block"; // Mostrar o parágrafo
    return "";
  }

  return textoDescriptografado;
}

//Botão para copiar
botaoCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(resultadoElement.textContent)
   .then(() => {
      console.log("Texto copiado para a área de transferência");
    })
   .catch(err => {
      console.error("Falha ao copiar o texto:", err);
    });
});
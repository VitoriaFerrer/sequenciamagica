document.addEventListener("DOMContentLoaded", () => {
    const hoje = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit", month: "short", year: "numeric"
    });
    document.getElementById("data-dia").innerText = `DIA ${hoje.toUpperCase()}`;
    carregarSequenciasAnteriores();
  
    document.querySelectorAll(".item").forEach(el => {
      el.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/html", e.target.innerHTML);
      });
    });
  });
  
  function soltar(e) {
    const data = e.dataTransfer.getData("text/html");
    const novo = document.createElement("div");
    novo.innerHTML = data;
    novo.className = "item";
    document.getElementById("area-sequencia").appendChild(novo);
  }
  
  function salvarSequencia() {
    const hoje = new Date().toLocaleDateString("pt-BR");
    const conteudo = document.getElementById("area-sequencia").innerHTML;
    localStorage.setItem(`sequencia-${hoje}`, conteudo);
    alert("Sequência salva com sucesso!");
    carregarSequenciasAnteriores();
  }
  
  function carregarSequenciasAnteriores() {
    const lista = document.getElementById("anteriores-lista");
    lista.innerHTML = "";
  
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("sequencia-")) {
        const data = key.replace("sequencia-", "");
        const btn = document.createElement("div");
        btn.innerText = `DIA ${data}`;
        btn.classList.add("btn-sequencia"); // <- classe CSS adicionada aqui
        btn.onclick = () => {
          document.getElementById("area-sequencia").innerHTML = localStorage.getItem(key);
        };
        lista.appendChild(btn);
      }
    });
  }
  
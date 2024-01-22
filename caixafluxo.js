function funcoescaixa(){
    adicionarProduto();

    historicocaixa();

    BDreq("caixa", "caixaDB.php");
}

function BDreq (a,b){
    const form = document.querySelector(`#${a} form`);
    const dados = new FormData(form);

    fetch(b,{
        method: 'POST', body: dados
    })

}

function buscar() {
    var code = document.getElementById("code").value;

    // Fazer uma requisição AJAX para o servidor (PHP)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Processar a resposta do servidor
            var data = JSON.parse(xhr.responseText);
            preencherCampos(data);
        }
    };
    xhr.open("GET", "buscar_dados.php?code=" + code, true);
    xhr.send();
}

function preencherCampos(data) {
    if (data) {
        document.getElementById("produto").value = data.produto;
        document.getElementById("valor").value = data.valor;
        // Preencha outros campos conforme necessário
    } else {
        alert("Nenhum resultado encontrado para o código fornecido.");
    }
}

function adicionarProduto() {
    
    var code = document.getElementById("code").value;
	var produto = document.getElementById("produto").value;
    var quantidade = document.getElementById("quantidade").value;
	var desconto = document.getElementById("desconto").value;
	var valor = document.getElementById("valor").value;
	var tabela = document.getElementById("tabelaProdutos");
	var newRow = tabela.insertRow(1);
	var cell1 = newRow.insertCell(0);
	var cell2 = newRow.insertCell(1);
	var cell3 = newRow.insertCell(2);
	var cell4 = newRow.insertCell(3);
	var cell5 = newRow.insertCell(4);
	var cell6 = newRow.insertCell(5);
    var cell7 = newRow.insertCell(6);
	cell1.innerHTML = code;
	cell2.innerHTML = produto;
	cell3.innerHTML = quantidade;
	cell4.innerHTML = valor;
    cell5.innerHTML = desconto;

	// Calcular o total (preço - desconto)
	var valortotal = (valor*quantidade) - desconto;
	cell6.innerHTML = valortotal;

	// Adicionar botão para limpar a linha
	var btnLimparLinha = document.createElement("button");
	btnLimparLinha.innerHTML = "Limpar Linha";
	btnLimparLinha.onclick = function () {
    tabela.deleteRow(newRow.rowIndex);}
	cell7.appendChild(btnLimparLinha);
			}

function historicocaixa(){
    var acao = "compra no caixa";
	var usuario = "1";
    var datahora = new Date().toLocaleString();
	var tabelahist = document.getElementById("tabhistorico");
	var newRowhist = tabelahist.insertRow(1);
    var cellhist2 = newRowhist.insertCell(0);
	var cellhist3 = newRowhist.insertCell(1);
	var cellhist4 = newRowhist.insertCell(2);
	
	cellhist2.innerHTML = acao;
	cellhist3.innerHTML = usuario;
	cellhist4.innerHTML = datahora;
    console.log("foi");
    
}

function finalizarCompra() {
    var tabela = document.getElementById("tabelaProdutos");
    var total = 0;

    // Somar os valores na coluna "Total"
    for (var i = 1; i < tabela.rows.length; i++) {
        total += parseFloat(tabela.rows[i].cells[4].innerHTML);
    }

     // Exibir o valor total
	document.getElementById("totalCompra").innerHTML = "Valor Total de Compra: " + total.toFixed(2);
}
function apagarCaixa() {
    // Obtém a referência da tabela
    var tabela = document.getElementById("tabelaProdutos");

    // Obtém o número de linhas na tabela
    var numeroLinhas = tabela.rows.length;

    // Loop reverso para excluir as linhas, começando do final para evitar problemas de índice
    for (var i = numeroLinhas - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }
    BDreq("totalCompra", "zera_id.php");

}
function adicionarestoque() {

    BDreq("estoque","estoqueDB.php");

}          

function adicionarLinha() {
    // Fazer uma requisição AJAX para o servidor (PHP)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Processar a resposta do servidor
            var data = JSON.parse(xhr.responseText);
            preencherTabela(data);
        }
    };
    xhr.open("GET", "carregardoestoque.php", true);
    xhr.send();
}
function ocultarestoque(){
    var limpa = document.querySelector("#entradaestoque tbody");
    limpa.innerHTML = ""; // Limpar a tabela antes de preencher

}
function preencherTabela(data) {
    var tbody = document.querySelector("#entradaestoque tbody");
    tbody.innerHTML = ""; // Limpar a tabela antes de preencher

    if (data.length > 0) {
        data.forEach(function (row) {
            var newRow = tbody.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            
            cell1.innerHTML = row.code;
            cell2.innerHTML = row.produto;
            cell3.innerHTML = row.quantidadeE;
            cell4.innerHTML = row.valor;
            cell5.innerHTML = row.valortotal;
            // Adicione outras células conforme necessário
        });
    } else {
        alert("Nenhum dado encontrado.");
    }
	// Adicionar botão para limpar a linha
	var btnLimparLinha = document.createElement("button");
	btnLimparLinha.innerHTML = "Limpar Linha";
	btnLimparLinha.onclick = function () {
    tabela.deleteRow(newRow.rowIndex);}
	cell6.appendChild(btnLimparLinha);
}          
function apagarEstoque() {
    // Obtém a referência da tabela
    var tabela = document.getElementById("entradaestoque");

    // Obtém o número de linhas na tabela
    var numeroLinhas = tabela.rows.length;

    // Loop reverso para excluir as linhas, começando do final para evitar problemas de índice
    for (var i = numeroLinhas - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }
    BDreq("estoque","apagarestoque.php");
}          
 function limparFormulario() {
            document.getElementById('estoquefor').reset();
}
        
function login() {        
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
        
    // Substitua as condições abaixo com suas próprias regras de autenticação
    if (username === '1' && password === '1') {
        lgin = true;
        document.getElementById('formLogin').style.display = 'none';
        document.getElementsByClassName('tab-container').style.display = 'block';
               
        return false; // Impedir o envio do formulário padrão
    } else {
        alert('Usuário ou senha incorretos. Tente novamente.');
        return false; // Impedir o envio do formulário padrão
        }
}       
function logout() {
            lgin = false;
            document.getElementById('formLogin').style.display = 'block';
            document.getElementById('main').style.display = 'none';
			document.getElementById("username").value = '';
            document.getElementById('password').value = '';
}
function openTab(tabName) {
            var i;
            var tabContent = document.getElementsByClassName('tab-content');
            for (i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none';
            }

            var tabs = document.getElementsByClassName('tab');
            for (i = 0; i < tabs.length; i++) {
                tabs[i].style.backgroundColor = '#ddd';
            }

            document.getElementById(tabName).style.display = 'block';
            document.querySelector('[onclick="openTab(\'' + tabName + '\')"]').style.backgroundColor = '#ccc';
}
        
    
        
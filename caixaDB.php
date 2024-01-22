<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "caixa";

$conn = new mysqli ($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
die("Conexão falhou: " . $conn->connect_error);
}
// Obter os dados do formulário
// Obter os dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$code = $_POST['code'];
$produto = $_POST['produto'];
$quantidade = $_POST['quantidade'];
$valor = $_POST['valor'];
$desconto = $_POST['desconto'];
$valortotal = $valor *$quantidade - $desconto;

$sql = "INSERT INTO tabela_vendas (code, produto, quantidade, valor, desconto, valortotal) VALUES ('$code','$produto','$quantidade','$valor','$desconto','$valortotal')";

if ($conn->query($sql) === TRUE) {
    echo "Registro inserido com sucesso!";
} else {
    echo "Erro ao inserir registro: " . $conn->error;
}
}
$conn->close();
?> 
<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "estoque";

$conn = new mysqli ($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
die("Conexão falhou: " . $conn->connect_error);
}
// Obter os dados do formulário
// Obter os dados do formulário
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $code = $_POST['codigo'];
    $produto = $_POST['descricao'];
    $quantidadeE = $_POST['quantidadeE'];
    $valor = $_POST['preco'];
    $valortotal = $valor * $quantidadeE;
    
    $sql = "INSERT INTO estoque (code, produto, quantidadeE, valor,valortotal) VALUES ('$code', '$produto', '$quantidadeE', '$valor','$valortotal')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Registro inserido com sucesso!";
    } else {
        echo "Erro ao inserir registro: " . $conn->error;
    }
    }
    $conn->close();
    ?> 





?>
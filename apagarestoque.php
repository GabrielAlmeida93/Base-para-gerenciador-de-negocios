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
// Passo 1: DELETAR DADOS DA TABELA
if ($_SERVER["REQUEST_METHOD"] == "POST") {
$query1 = "DELETE FROM estoque";
}
if ($conn->query($query1) === TRUE) {
    echo "AUTO_INCREMENT removida com sucesso.<br>";
} else {
    echo "Erro ao remover AUTO_INCREMENT: " . $conn->error . "<br>";
}
//RESETAR O AUTO INCREMENTO EM 1
$query2 = "ALTER TABLE estoque AUTO_INCREMENT = 1";
if ($conn->query($query2) === TRUE) {
    echo "Valores da coluna 'id' atualizados com sucesso.<br>";
} else {
    echo "Erro ao atualizar valores da coluna 'id': " . $conn->error . "<br>";
}
/// Passo 3: Restaurar a AUTO_INCREMENT
/*$query3 = "ALTER TABLE tabela_vendas MODIFY id INT AUTO_INCREMENT";
if ($conn->query($query3) === TRUE) {
    echo "AUTO_INCREMENT restaurada com sucesso.<br>";
} else {
    echo "Erro ao restaurar AUTO_INCREMENT: " . $conn->error . "<br>";
}
*/

//FECHAR CONEXAO
$conn->close();
?>
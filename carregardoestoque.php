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
$sql = "SELECT * FROM estoque";
$result = mysqli_query($conn, $sql);

$data = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

echo json_encode($data);

mysqli_close($conn);
?>
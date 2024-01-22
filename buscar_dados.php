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

if (isset($_GET['code'])) {
    $code = $_GET['code'];

    $sql = "SELECT * FROM estoque WHERE code = '$code'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo json_encode(null);
    }
} else {
    echo json_encode(null);
}

mysqli_close($conn);
?>

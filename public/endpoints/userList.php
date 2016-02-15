<?php 
    include("../config.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $userInfo = $db->prepare("SELECT * FROM users WHERE email!='$email'");  
    $userInfo->execute();
    $result = $userInfo->fetchAll();
    echo json_encode($result);
?>
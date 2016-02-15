<?php 
    include("../config.php");
    $data = json_decode(file_get_contents("php://input"));
    $rEmail = $data->rEmail;
    $sEmail = $data->sEmail;
    $rBalance = $data->rBalance;
    $sBalance = $data->sBalance;
    $q = "UPDATE users SET balance=:balance WHERE email=:email";
    $query = $db->prepare($q);
    $execute = $query->execute(array(
        ":email" => $rEmail,
        ":balance" => $rBalance
    ));
    $execute = $query->execute(array(
        ":email" => $sEmail,
        ":balance" => $sBalance
    ));
?>
<?php 
    include("../config.php");
    $data = json_decode(file_get_contents("php://input"));
    $password = md5($data->password);
    $email = $data->email;
    $userInfo = $db->query("SELECT email FROM users WHERE email='$email' AND password='$password'");
    $userInfo = $userInfo->fetchAll();
	if (count($userInfo) == 1){
        echo $email;
	} else {
	   echo "ERROR";
	}
?>
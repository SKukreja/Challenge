<?php 
    include("../config.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $userInfo = $db->query("SELECT * FROM users WHERE email='$email'");  
    $userInfo = $userInfo->fetchAll();
	if (count($userInfo) == 1){
        echo "EXISTS";
	} else {
	   echo "NONE";
	}
?>
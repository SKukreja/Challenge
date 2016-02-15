<?php 
    //Retrieve database credentials and information
    include("../config.php");
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $fname = $data->fname;
    $lname = $data->lname;
    $password = $data->password;
    $q = "INSERT INTO users (email, fname, lname, balance, password) VALUES (:email, :fname, :lname, 100.00, :password)";
    $query = $db->prepare($q);
    $execute = $query->execute(array(
        ":email" => $email,
        ":fname" => $fname,
        ":lname" => $lname,
        ":password" => md5($password)
    ));
    echo $email;
?>
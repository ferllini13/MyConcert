<?php

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://localhost:8100");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

$file = $_FILES["file"]["name"];

if(!is_dir("files/"))
	mkdir("files/", 0777);

if($file && move_uploaded_file($_FILES["file"]["tmp_name"], "files/".$file))
{
	echo $file;
}


?>
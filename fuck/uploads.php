<?php
if(isset($_FILES['file'])){
	$file_name = $_POST['file_name'].'.'.$_POST['file_type'];
	move_uploaded_file($_FILES['file']['tmp_name'],"../uploads/".$file_name);
	echo "ok";
}
<?php
session_start();

$filename = $_GET['filename'];
if(in_array($filename, $_SESSION['uploaded_files']))
{
	@unlink('../upload/'.$filename);
} else{ echo 'nok';}
?>
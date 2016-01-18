<?php
	if($_POST){
		$to = 'fabtoussaint@gmail.com';/*Put Your Email Address Here*/
		$subject = $_POST['subject'];
		$from_name = $_POST['name'];
		$from_email = $_POST['email'];
		$message = $_POST['message'];
		$header = "From: $from_name <$from_email>";
		mail($to, $subject, $message, $header);
					
				
			
	}
?>
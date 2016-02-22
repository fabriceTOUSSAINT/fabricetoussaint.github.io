<?php
require 'PHPMailer-master/PHPMailerAutoload.php';
$mail = new PHPMailer;


$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mailsendthrowaway@gmail.com';                 // SMTP username
$mail->Password = 'Password10#1';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587; 

$mail->setFrom('mailsendthrowaway@gmail.com', 'AU Photo');
$mail->addAddress('info@lavelleproductions.com');     // Add a recipient

$mail->isHTML(true);                                  // Set email format to HTML

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Name is required ";
} else {
    $name = $_POST["name"];
}
// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email is required ";
} else {
    $email = $_POST["email"];
}

$image = $_POST["image"];

$mail->Subject = 'Interest in a photo';
$mail->Body    = "";
$mail->Body    .= "<h3>Name:</h3>";
$mail->Body    .= $name;
$mail->Body    .= "<br>"; 
$mail->Body    .= "<h3>Email:</h3>";
$mail->Body    .= $email;
$mail->Body    .= "<br>";
$mail->Body    .= "Is interested in the following photo:";
$mail->Body    .= "<br>";
$mail->Body    .= $image; 





if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
	header('Location: ' . $_SERVER['HTTP_REFERER']); /* Redirect browser */
	exit();
}
?>

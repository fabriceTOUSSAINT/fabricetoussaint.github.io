<?php

// require 'PHPMailer-master/PHPMailerAutoload.php';
// $mail = new PHPMailer;


// $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
// $mail->SMTPAuth = true;                               // Enable SMTP authentication
// $mail->Username = 'mailsendthrowaway@gmail.com';                 // SMTP username
// $mail->Password = 'Password10#1';                           // SMTP password
// $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
// $mail->Port = 587; 

// $mail->setFrom('mailsendthrowaway@gmail.com', 'AU contact');
// $mail->addAddress('fabtoussaint@gmail.com');     // Add a recipient

// $mail->isHTML(true);                                  // Set email format to HTML

// // NAME
// if (empty($_POST["name"])) {
//     $errorMSG = "Name is required ";
// } else {
//     $name = $_POST["name"];
// }
// // EMAIL
// if (empty($_POST["email"])) {
//     $errorMSG .= "Email is required ";
// } else {
//     $email = $_POST["email"];
// }

// // // MESSAGE
// if (empty($_POST["message"])) {
//     $errorMSG .= "Message is required ";
// } else {
//     $message = $_POST["message"];
// }

// $image = $_POST["image"];

// $mail->Subject = 'AU contact form';
// $mail->Body    = "";
// $mail->Body    .= "<h3>Name:</h3>";
// $mail->Body    .= $name;
// $mail->Body    .= "<br>"; 
// $mail->Body    .= "<h3>Email:</h3>";
// $mail->Body    .= $email;
// $mail->Body    .= "<br>";
// $mail->Body    .= "<br>";
// $mail->Body    .= $message;

// if(!$mail->send()) {
//     echo 'Message could not be sent.';
//     echo 'Mailer Error: ' . $mail->ErrorInfo;
// } else {
//         echo "success"
// }




$errorMSG = "";

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

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message is required ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "aubasketball@theeventauthority.com";
$Subject = "New AU Message Received";

// prepare email body text
$Body = "";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body, "From:".$email);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>
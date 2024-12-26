<?php
/* error_reporting(-1); */
/* ini_set('display_errors', 'On'); */
/* set_error_handler("var_dump"); */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

	//Load Composer's autoloader
	require 'vendor/autoload.php';

	//load env credentials
	require_once('./protected/.mailenv.php');

	//Create an instance; passing `true` enables exceptions
	$mail = new PHPMailer(true);

	$fromaddress = $mailenv['BUGSFROMADDR'];
	$fromname = $mailenv['BUGSFROMNAME'];
	$toaddress = $mailenv['BUGSTOADDR'];
	$toname = $mailenv['BUGSTONAME'];
	$subject = "Suggestion report";
	$message .= '<b>Suggestion:</b><br/>';
	$message .= $_POST['suggestion'] . '<br/>';
	if ($_POST['anythingElse'] != '') {
		$message .= '<br/><b>And...</b><br/>';
		$message .= $_POST['anythingElse'] . '<br/>';
		$message .= "<br/>from: " . $_POST['userid'] . "<br/>";
	}
	$messageplain = "Suggestion:\n{$_POST['suggestion']}";
	if ($_POST['anythingElse'] != '') {
		$messageplain .= "\nAnd...\n{$_POST['anythingElse']}\n";
		$messageplain .= "\nfrom: " . $_POST['userid'] . "\n";
	}

	try {
		//Server settings
		/* $mail->SMTPDebug = SMTP::DEBUG_SERVER;                  //Enable verbose debug output */
		$mail->SMTPDebug = SMTP::DEBUG_OFF;
		$mail->isSMTP();                                        //Send using SMTP
		$mail->Host       = $mailenv['HOST'];
		$mail->SMTPAuth   = true;                               //Enable SMTP authentication
		$mail->Username   = $mailenv['BUGSUSERNAME'];           //SMTP username
		$mail->Password   = $mailenv['BUGSPASSWORD'];           //SMTP password
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;     //Enable implicit TLS encryption
		$mail->Port       = 587;                                //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
		$mail->isSMTP();

		//Recipients
		$mail->setFrom($fromaddress, $fromname);
		$mail->addAddress($toaddress, $toname);    //Add a recipient
		/* $mail->addAddress('email@examplle.com');       //Name is optional */
		/* $mail->addReplyTo('reporter@examplle.nl', 'Bugreporter'); */
		/* $mail->addCC('cc@example.com'); */
		/* $mail->addBCC('bcc@example.com'); */

		//Attachments
		/* $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments */
		/* $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name */

		//Content
		$mail->isHTML(true);																	 	 //Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = $message;
		$mail->AltBody = $messageplain;

		$mail->send();
		echo 'Thank you!';
		return false;
	} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}
}

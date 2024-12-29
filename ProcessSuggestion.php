<?php
/* error_reporting(-1); */
/* ini_set('display_errors', 'On'); */
/* set_error_handler("var_dump"); */

/* 
 * wget https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.3.zip & unzip in 
 * root for intelisense, if wanted.
 */


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
	$suggestion = htmlspecialchars($_POST['suggestion'], ENT_QUOTES);
	$anythingElse = htmlspecialchars($_POST['anythingElse'], ENT_QUOTES);
	$userid = $_POST['userid'];
	$usermail = $_POST['usermail'];

	$fromaddress = $mailenv['BUGSFROMADDR'];
	$fromname = $mailenv['BUGSFROMNAME'];

	$toaddress = $mailenv['BUGSTOADDR'];
	$toname = $mailenv['BUGSTONAME'];
	$subject = "Suggestion report";

	$message .= '<b>Suggestion:</b><br/>';
	$message .= $suggestion . '<br/>';
	if ($anythingElse != '') {
		$message .= '<br/><b>And...</b><br/>';
		$message .= $anythingElse . '<br/>';
	}
	$message .= "<br/>from: " . $userid;
	$message .= "<br/>email: " . $usermail;

	$messageplain = "Suggestion:\n{$suggestion}";
	if ($anythingElse != '') {
		$messageplain .= "\nAnd...\n{$anythingElse}\n";
	}
	$messageplain .= "\nfrom: " . $userid;
	$messageplain .= "\nemail: " . $usermail;

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
		echo 'OK';
		return false;
	} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}
}

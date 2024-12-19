<?php
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$to = 'bugs@mubooks.nl';
	$from = 'tester@gmail.com';
	$subject = 'bug suggestion';
	$message = 'blablabla';
	/* if (isset($_POST['type'])) { */
	/* 	if ($_POST['type'] == 'bug') { */
	/* 		$message .= "BUG \n"; */
	/* 		$message .= $_POST['bug'] . "\n"; */
	/* 	} elseif ($_POST['type'] == 'suggestion') { */
	/* 		$message .= "SUGGESTION \n"; */
	/* 		$message .= $_POST['suggestion'] . "\n"; */
	/* 	} else { */
	/* 		echo 'no bug or no suggestion?'; */
	/* 	} */
	/* 	if (isset($_POST['anythingElse']) and trim($_POST['anythingElse']) != '') { */
	/* 		$message .= "ANYTHING ELSE \n"; */
	/* 		$message .= $_POST['anythingElse'] . "\n"; */
	/* 	} */

	$headers = array("From: auth@mubooks.nl", "X-mailer: PHP/" . PHP_VERSION);
	$headers = implode("\r\n", $headers);
	mail($to, $subject, $message, $headers);
	if (mail($to, $subject, $message, $headers)) {
		$echo = 'Report sent, merci!';
		$echo .= 'Message: ' . $message;
		echo $echo;
	} else echo 'Error sending report, please send an email to bugs@mubooks.nl';
}

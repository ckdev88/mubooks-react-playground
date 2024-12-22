<?php
$to = "ilikeespressoalot@gmail.com";
$subject = "My subject";
$txt = "Hello world!";
$headers = "From: bugs@mubooks.nl";

echo phpinfo();
if (mail($to, $subject, $txt, $headers)) {
	echo 'mail sent from ' . $headers;
} else {
	echo 'mail not sent, i think';
}

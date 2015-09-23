<?php
global $formVars, $mylogarray, $_SERVER, $HTTP_COOKIE_VARS;

//Get Hostname
$submithost = gethostbyaddr($_SERVER['REMOTE_ADDR']);

$commentTextarea = urldecode($_POST["commentTextarea"]);
$deviceType = $_POST["deviceType"];
$osVersion = $_POST["osVersion"];
$productName = $_POST["product"];
$name = urldecode($_POST["name"]);
$email = urldecode($_POST["email"]);

$headers = "MIME-Version: 1.0 \n";
$headers .= "Content-type: text/plain; charset=iso-8859-1\n";
$headers .= "From: \"$name\" <$email>  \n";
$headers .= "X-Mailer: PHP 4.0\n";
$headers .= "Date: " . date("D, d M Y H:i:s O"); //Thu, 20 Aug 2009 08:46:37 -0500
	
//start to build the email
$emailBody = "INFO REQUEST\n";
$emailBody .= "Name: $name\n";
$emailBody .= "Email: $email\n";
$emailBody .= "Product: $productName\n";
$emailBody .= "Device: $deviceType\n";
$emailBody .= "OS: $osVersion\n\n";
$emailBody .= "$commentTextarea";

$emailTitle = "$productName Support";

if ($productName == "Postage" || $productName == "PostageRomance" || $productName == "HalloweenPostage" || $productName == "HolidayPostage")
	$emailAddress = "support.postage@roguesheep.com";
else if ($productName == "TouchUp")
	$emailAddress = "support.touchup@roguesheep.com";
else if ($productName == "RoseGlobe" || $productName == "SnoGlobe")
	$emailAddress = "support.snoglobe@roguesheep.com";
else if ($productName == "EasyAlarms")
	$emailAddress = "support.easyalarms@roguesheep.com";
else if ($productName == "Instaview")
	$emailAddress = "support.instaview@roguesheep.com";
else
	$emailAddress = "support.general@roguesheep.com";



//
// Loging
// 
// -------Begin----------
// $headers
//
// $emailBody
// --------End-----------
//
$logContents = "-------Begin----------\n";
$logContents .= $headers;
$logContents .= "\n\n";
$logContents .= $emailBody . "\n";
$logContents .= "--------End-----------\n\n";


file_put_contents("email_log.txt", $logContents, FILE_APPEND);

//Send it Out
mail($emailAddress, $emailTitle, $emailBody, $headers);
exit;
?>

<?php
// Check for empty fields
if(empty($_POST['state'])) {
  echo "No arguments Provided!";
  return false;
}
	
$state = $_POST['state'];

function mailFree($to , $subject , $message , $additional_headers=null , $additional_parameters=null) {
   $start_time = time();
   $resultat=mail ( $to , $subject, $message, $additional_headers, $additional_parameters);
   $time= time()-$start_time;
   return $resultat & ($time>1);
}
$out='';
$res=false;
// Create the email and send the message
$to = 'mariage.greg.anne@gmail.com';
$email_subject = "[LOGOS] - $lastname a fait une promesse de don $gifttype de $amount";
$email_body = "
   <h4>$name a fait une promesse de don !!</h4>
   
   <p>Ces informations ont été automatiquement enregistrées dans un fichier excel.<br/>
   <a href='http://ptitgraig.free.fr/mariage-greg-anne/supporters.csv'>Cliquez ici pour le consulter</a></p>";
$headers  = "From: noreply@mariage-greg-anne.fr\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "Return-Path: ptitgraig@free.fr\r\n";
//mail($to,$email_subject,$email_body,$headers);
if (mailFree( $to, $email_subject , $email_body, $headers )==false) {
   echo "<pre style='border: 1px dotted #666666;padding:10px;'><code>L'envoi du message n'a pas été réalisé en raison des limitations des serveurs de Free, merci de réessayer un peu plus tard.</code></pre>";
   $res=false;
} else {
   $fp = fopen('../supporters.csv', 'a');
   $data = $firstname.";".$lastname.";".$email_address.";".$gifttype.";".$amount."\n";
   fwrite($fp, $data);
   fclose($fp);
   $res=true;
}
return $res;
?>
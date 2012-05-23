<?php
    if( isset($_POST['fname']) )
	{
		$fname = stripslashes($_POST['fname']);
	}
    else
	{
		$error .= "Your Name seems to be missing!\n";
	}
	if(isset($_POST['email']))
	{
		$email = stripslashes($_POST['email']);
	}
    else
	{
		$error .= "Your email seems to be missing!\n";
	}
	if(isset($_POST['msg']))
	{
		$message = stripslashes($_POST['msg']);
	}
    else
	{
		$error .= "The comments of your email seems to be missing!\n";
	}

	if ($_POST['key'] == "pass")
	{
		$to = "contact@sarahkateyau.com";
		$subject = "[sarahkateyau.com form] - {$_POST['fname']}";
		if ($_POST['msg'] != "")
		{
			$message = "{$_POST['fname']} had the following message:\n{$_POST['msg']}";
        }
		$headers = "";
		$headers .= "From: " . $_POST['fname'] . " <" . $_POST['email'] . ">\n";
		$headers .= "Reply-To: " . $_POST['fname'] . " <" . $_POST['email'] . ">\n";
		$headers .= "X-Mailer: PHP4\n" ; // mailer
		$headers .= "X-Priority: 3\n" ;  // priority
		$headers .= "Return-Path:  $to\n";
		$headers .= "Origin: ".$_SERVER['REMOTE_ADDR']."\n";
		$headers .= "Content-Type: text/plain; charset=us-ascii\n";
		if (mail($to,$subject,$message,$headers)) {

            $to_confirm = $_POST['email'];
            $subject_confirm = "[Confirmation] We have received your inquiry - Sarah Kate Yau";
            $message_confirm = $_POST['fname'] . ",\n\n";
            $message_confirm .= "This is an automated email.  \n\n";
            $message_confirm .= "Thank you for your interest.  I will be in touch with you very soon!  If you prefer to reach me by phone, please call 805.203.6826.  Alternatively, you can email me at contact@sarahkateyau.com.\n\n";
            $message_confirm .= "\n";
            $headers_confirm = "";
            $headers_confirm .= "From: [Confirmation] Sarah Kate Yau <contact@sarahkateyau.com>\n";
            $headers_confirm .= "Reply-To: Sarah Kate Yau <contact@sarahkateyau.com>\n";
            $headers_confirm .= "X-Mailer: PHP4\n" ; // mailer
            $headers_confirm .= "X-Priority: 3\n" ;  // priority
            $headers_confirm .= "Return-Path:  $to\n";
            $headers_confirm .= "Origin: ".$_SERVER['REMOTE_ADDR']."\n";
            $headers_confirm .= "Content-Type: text/plain; charset=us-ascii\n";
            if (mail($to_confirm, $subject_confirm, $message_confirm, $headers_confirm))
            {
                echo "&reply=success";
            }
            else
            {
                echo $error . " &reply=error";
            }
		}
		else {
			echo $error . "&reply=error";
		}
	}
	else {
		echo $error;
	}
?>

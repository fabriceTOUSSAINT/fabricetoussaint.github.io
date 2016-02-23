<?php

session_start();

require_once('../inc/contactform.config.php');

require_once('../class/class.contactform.php');

$contactform_obj = new contactForm($cfg);

$json_error = '';

$post_required_element = array('element-51','element-52','element-53','element-54','element-55','element-56','element-59','element-61','element-63','element-64','element-65');

$post_required_email = array('element-58');

if($_SESSION['captcha_img_string'] != $_POST['captcha_input']){$json_error .= '{"elementid":"element-66",  "errormessage": "'.addcslashes($contactform_obj->cfg['form_error_captcha'], '"').'"},';}

?>
<?php

/**
 * required files and elements are written in saveform.php
 * $post_required_element = array...
 * $post_required_email = array...
 * $json_error = '';
 * json error message for invalid captcha (captcha_img_string)
 */


// delete the files the user uploaded and then deleted

if(isset($_POST['deleteuploadedfile']) && $_POST['deleteuploadedfile'])
{
	foreach($_POST['deleteuploadedfile'] as $value)
	{
		@unlink('../upload/'.$contactform_obj->quote_smart($value));
	}
}



if(isset($_POST['form_value_array']) && $_POST['form_value_array'])
{
	foreach($_POST['form_value_array'] as $value)
	{
		$contactform_obj->mergePost($value);

	}
}

/*
if(isset($contactform_obj->merge_post) && $contactform_obj->merge_post)
{
	foreach($contactform_obj->merge_post as $value)
	{
		$post_element_ids[] = $value['elementid'];
	}
} else {
	exit;
}*/
// print_r($post_element_ids);print_r($contactform_obj->merge_post);

if(isset($post_required_element) && $post_required_element && isset($contactform_obj->merge_post) && $contactform_obj->merge_post)
{
	
	foreach($post_required_element as $value)
	{
		foreach($contactform_obj->merge_post as $vvalue)
		{
			if($vvalue['elementid'] == $value)
			{
				if(!$vvalue['elementvalue'])
				{	//echo $value;
					$json_error .= '{"elementid":"'.$value.'",  "errormessage": "'.addcslashes($contactform_obj->cfg['form_error_emptyfield'], '"').'"},';
					
				}
				break;
			}
		}
		
	}
}


if(isset($post_required_email) && $post_required_email)
{
	
	foreach($post_required_email as $value)
	{
		foreach($contactform_obj->merge_post as $vvalue)
		{
			if($vvalue['elementid'] == $value)
			{
				$param['reply_emailaddress'] = $vvalue['elementvalue'];

				if(!$contactform_obj->isEmail($vvalue['elementvalue']))
				{
					$json_error .= '{"elementid":"'.$value.'",  "errormessage": "'.addcslashes($contactform_obj->cfg['form_error_invalidemailaddress'], '"').'"},';
	
				}
				break;
			}
		}
		
	}
}


// FORMATTING JSON RESPONSE AND SENDING MAIL
if($json_error)
{
	$json_response = '{'
							.'"status":"nok",'
							.'"message":['.substr($json_error,0,-1).']'
							.'}';
} else{
	
	if(isset($contactform_obj->merge_post) && $contactform_obj->merge_post)
	{
		
		//print_r($_POST);
		$param['reply_emailaddress'] = (isset($param['reply_emailaddress']) && $param['reply_emailaddress'])?$param['reply_emailaddress']:'';
		
		$contactform_obj->sendMail($param);
		
		if($contactform_obj->cfg['form_emailnotificationinputid'])
		{
			foreach($contactform_obj->merge_post as $vvalue)
			{
				if($vvalue['elementid'] == $contactform_obj->cfg['form_emailnotificationinputid'])
				{
					$receipt_cfg['email_address'] = $vvalue['elementvalue'];
					//echo $vvalue['elementvalue'];
					break;
				}
			}
	
			$receipt_cfg['form_emailnotificationtitle'] = $contactform_obj->cfg['form_emailnotificationtitle'];
			$receipt_cfg['form_emailnotificationmessage'] = preg_replace('#<br(\s*)/>|<br(\s*)>#i', "\r\n",$contactform_obj->cfg['form_emailnotificationmessage']);
			$contactform_obj->sendMailReceipt($receipt_cfg);
			
		}
		
		$json_response = '{'
								.'"status":"ok",'
								.'"message":"'.addcslashes($contactform_obj->cfg['form_validationmessage'], '"').'"'
								.'}';
	}
	// no input field values ($contactform_obj->merge_post is empty)
	// if there is a captcha field, the error message is still displayed with $json_response
	else
	{
		$json_response = '{'
								.'"status":"nok",'
								.'"message":""'
								.'}';
	}
}

echo $json_response;

?>

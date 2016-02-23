<?php

class contactForm{
	
		
	function contactForm($cfg)
	{
		
		/***********************************************************************************************************************************
		 * CONFIGURATION 
		 *
		 * $this->cfg['emailaddress']: the email address on which you want to receive the messages from users through your website
		 * $this->cfg['confirmation_email_subject']: the subject of the email containing the message sent by users through your website
		 * 
		 */
		
		$this->cfg['emailaddress'] = isset($cfg['email'])?$cfg['email']:'';
		
		// =?UTF-8?B? required to avoid bad character encoding in the From field
		$this->cfg['mailfrom'] = (isset($cfg['mailfrom']) && $cfg['mailfrom'])?'=?UTF-8?B?'.base64_encode($cfg['mailfrom']).'?=':$this->cfg['emailaddress'];
		
		$this->cfg['confirmation_email_subject'] = 'New application from your website';
		
		$this->cfg['form_error_captcha'] = isset($cfg['form_error_captcha'])?$cfg['form_error_captcha']:'';
		$this->cfg['form_error_emptyfield'] = isset($cfg['form_error_emptyfield'])?$cfg['form_error_emptyfield']:'';
		$this->cfg['form_error_invalidemailaddress'] = isset($cfg['form_error_invalidemailaddress'])?$cfg['form_error_invalidemailaddress']:'';
		$this->cfg['form_validationmessage'] = isset($cfg['form_validationmessage'])?$cfg['form_validationmessage']:'';
		$this->cfg['form_emailnotificationinputid'] = isset($cfg['form_emailnotificationinputid'])?$cfg['form_emailnotificationinputid']:'';
		$this->cfg['form_emailnotificationtitle'] = isset($cfg['form_emailnotificationtitle'])?$cfg['form_emailnotificationtitle']:'';
		$this->cfg['form_emailnotificationmessage'] = isset($cfg['form_emailnotificationmessage'])?$cfg['form_emailnotificationmessage']:'';
		
		$this->cfg['emailaddress_cc'] = isset($cfg['emailaddress_cc'])?$cfg['emailaddress_cc']:'';
		$this->cfg['emailaddress_bcc'] = isset($cfg['emailaddress_bcc'])?$cfg['emailaddress_bcc']:'';
		
		$this->merge_post_index = 0;
		
		$this->demo = 0;
		
		$this->envato_link = '';
	}
	
	
	function sendMail($param)
	{
		$count_files_to_attach = 0;
		
		$mail_body = 'You received a new message: '.@date("F j, Y, g:i A")
							."\r\n"."--------------------------------------------------------";

		if($this->merge_post)
		{
			foreach($this->merge_post as $value)
			{
				if(
				   isset($value['elementfieldtype']) && $value['elementfieldtype'] == 'upload'
				   && isset($value['filename']) && $value['filename']
				   )
				{
					
					if( isset($value['deletefile']) && ($value['deletefile'] == 1 || $value['deletefile'] == 2) )
					{
						$count_files_to_attach++;
					}
					

					$explode_requesturi = explode('/',$_SERVER['REQUEST_URI']);

					$inc_form_validation = $explode_requesturi[count($explode_requesturi)-2].'/'.$explode_requesturi[count($explode_requesturi)-1] ;

					$install_dir = str_replace($inc_form_validation,'',$_SERVER['REQUEST_URI']);
					
					
					
					$mail_body .= "\r\n\r\n".$value['elementlabel'].': '.$value['elementvalue'];
					
					// No file link if we delete the file after the upload
					// 1: File Attachment + Download Link
					// 2: File Attachment Only
					if( isset($value['deletefile']) && ($value['deletefile'] == 1 || $value['deletefile'] == 3) )
					{
						$mail_body .= "\r\n".'http://'.$_SERVER['SERVER_NAME']
															.$install_dir
															.'upload/'
															.rawurlencode($value['elementvalue']);
					}

				} 
				else{
					$mail_body .= "\r\n\r\n".$value['elementlabel'].': '.$value['elementvalue'];
				}
			}
		}
		
		$mail_body .= "\r\n\r\n"."--------------------------------------------------------";
		$mail_body .= "\r\n".'IP address: '.$_SERVER['REMOTE_ADDR'];
		$mail_body .= "\r\n".'Host: '.gethostbyaddr($_SERVER['REMOTE_ADDR']);
		
		if($this->demo != 1)
		{
			// for the admin: if the user provides its email address, it will appear in the "from" field
			$param['reply_emailaddress'] = (isset($param['reply_emailaddress']) && $param['reply_emailaddress'])?$param['reply_emailaddress']:$this->cfg['emailaddress'];
			
			// for the admin: if the user provides its email address, it will appear in the "reply-to" field
			$replyto_name = $param['reply_emailaddress']?$param['reply_emailaddress']:'';
			$replyto_address = $param['reply_emailaddress']?$param['reply_emailaddress']:'';
			
			$mailheaders_options = array(
														'from'=>array('name'=>$param['reply_emailaddress'], 'address'=>$param['reply_emailaddress']),
														'replyto'=>array('name'=>$replyto_name, 'address'=>$replyto_address),
														'cc'=>array('address'=>$this->cfg['emailaddress_cc']),
														'bcc'=>array('address'=>$this->cfg['emailaddress_bcc'])
													   );
			$mailheaders = $this->getMailHeaders($mailheaders_options);
			
			
			//if(!isset($param['uploads']) || !$param['uploads'])
			if(!$count_files_to_attach)
			{
				$mailheaders .= 'Content-type: text/plain; charset=utf-8'."\r\n";
				$mailmessage = $mail_body;
			} else
			{

				// boundary 
				$semi_rand = md5(time());
				$mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";
					 
				// headers for attachment 
				$mailheaders .= "MIME-Version: 1.0\n"
										."Content-Type: multipart/mixed;\n"
										." boundary=\"{$mime_boundary}\"";
					 
				// multipart boundary 
				$mailmessage = "This is a multi-part message in MIME format.\n\n"
										."--{$mime_boundary}\n"
										."Content-Type: text/plain; charset=\"utf-8\"\n"
										."Content-Transfer-Encoding: 7bit\n\n"
										.$mail_body
										."\n\n";
									
				$mailmessage .= "--{$mime_boundary}\n";
					 
				// preparing attachments
				$count_attached_file = 0;
					
				foreach($this->merge_post as $value)
				{
						if(
							isset($value['elementfieldtype']) && $value['elementfieldtype'] == 'upload'
							&& isset($value['filename']) && $value['filename']
							&& isset($value['deletefile']) && ($value['deletefile'] == 1 || $value['deletefile'] == 2)																	   
						)
						{
							$count_attached_file++;
								
							$file = fopen('../upload/'.$value['filename'],"rb");
							$data = fread($file,filesize('../upload/'.$value['filename']));
							fclose($file);
								
							$data = chunk_split(base64_encode($data));
							
							$mailmessage .= 'Content-Type: {"application/octet-stream"};'."\n" . ' name="'.$value['filename'].'"'."\n" 
													.'Content-Disposition: attachment;'."\n" . ' filename="'.$value['filename'].'"'."\n" 
													.'Content-Transfer-Encoding: base64'."\n\n" . $data . "\n\n";
							
							// "--" must be added for the last file, or an empty file will be also attached in the message
							if($count_attached_file == $count_files_to_attach)
							{
								$mailmessage .= "--{$mime_boundary}--\n";
							} else{
								$mailmessage .= "--{$mime_boundary}\n";
							}
								
							// delete attached file?
							// this is different from deleting the file when the user deletes the file himself in the from: check form-validation.php for this (in form-validation.php because the file must be deleted even if sendMail() is not called - when there are errors for example)
							if(isset($value['deletefile']) && $value['deletefile'] == 2)
							{
								@unlink('../upload/'.$value['filename']);
							}
						}
				} // foreach
			} // if(!$count_files_to_attach)
			
			
			@mail($this->cfg['emailaddress'], $this->cfg['confirmation_email_subject'], $mailmessage, $mailheaders);
			
		}
	}
	
	
	function sendMailReceipt($value)
	{
		if($this->demo != 1)
		{
			
			$mailheaders_options = array(
														'from'=>array('name'=>$this->cfg['mailfrom'], 'address'=>$this->cfg['emailaddress']),
														'replyto'=>array('name'=>$this->cfg['mailfrom'], 'address'=>$this->cfg['emailaddress'])
													   );
			$mailheaders = $this->getMailHeaders($mailheaders_options);
			
			@mail($value['email_address'], $value['form_emailnotificationtitle'], $value['form_emailnotificationmessage'], $mailheaders);
		}
	}
	
	function mergePost($value)
	{
		$this->merge_post[$this->merge_post_index]['elementid'] = $value['elementid'];
		$this->merge_post[$this->merge_post_index]['elementvalue'] = $this->quote_smart(trim($value['elementvalue']));
		$this->merge_post[$this->merge_post_index]['elementlabel'] = $this->quote_smart(trim($value['label']));
		
		if(isset($value['fieldtype']) && $value['fieldtype'])
		{	// if fieldtype == upload, we add the download link in the mail body message
			$this->merge_post[$this->merge_post_index]['elementfieldtype'] = trim($value['fieldtype']);
		}
		
		if(isset($value['filename']) && $value['filename'])
		{
			$this->merge_post[$this->merge_post_index]['filename'] = $this->quote_smart(trim($value['filename']));
		}
		
		if(isset($value['deletefile']) && $value['deletefile'])
		{
			$this->merge_post[$this->merge_post_index]['deletefile'] = trim($value['deletefile']);
		}
		
		$this->merge_post_index++;
	}
	

	function isEmail($email)
	{
		$atom   = '[-a-z0-9\\_]';   // authorized caracters before @
		$domain = '([a-z0-9]([-a-z0-9]*[a-z0-9]+)?)'; // authorized caracters after @
									   
		$regex = '/^' . $atom . '+' .   
		'(\.' . $atom . '+)*' .         
										
		'@' .                           
		'(' . $domain . '{1,63}\.)+' .  
										
		$domain . '{2,63}$/i';          
		
		// test de l'adresse e-mail
		return preg_match($regex, trim($email)) ? 1 : 0;
		
	}
	
	
	function quote_smart($value)
	{
		if(get_magic_quotes_gpc())
		{
			$value = stripslashes($value);
		}
		
		return $value;
	}
	
	
	
	function getMailHeaders($mailheaders_options)
	{
		$mailheaders_options['from']['name'] = isset($mailheaders_options['from']['name'])?$mailheaders_options['from']['name']:$mailheaders_options['from']['address'];
		
		$mailheaders_options['cc']['address'] = isset($mailheaders_options['cc']['address'])?$mailheaders_options['cc']['address']:'';
		
		$mailheaders_options['bcc']['address'] = isset($mailheaders_options['bcc']['address'])?$mailheaders_options['bcc']['address']:'';


		$from_name = $mailheaders_options['from']['name']?$mailheaders_options['from']['name']:$mailheaders_options['from']['address'];
		
		
		if($this->isEmail($from_name))
		{
			// 	From: user@domain.com <user@domain.com> is invalid => user@domain.com
			$mail_header_from = 'From: '.$from_name."\r\n";
			$mail_header_replyto = 'Reply-To: '.$from_name."\r\n";
		} else
		{
			$mail_header_from = 'From: '.$from_name.'<'.$mailheaders_options['from']['address'].'>'."\r\n";
			$mail_header_replyto = 'Reply-To: '.$from_name.'<'.$mailheaders_options['from']['address'].'>'."\r\n";
		}
		
		
		$mail_header_cc = '';
		if($mailheaders_options['cc']['address'])
		{
			
			$explode_email = explode(',', $mailheaders_options['cc']['address']);
			
			$cc = '';

			foreach($explode_email as $email_value)
			{
				$cc .= $email_value.",";
			}
			
			$mail_header_cc .= 'Cc: '.substr($cc, 0, -1)."\r\n";
		}
		
		$mail_header_bcc = '';
		if($mailheaders_options['bcc']['address'])
		{
			$explode_email = explode(',', $mailheaders_options['bcc']['address']);
			
			$bcc = '';

			foreach($explode_email as $email_value)
			{
				$bcc .= $email_value.",";
			}
			
			$mail_header_bcc .= 'Bcc: '.substr($bcc, 0, -1)."\r\n";

		}
		
		$mailheaders = $mail_header_from
								.$mail_header_cc
								.$mail_header_bcc
								.$mail_header_replyto
								.'MIME-Version: 1.0'."\r\n"
								.'X-Mailer: PHP/'.phpversion()."\r\n"
								;
		/*
		Examples of headers that should work would be:
			From: user@domain.com will work
			From: "user" <user@domain.com>
		
		Examples of headers that will NOT work:
			From: "user@domain.com"
			From: user @ domain.com
			From: user@domain.com <user@domain.com>								
		*/
		
		// 	echo $mailheaders;
		return($mailheaders);
		
	}

	
}
// THERE MUST BE NO BLANK LINES AFTER THE CLOSING TAG
// OR COULD CAUSE :
// Warning: Cannot modify header information - headers already sent by 
// (output started at editor/sourcecontainer/contactform/class/class.contactform.php:345) 
// in editor/inc/form-createaccount.php on line 84
?>
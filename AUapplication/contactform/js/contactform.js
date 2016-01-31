var cfg_redirecturl = '';

var cfg_uploadfileistoobig = 'File size is too large';

var cfg_uploadinvalidfiletype = 'Unauthorized file type';

jQuery(function(){
	
	jQuery('.cfg-uploadfilename').val(''); // FF may keep the file name in the cfg-uploadfilename input after submitting and refreshing the page
	
	jQuery('.cfg-submit').click(function()
	{
		jQuery('.cfg-errormessage').hide().empty();
		
		jQuery('#cfg-loading').show();
		
		var submit_id =  jQuery(this).prop('id');
		jQuery('#'+submit_id).hide();
		
		var requiredelement_ids = Array();
		var email_ids = Array();
		var form_value_array = Array();
		var radio_value = Array();
		var checkbox_value = Array();
		var selectmultiple_value = Array();
		var deleteuploadedfile_value = Array();
		
		jQuery('.af-formvalue').each(function()
		{
			var label = jQuery(this).closest('.element').find('.cfg-labelvalue').html();
			
			
			
			// catch uploads
			if(jQuery(this).hasClass('cfg-uploadfilename'))
			{
				var key = jQuery(this).prop('name');
				var value =  jQuery.trim(jQuery(this).val());
				
				var deletefile = jQuery(this).closest('.cfg-option-container').find('.cfg-uploaddeletefile').val();
							
				form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label, 'fieldtype':'upload', 'filename':value, 'fieldtype':'upload', 'deletefile':deletefile});
			}
			
			
			// catch input text values
			if(jQuery(this).hasClass('af-inputtext'))
			{
				var key = jQuery(this).prop('id');
				var value = jQuery('#'+jQuery(this).prop('id')).val();
				form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
			}
			
			
			// catch textarea values
			if(jQuery(this).hasClass('af-textarea'))
			{
				var key = jQuery(this).prop('id');
				var value = jQuery('#'+jQuery(this).prop('id')).val();
				form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
			}
			
			
			// catch radiobutton values
			if(jQuery(this).is(':radio'))
			{
				var key = jQuery(this).prop('name');
				var value = jQuery(this).val();
				
				var check_index_radio_form_value = form_value_array.length+1;
				
				if(jQuery(this).is(':checked')){
					form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
					radio_value[key] = value;
				}
				
				if( jQuery(this).is( jQuery(this).closest('.element').find('input[name='+key+']:last')) )
				{
					if(!radio_value[key]){
						form_value_array.push({'elementid': key, 'elementvalue': '', 'label':label});
					}
				}
			}
	
			
			// catch checkbox values
			if(jQuery(this).is(':checkbox'))
			{
				var key = jQuery(this).prop('name');
				var value = jQuery(this).val();
					
				if(jQuery(this).is(':checked'))
				{
					
					form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
					
					checkbox_value[key] = value;
					
				}
				
				if( jQuery(this).is(jQuery(this).closest('.element').find('input[name='+key+']:last')))
				{
					// we are at the last checkbox, and the checkbox[name] array value is still empty => insert fieldname: '' in the notification
					if(!checkbox_value[key])
					{
						form_value_array.push({'elementid': key, 'elementvalue': '', 'label':label});
					}
				}
			}
			
			
			// catch select values
			if(jQuery(this).hasClass('af-select'))
			{
				var key = jQuery(this).prop('id');
				var value = jQuery(this).val();
				form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
			}
			
			
			// catch multiple select values
			if(jQuery(this).hasClass('af-selectmultiple'))
			{
				var key = jQuery(this).prop('name'); // must be placed here, not in each() or php will return Undefined index: elementid
				
				jQuery(this).find('option').each(function()
				{
					var value = jQuery(this).val();
						
					if(jQuery(this).is(':selected'))
					{
						form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
						selectmultiple_value[key] = value;
					}
					
					if( jQuery(this).is( jQuery(this).closest('.af-selectmultiple').find('option:last')) )
					{
						// we are at the last option, and the selectmultiple[name] array value is still empty => insert fieldname: '' in the notification
						if(!selectmultiple_value[key])
						{
							form_value_array.push({'elementid': key, 'elementvalue': '', 'label':label});
						}
					}
					
				});
				
			}
			
			// catch time values
			if(jQuery(this).hasClass('af-time'))
			{
				var key = 'element-'+jQuery(this).closest('.element').prop('id');
				var ampm = jQuery(this).closest('.element').find('.cfg-time-ampm').val();
				if(ampm == undefined) ampm = ''; // no quote on undefined
				var value = jQuery(this).closest('.element').find('.cfg-time-hour').val()+':'+jQuery(this).closest('.element').find('.cfg-time-minute').val()+' '+ampm;
				
				form_value_array.push({'elementid': key, 'elementvalue': value, 'label':label});
			}
			
		});
		
		/*
		var i;
		var debug_form_values = '';
		for (i = 0; i < form_value_array.length; ++i){
			debug_form_values += form_value_array[i]['elementid']+ ' | '+form_value_array[i]['label']+ ' => '+form_value_array[i]['elementvalue']+"\n";
		}
		alert(debug_form_values);
		*/
		
		
		// catch required elements ids for non empty validation
		jQuery('input[type=checkbox][name="requiredelement[]"]').each(function(){
			requiredelement_ids.push('element-'+jQuery(this).val());
		}); 
		
		
		// catch required email elements ids for email validation
		jQuery('input[type=checkbox][name="emailrequiredelement[]"]').each(function(){
			email_ids.push('element-'+jQuery(this).val());
		});
		
		// catch list of uploaded files to delete
		jQuery('.cfg-deleteuploadedfile').each(function(){
			deleteuploadedfile_value.push(jQuery(this).val());
		});
		
		
		var captcha_img;
		var captcha_input;
		
		if(jQuery('.cfg-captcha-img').length)
		{
			captcha_img = 1;
			captcha_input = jQuery('#cfg-captcha-input').val();
		}  	
		
		
		//console.log(deleteuploadedfile_value);
		//console.log(form_value_array);
		

		jQuery.post('contactform/inc/form-validation.php',
				{ 
			 		'requiredelement' : requiredelement_ids
				  , 'emailrequiredelement':email_ids
				  , 'captcha_img':captcha_img
				  , 'captcha_input':captcha_input
				  , 'form_value_array':form_value_array
				  ,'deleteuploadedfile':deleteuploadedfile_value
				},
				function(data)
				{
					jQuery('#cfg-loading').hide();
					
					data = jQuery.trim(data);
					
					//console.log(data);
					
					response = jQuery.parseJSON(data);
						
					if(response['status'] == 'ok')
					{
						
						if(cfg_redirecturl)
						{
							window.location.href = cfg_redirecturl;
						} else
						{
							validation_message = '<div class="cfg-validationmessage">'+response['message']+'</div>';
								
							jQuery('.element').each(function()
							{
								if(!jQuery(this).find('.title').html())
								{
									jQuery(this).slideUp('fast');
								}
							});
							
							jQuery('#cfg-contactform-content').append(validation_message);
						}
							
					}
					else
					{
						jQuery('#'+submit_id).show();
	
						for(var i=0; i<response['message'].length; i++)
						{
							jQuery('#cfg-errormessage-'+response['message'][i]['elementid']).append(response['message'][i]['errormessage']);
							jQuery('#cfg-errormessage-'+response['message'][i]['elementid']).fadeIn();
						}
					}
				} /* end function data */
			); /* end jQuery.post */
	}); /* end click submit */
	
	
	// DELETE UPLOADED FILE
	jQuery('body').on('click', '.cfg-deleteupload', function()
	{
		var filename = jQuery(this).closest('.cfg-uploadsuccess-container').find('.cfg-deleteupload-filename').val();
		
		// to add the filename to the list of files to delete
		// // the .cfg-deleteuploadedfile input can also be added in case of chain upload (handlers.js)
		jQuery(this).closest('.cfg-option-container').append('<input value="'+filename+'" type="hidden" class="cfg-deleteuploadedfile" />');
		
		// reset the upload input that contains the filename value
		jQuery(this).closest('.cfg-option-container').find('.cfg-uploadfilename').val('');
		
		// must come last, $(this) is used to access closest elements
		jQuery(this).closest('.cfg-uploadsuccess-container').remove();

	});
	
	
});


function sky_email_form()
{
	$('.contact_form').validate({
		rules: 
		{
			contact_name: 'required',
			contact_email: 'required',
			contact_message: 'required'
		}
	   ,submitHandler: function (form)
		{
			var name = $('#contact_name').attr('value');
			var email = $('#contact_email').attr('value');
			var message = $('#contact_message').attr('value');

			//we deactivate submit button while sending
			$("#btn_submit").attr({ disabled:true, value:"SENDING..." });
			$("#btn_submit").blur();

			$.ajax({
				type: 'POST',
				url: 'sendEmail.php',
				data: 'fname=' + name + '&email=' + email + '&msg=' + message + '&key=pass',
				success: function (data) {
					if (data == '&reply=success')
					{
						alert('Thanks for contacting me.  I\'ll get back to you soon!');
						$('#contact_form').find('input[type="text"],input[type="email"]').attr('value', '');
						$('#contact_form textarea').attr('value', '');
					}
					else
					{
						alert('sorry! there was an error sending your message. please try again later or email us directly at contact@sarahkateyau.com.  thanks!');
					}
					$('#btn_submit').attr({disabled: false, value: 'SEND'}).focus();
				},
				error: function () {
					alert('sorry! there was an error sending your message. please try again later or email us directly at contact@sarahkateyau.com.  thanks!');
					$('#btn_submit').attr({disabled: false, value: 'SEND'}).focus();
			   }
			});
		}
		,invalidHandler: function (form, validator)
		{
			var errors = validator.numberOfInvalids();
			if (errors)
			{
				var em = '';
				if (errors == 1)
				{
					em = 'Fix highlighted fields.';
				}
				else
				{
					em = 'You missed ' + errors + ' fields. They have been highlighted.';
				}
				$('#errorMessage').html(em).show();
			}
			else
			{
				$('#errorMessage').hide();
			}
		}
		,debug: true
	});
}

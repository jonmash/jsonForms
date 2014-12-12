jQuery(document).ready(function(){
	


	
	var default_options= {
		title: "My Magic Form",
		action: "#",
		class: "rsvp_form",
		id: "",
		method: "POST",    		//POST or GET
		validate: "Y",     		//Y or N
		layout: ""  	//stacked or horizontal
	};
	
	var default_schema = [
					{
						name: "user",
						label: "User",
						type: "text",
						id: "username",
						class: "",
						value: "",
						required: "Y",
						placeholder: "Your Username"
					},
					{
						name: "key",
						label: "Key",
						type: "hidden",
						id: "key",
						class: "key",
						value: "1234567",
						required: "N"
					},
					{
						name: "email",
						label: "Email",						
						type: "email",
						id: "email",
						class: "",
						value: "",
						required: "Y",
						placeholder: "Your Email Address"
					},
					{
						name: "password",
						label: "Password",						
						type: "password",
						id: "pass",
						class: "passField",
						value: "",
						placeholder: "Your Password"
					},
					{
						name: "submit",
						type: "submit",
						id: "submitBtn",
						class: "button",
						value: "Save"
					}
				];
	$('#genSchema').val(JSON.stringify(default_schema, null, "\t"));
	$('#genOptions').val(JSON.stringify(default_options, null, "\t"));
	
	
	//Build the form
	var default_form = BuildForm(default_options, default_schema);
	$('#formSpace').html(default_form);
	$('#codeSpace').text(default_form);
	
	$('#generator').submit(UpdateForm);
	$('#genOptions').on('change', UpdateForm);
	$('#genSchema').on('change', UpdateForm);
	
	function UpdateForm(e) {
		e.preventDefault();
		console.log("Updating...");
		$('#formSpace').html(" ");
		$('#codeSpace').html(" ");
		try {
			var opt = JSON.parse($('#genOptions').val());
			var sch = JSON.parse($('#genSchema').val());
			var frm = BuildForm(opt, sch)
			$('#formSpace').html(frm);
			$('#codeSpace').text(frm);
		} catch(e) {
			$('#formSpace').html('<p class="bg-danger" style="padding:25px; margin-top:25px;">Failed to parse JSON. Check your Markup!</p>');
			$('#codeSpace').html('<p class="bg-danger" style="padding:25px; margin-top:25px;">Failed to parse JSON. Check your Markup!</p>');
			console.log("Failed!");
		}
	};
		
	function BuildForm(options, schema) {
		//TODO: Check options object here
		var text = "";
		text += '<h1>'+options.title+'</h1>\r\n';
		text += '<form action="'+options.action+'" class="'+((options.layout === "horizontal") ? "form-horizontal " : "" )+''+options.class+'" id="'+options.id+'" method="'+options.method+'" role="form">\r\n';
		schema.forEach(function (entry) {
			text += AddField(options, entry);
		});
		
		text += '</form>\r\n';
		if(options.validate === "Y") { $('.rsvp_form').validate(); }
		return text;
	}
	
	function AddField(options, sItem) {
		var retVal = "";
		switch(sItem.type){
			case "text":
				retVal = AddTextField(options, sItem);
				break;
			case "password":
				retVal = AddTextField(options, sItem);
				break;
			case "email":
				retVal = AddEmailField(options, sItem);
				break;	
			case "hidden":
				retVal = AddHiddenField(options, sItem);
				break;	
			case "submit":
				retVal = AddSubmitButton(options, sItem);
				break;					
			default:
				console.log("Unknown type: ", sItem);
				break;
		}
		return retVal;
	}
	function AddTextField(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		return 	'\t<div class="form-group">\r\n'+
				'\t\t<label for="form-control '+sItem.name+'" '+
					'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
					sItem.label+
				'</label>\r\n'+
				'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'">\r\n'+
				'\t\t\t<input type="'+sItem.type+'" '+
					'class="form-control '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
					'placeholder="'+sItem.placeholder+'"'+
					((sItem.required === "Y") ? 'required' : '')+
				' />\r\n\t\t</div>\r\n\t</div>\r\n';
	}

	function AddEmailField(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		return 	'\t<div class="form-group">\r\n'+
					'\t\t<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+'</label>\r\n'+
					'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 controls " : "" )+'controls">\r\n'+
						'\t\t\t<div class="input-group">\r\n'+
							'\t\t\t\t<span class="input-group-addon">@</span>\r\n'+
							'\t\t\t\t<input type="'+sItem.type+'" '+
								'class="form-control '+sItem.class+'" '+
								'id="'+sItem.id+'" '+
								'value="'+sItem.value+'" '+
								'name="'+sItem.name+'" '+
								'placeholder="'+sItem.placeholder+'"'+
								((sItem.required === "Y") ? 'required' : '')+
				' />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n';
	}
	
	function AddHiddenField(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		return 	'\t<input type="'+sItem.type+'" '+
					'class="form-control '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
					((sItem.required === "Y") ? 'required' : '')+
				' />\r\n';
	}

	function AddSubmitButton(options, sItem) {
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		return 	'\t<div class="'+((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" )+'">\r\n'+
				'\t\t<input type="'+sItem.type+'" '+
					'class="btn btn-default '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
				' />\r\n\t</div>\r\n';
	}
});
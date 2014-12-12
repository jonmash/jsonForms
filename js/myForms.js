jQuery(document).ready(function(){
	


	
	var options= {
		action: "/",
		class: "rsvp_form",
		id: "",
		method: "POST",    		//POST or GET
		validate: "Y",     		//Y or N
		layout: ""  	//stacked or horizontal
	};
	
	var schema = [
					{
						name: "user",
						label: "User",
						type: "text",
						id: "username",
						class: "",
						value: "Something1",
						required: "Y"
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
						value: "Something@something.com",
						required: "Y"
					},
					{
						name: "password",
						label: "Password",						
						type: "password",
						id: "pass",
						class: "passField",
						value: "",
						placeholder: "Password"
					},
					{
						name: "submit",
						type: "submit",
						id: "submitBtn",
						class: "button",
						value: "Save"
					}
				];

	
	$('#formSpace').append(BuildForm(options, schema));
	
	
		
	function BuildForm(options, schema) {
		//TODO: Check options object here
	
		var text = '<form action="'+options.action+'" class="'+((options.layout === "horizontal") ? "form-horizontal " : "" )+''+options.class+'" id="'+options.id+'" method="'+options.method+'" role="form">';
		schema.forEach(function (entry) {
			text += AddField(entry);
		});
		
		text += '</form>';
		if(options.validate === "Y") { $('.rsvp_form').validate(); }
		return text;
	}
	
	function AddField(sItem) {
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
		
		return 	'<div class="form-group">\r\n'+
				'<label for="form-control '+sItem.name+'" '+
					'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
					sItem.label+
				'</label>\r\n'+
				'<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'">'+
				'<input type="'+sItem.type+'" '+
					'class="form-control '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
					'placeholder="'+sItem.placeholder+'"'+
					((sItem.required === "Y") ? 'required' : '')+
				' /></div></div>\r\n';
	}

	function AddEmailField(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		return 	'<div class="form-group">\r\n'+
					'<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+'</label>\r\n'+
					'<div class="'+((options.layout === "horizontal") ? "col-sm-10 controls " : "" )+'controls">'+
						'<div class="input-group">'+
							'<span class="input-group-addon">@</span>'+
							'<input type="'+sItem.type+'" '+
								'class="form-control '+sItem.class+'" '+
								'id="'+sItem.id+'" '+
								'value="'+sItem.value+'" '+
								'name="'+sItem.name+'" '+
								'placeholder="'+sItem.placeholder+'"'+
								((sItem.required === "Y") ? 'required' : '')+
				' /></div></div></div>\r\n';
	}
	
	function AddHiddenField(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		return 	'<input type="'+sItem.type+'" '+
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
		return 	'<div class="'+((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" )+'">'+
				'<input type="'+sItem.type+'" '+
					'class="btn btn-default '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
				' /></div>\r\n';
	}
});
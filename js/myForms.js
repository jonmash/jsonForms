jQuery(document).ready(function(){
	


	
	var default_options= {
		title: "My Magic Form",
		action: "#",
		class: "rsvp_form",
		id: "",
		method: "POST",    		//POST or GET
		validate: "Y",     		//Y or N
		layout: "horizontal"  	//stacked or horizontal
	};
	
	var default_schema = [
		{
			"name": "key",
			"label": "Key",
			"type": "hidden",
			"id": "key",
			"class": "key",
			"value": "1234567",
			"required": "N"
		},
		{
			"name":"set1",
			"label": "Login",
			"type": "fieldset",
			"inherit" : "true",
			"fields":[
				{
					"name": "user",
					"label": "User",
					"type": "text",
					"id": "username",
					"class": "",
					"value": "",
					"required": "Y",
					"placeholder": "Your Username"
				},
				{
					"name": "password",
					"label": "Password",
					"type": "password",
					"id": "pass",
					"class": "passField",
					"value": "",
					"placeholder": "Your Password"
				}
			]
		},
		{
			"name": "email",
			"label": "Email",
			"type": "email",
			"id": "email",
			"class": "",
			"value": "",
			"required": "Y",
			"placeholder": "Your Email Address"
		},
		{
			"name": "dropdown1",
			"label": "Dropdown",
			"type": "dropdown",
			"id": "dd1",
			"class": "",
			"selected":"opt2",
			"options": [
				{
					"name":"opt1",
					"value":"Option #1"
				},{
					"name":"opt2",
					"value":"Option #2"
				},{
					"name":"opt3",
					"value":"Option #3",
				}
			]
		},
		{
			"name": "dropdown2",
			"label": "Dropdown2",
			"type": "dropdown",
			"id": "dd2",
			"class": "",
			"options": [
				{
					"name":"opt1",
					"value":"Option #1"
				},{
					"name":"opt2",
					"value":"Option #2"
				},{
					"name":"opt3",
					"value":"Option #3",
					"selected":"true"
				}
			]
		},		
		{
			"name":"set2",
			"label": "Details",
			"type": "fieldset",
			"inherit" : "true",
			"fields":[
				{
					"name": "cblist1",
					"label": "CheckBox1",
					"type": "checkboxlist",
					"id": "cd2",
					"class": "",
					"options": [
						{
							"name":"opt1",
							"value":"Option #1",
							"selected":"true"
						},{
							"name":"opt2",
							"value":"Option #2"
						},{
							"name":"opt3",
							"value":"Option #3",
							"selected":"true"
						}
					]
				},
				{
					"name": "rdlist1",
					"label": "RadioList1",
					"type": "radiolist",
					"id": "rl2",
					"class": "radiolist123",
					"options": [
						{
							"name":"opt1",
							"value":"Option #1",
							"selected":"true"
						},{
							"name":"opt2",
							"value":"Option #2"
						}
					]
				}
			]
		},
		{
			"name": "submit",
			"type": "submit",
			"id": "submitBtn",
			"class": "button",
			"value": "Save"
		},
		{
			"name": "reset",
			"type": "reset",
			"id": "resetBtn",
			"class": "button",
			"value": "Reset"
		}
	];
	$('#genSchema').val(JSON.stringify(default_schema, null, "  "));
	$('#genOptions').val(JSON.stringify(default_options, null, "  "));
	
	
	//Build the form
	var default_form = BuildForm(default_options, default_schema);
	$('#formSpace').html(default_form);
	$('#codeSpace').text(default_form);
	
	$('#generator').submit(UpdateForm);
	$('#genOptions').on('input propertychange paste', UpdateForm);
	$('#genSchema').on('input propertychange paste', UpdateForm);
	
	function UpdateForm(e) {
		if(e.type != "paste") 
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
			case "dropdown":
				retVal = AddDropdownField(options, sItem);
				break;	
			case "checkboxlist":
				retVal = AddCheckboxList(options, sItem);
				break;	
			case "radiolist":
				retVal = AddRadioList(options, sItem);
				break;					
			case "hidden":
				retVal = AddHiddenField(options, sItem);
				break;	
			case "submit":
				retVal = AddSubmitButton(options, sItem);
				break;		
			case "reset":
				retVal = AddResetButton(options, sItem);
				break;	
			case "fieldset":
				retVal = AddFieldset(options, sItem);
				break;					
			default:
				console.log("Unknown type: ", sItem);
				break;
		}
		return retVal;
	}
	function AddTextField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtField";
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
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "email";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		return 	'\t<div class="form-group">\r\n'+
					'\t\t<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+'</label>\r\n'+
					'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'controls">\r\n'+
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
	
	function AddDropdownField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtField";
		sItem.selected = sItem.selected || "";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			var asembleOptions = "";
			sItem.options.forEach(function (entry) {
				asembleOptions += AddSelectOptions(entry, sItem.selected);
			});
			
			return 	'\t<div class="form-group">\r\n'+
					'\t\t<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+
					'</label>\r\n'+
					'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'">\r\n'+
					'\t\t\t<select '+
						'class="form-control '+sItem.class+'" '+
						'id="'+sItem.id+'" '+
						'name="'+sItem.name+'">\r\n'+
						asembleOptions +
					'\t\t\t</select>\r\n\t\t</div>\r\n\t</div>\r\n';
		}	
	}
	
	function AddSelectOptions(oItem, select) {
		oItem.name = oItem.name || "opt";
		oItem.value = oItem.value || "Undefined";
		oItem.class = oItem.class || "";
		oItem.id = oItem.id || "";
		
		var selected = (oItem.selected === "true" || oItem.name === select);
		
		return 	'\t\t\t\t<option '+
					'class="form-control '+oItem.class+'" '+
					'id="'+oItem.id+'" '+
					'name="'+oItem.name+'" '+
					((selected == true) ? 'selected="selected"': '') + '>'+
					oItem.value+
					'</option>\r\n';
	}
	
	function AddHiddenField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtHidden";
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
		sItem.name = sItem.name || "submitBtn";
		sItem.value = sItem.value || "Save";
		return 	'\t<div class="form-group">\r\n'+
				'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" )+'">\r\n'+
				'\t\t\t<input type="'+sItem.type+'" '+
					'class="btn btn-default '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
				' />\r\n\t\t</div>\r\n\t</div>\r\n';
	}
	function AddResetButton(options, sItem) {
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "resetBtn";
		sItem.value = sItem.value || "Reset";
		return 	'\t<div class="form-group">\r\n'+
				'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" )+'">\r\n'+
				'\t\t\t<input type="'+sItem.type+'" '+
					'class="btn btn-default '+sItem.class+'" '+
					'id="'+sItem.id+'" '+
					'value="'+sItem.value+'" '+
					'name="'+sItem.name+'" '+
				' />\r\n\t\t</div>\r\n\t</div>\r\n';
	}
	
	function AddCheckboxList(options, sItem) {
		sItem.name = sItem.name || "checkbox";
		sItem.label = sItem.label || "Undefined";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			var asembleFields = "";
			sItem.options.forEach(function (entry) {
				entry.name = sItem.name+'[]';
				entry.value = entry.value || "undefined";
				entry.selected = entry.selected || "false";
				
				var selected = (entry.selected == "true");
				asembleFields += 	'\t\t\t\t<div class="checkbox">\r\n'+
									'\t\t\t\t\t<label>\r\n'+
									'\t\t\t\t\t\t<input type="checkbox" value="" name="'+
									entry.name +'" '+
									((selected == true) ? 'checked="checked"':'') + '>\r\n'+
									'\t\t\t\t\t\t'+entry.value + '\r\n'+
									'\t\t\t\t\t</label>\r\n\t\t\t\t</div>\r\n';
			});
			
			return 	'\t<div class="form-group">\r\n'+
					'\t\t<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+'</label>\r\n'+
					'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'controls">\r\n'+
						'\t\t\t<div class="input-group">\r\n'+
						asembleFields + 
					'\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n';
					
		}	
	}
	
	function AddRadioList(options, sItem) {
		sItem.name = sItem.name || "checkbox";
		sItem.label = sItem.label || "Undefined";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			var asembleFields = "";
			sItem.options.forEach(function (entry) {
				entry.name = sItem.name+'[]';
				entry.value = entry.value || "undefined";
				entry.selected = entry.selected || "false";
				
				var selected = (entry.selected == "true");
				asembleFields += 	'\t\t\t\t<div class="radio">\r\n'+
									'\t\t\t\t\t<label>\r\n'+
									'\t\t\t\t\t\t<input type="radio" value="" name="'+
									entry.name +'" '+
									((selected == true) ? 'checked="checked"':'') + '>\r\n'+
									'\t\t\t\t\t\t'+entry.value + '\r\n'+
									'\t\t\t\t\t</label>\r\n\t\t\t\t</div>\r\n';
			});
			
			return 	'\t<div class="form-group">\r\n'+
					'\t\t<label for="form-control '+sItem.name+'" '+
						'class="'+((options.layout === "horizontal") ? "col-sm-2 " : "" )+'control-label">'+
						sItem.label+'</label>\r\n'+
					'\t\t<div class="'+((options.layout === "horizontal") ? "col-sm-10 " : "" )+'controls">\r\n'+
						'\t\t\t<div class="input-group">\r\n'+
						asembleFields + 
					'\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n';
					
		}	
	}
	
	function AddFieldset(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.name = sItem.name || "fieldset";
		sItem.inherit = sItem.inherit || "false";
		
		if (typeof sItem.fields !== 'undefined' && sItem.fields.length > 0) {
			var asembleFields = "";
			sItem.fields.forEach(function (entry) {
				entry.name = entry.name || "undefined";
				
				if(sItem.inherit == "true") {
					entry.name = sItem.name + '.' + entry.name;
				}
				asembleFields += AddField(options, entry);
			});
			
			return 	'\t<fieldset name="'+
						sItem.name +
						'">\r\n\t\t\<legend>'+
						sItem.label+'</legend>\r\n'+
						asembleFields +
					'\t</fieldset>\r\n';
		}	
	}
});
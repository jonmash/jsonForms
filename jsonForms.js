/*! 
	* jsonForms v0.1.1
	* (c) 2014 jMash 
	*   jonmash.ca 
	*   github.com/jonmash 
	* Released under the MIT license
*/
if(!window.jQuery) {
	throw new Error('jQuery not loaded');
}

if(!jQuery().validate) {
	throw new Error('jQuery validate not loaded');
}

jQuery.validator.setDefaults({
    errorElement: "span",
    errorClass: "help-block",
    highlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function (element, errorClass, validClass) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorPlacement: function (error, element) {
        if (element.parent('.input-group').length || element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

jsonForms = (function ($) {
	var me = {};
	
	me.BuildForm = function (options, schema, submitCallback) {
		if(!options) options = {};
		if(!schema) throw new Error('Schema not specified');
		
		options.title    = options.title    || "";
		options.layout   = options.layout   || "horizontal";
		options.action   = options.action   || "";
		options.class    = options.class    || "";
		options.id       = options.id       || makeID(5);
		options.method   = options.method   || "post";
		options.validate = options.validate || "Y";
		
		var container = $('<div />').addClass('jsonform-container');
		
		var hdng = 	$('<h1 />')
					.text(options.title);

		var form = 	$('<form />')
					.attr("action", options.action)
					.addClass(((options.layout === "horizontal") ? "form-horizontal " : "" ))
					.addClass(options.class)
					.addClass('rsvp_form')
					.attr('id', options.id)
					.attr('method', options.method)
					.attr('role', 'form');
					//.attr('enctype', 'multipart/form-data');
					
		schema.forEach(function (entry) {
			form = form.append(AddField(options, entry));
		});
		
		container = container.append(hdng).append(form);
		
		if(options.validate === "Y") { form.validate(); }
		
		form.submit(submitCallback);
		
		return container;
	}

	function AddField(options, sItem) {
		var retVal = "";
		switch(sItem.type){
			case "text":
				retVal = AddTextField(options, sItem);
				break;
			case "password":
				retVal = AddPasswordField(options, sItem);
				break;
			case "email":
				retVal = AddEmailField(options, sItem);
				break;	
			case "url":
				retVal = AddURLField(options, sItem);
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
		
		var grp  = 	$('<div />').addClass('form-group');
		var lbl  = 	$('<label />')
					.attr('for', sItem.name)
					.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
					.addClass('control-label')
					.text(sItem.label);
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ));
		var fld  = 	$('<input />')
					.attr('type', 'text')
					.addClass('form-control')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name)
					.attr('placeholder', sItem.placeholder)
					.prop('required',(sItem.required === "Y"));
					
		grp  = grp.append(lbl);
		clmn = clmn.append(fld);
		grp  = grp.append(clmn);
		
		return grp;
	}
	
	function AddPasswordField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtField";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		var grp  = 	$('<div />').addClass('form-group');
		var lbl  = 	$('<label />')
					.attr('for', sItem.name)
					.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
					.addClass('control-label')
					.text(sItem.label);
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ));
		var fld  = 	$('<input />')
					.attr('type', 'password')
					.addClass('form-control')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name)
					.attr('placeholder', sItem.placeholder)
					.prop('required',(sItem.required === "Y"));
					
		grp  = grp.append(lbl);
		clmn = clmn.append(fld);
		grp  = grp.append(clmn);
		
		return grp;
	}

	function AddEmailField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "email";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		var grp  = 	$('<div />').addClass('form-group');
		var lbl  = 	$('<label />')
					.attr('for', sItem.name)
					.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
					.addClass('control-label')
					.text(sItem.label);
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ));
		var igrp = 	$('<div />').addClass('input-group');
		var span =  $('<span />').addClass('input-group-addon').html('<span class="glyphicon glyphicon-envelope"></span>');
		var fld  = 	$('<input />')
					.attr('type', 'email')
					.addClass('form-control')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name)
					.attr('placeholder', sItem.placeholder)
					.prop('required',(sItem.required === "Y"));

		grp  = grp.append(lbl);
		igrp = igrp.append(span).append(fld);
		clmn = clmn.append(igrp);
		grp  = grp.append(clmn);
					
		return grp;
	}

	function AddURLField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "url";
		sItem.value = sItem.value || "";
		sItem.required = sItem.required || "N";
		sItem.placeholder = sItem.placeholder || "";
		
		var grp  = 	$('<div />').addClass('form-group');
		var lbl  = 	$('<label />')
					.attr('for', sItem.name)
					.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
					.addClass('control-label')
					.text(sItem.label);
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ));
		var igrp = 	$('<div />').addClass('input-group');
		var span =  $('<span />').addClass('input-group-addon').html('<span class="glyphicon glyphicon-link"></span>');
		var fld  = 	$('<input />')
					.attr('type', 'url')
					.addClass('form-control')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name)
					.attr('placeholder', sItem.placeholder)
					.prop('required',(sItem.required === "Y"));

		grp  = grp.append(lbl);
		igrp = igrp.append(span).append(fld);
		clmn = clmn.append(igrp);
		grp  = grp.append(clmn);
					
		return grp;
	}
	
	function AddDropdownField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtField";
		sItem.selected = sItem.selected || "";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			
			var grp  = 	$('<div />').addClass('form-group');
			var lbl  = 	$('<label />')
						.attr('for', sItem.name)
						.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
						.addClass('control-label')
						.text(sItem.label);
			var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ));
			var sel  =  $('<select />')
						.addClass('form-control')
						.addClass(sItem.class)
						.attr('id', sItem.id)
						.attr('name', sItem.name);
						
			sItem.options.forEach(function (entry) {
				sel = sel.append(AddSelectOptions(entry, sItem.selected));
			});
			
			grp  = grp.append(lbl);
			clmn = clmn.append(sel);
			grp  = grp.append(clmn);
			
			return grp;
		}	
	}

	function AddSelectOptions(oItem, select) {
		oItem.name = oItem.name || "opt";
		oItem.value = oItem.value || "Undefined";
		oItem.class = oItem.class || "";
		oItem.id = oItem.id || "";
		
		var selected = (oItem.selected === "true" || oItem.name === select);
		
		var opt = 	$('<option />')
					.addClass('form-control')
					.addClass(oItem.class)
					.attr('id', oItem.id)
					.attr('name', oItem.name)
					.text(oItem.value);
		if(selected)
			opt = opt.prop('selected', true);
		
		return opt;
	}

	function AddHiddenField(options, sItem) {
		sItem.label = sItem.label || "Undefined";
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "txtHidden";
		sItem.value = sItem.value || "";
		
		var fld  = 	$('<input />')
					.attr('type', 'hidden')
					.addClass('form-control')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name);
					
		return fld;
	}

	function AddSubmitButton(options, sItem) {
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "submitBtn";
		sItem.value = sItem.value || "Save";
		
		var grp  = 	$('<div />').addClass('form-group');
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" ));
		var fld  = 	$('<input />')
					.attr('type', 'submit')
					.addClass('btn')
					.addClass('btn-default')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name);
					
		clmn = clmn.append(fld);
		grp  = grp.append(clmn);
		
		return grp;
	}
	function AddResetButton(options, sItem) {
		sItem.class = sItem.class || "";
		sItem.id = sItem.id || "";
		sItem.name = sItem.name || "resetBtn";
		sItem.value = sItem.value || "Reset";
		
		var grp  = 	$('<div />').addClass('form-group');
		var clmn = 	$('<div />').addClass(((options.layout === "horizontal") ? "col-sm-offset-2 col-sm-10 " : "" ));
		var fld  = 	$('<input />')
					.attr('type', 'reset')
					.addClass('btn')
					.addClass('btn-default')
					.addClass(sItem.class)
					.attr('id', sItem.id)
					.attr('value', sItem.value)
					.attr('name', sItem.name);
					
		clmn = clmn.append(fld);
		grp  = grp.append(clmn);
		
		return grp;
	}

	function AddCheckboxList(options, sItem) {
		sItem.name = sItem.name || "checkbox";
		sItem.label = sItem.label || "Undefined";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			var grp  = 	$('<div />').addClass('form-group');
			var lbl  = 	$('<label />')
						.attr('for', sItem.name)
						.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
						.addClass('control-label')
						.text(sItem.label);
			var clmn = 	$('<div />')
						.addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ))
						.addClass('controls');
			var igrp =  $('<div />').addClass('input-group');
			
			sItem.options.forEach(function (entry, i) {
				entry.name = entry.name || "cb"+i;
				entry.value = entry.value || "cb"+i;
				entry.selected = entry.selected || "false";
				
				var selected = (entry.selected == "true");
				
				var div = 	$('<div />').addClass('checkbox');
				var lbl2 = 	$('<label />').text(entry.value);
				var inp = 	$('<input />')
							.attr('type', 'checkbox')
							.attr('name', sItem.name+'[]')
							.attr('value', entry.name);
				
				if(selected) inp = inp.prop('checked', true);
							
				lbl2 = lbl2.prepend(inp);
				div = div.append(lbl2);
				igrp = igrp.append(div);
			});
			
			clmn = clmn.append(igrp);
			grp = grp.append(lbl).append(clmn);
			
			return grp;					
		}	
	}

	function AddRadioList(options, sItem) {
		sItem.name = sItem.name || "checkbox";
		sItem.label = sItem.label || "Undefined";
		
		if (typeof sItem.options !== 'undefined' && sItem.options.length > 0) {
			var grp  = 	$('<div />').addClass('form-group');
			var lbl  = 	$('<label />')
						.attr('for', sItem.name)
						.addClass(((options.layout === "horizontal") ? "col-sm-2 " : "" ))
						.addClass('control-label')
						.text(sItem.label);
			var clmn = 	$('<div />')
						.addClass(((options.layout === "horizontal") ? "col-sm-10 " : "" ))
						.addClass('controls');
			var igrp =  $('<div />').addClass('input-group');
			
			sItem.options.forEach(function (entry, i) {
				//entry.name = (entry.name ? sItem.name+'['+entry.name+']' : sItem.name+'['+i+']');
				entry.value = entry.value || "opt"+i;
				entry.name = entry.name || "opt"+i;
				entry.selected = entry.selected || "false";
				
				var selected = (entry.selected == "true");
				
				var div = 	$('<div />').addClass('radio');
				var lbl2 = 	$('<label />').text(entry.value);
				var inp = 	$('<input />')
							.attr('type', 'radio')
							.attr('name', sItem.name+'[]')
							.attr('value', entry.name);
				
				if(selected) inp = inp.prop('checked', true);
							
				lbl2 = lbl2.prepend(inp);
				div = div.append(lbl2);
				igrp = igrp.append(div);
			});
			
			clmn = clmn.append(igrp);
			grp = grp.append(lbl).append(clmn);
			
			return grp;					
		}	
	}

	function AddFieldset(options, sItem) {
		sItem.label = sItem.label || "";
		sItem.name = sItem.name || "fieldset";
		sItem.inherit = sItem.inherit || "false";
		
		if (typeof sItem.fields !== 'undefined' && sItem.fields.length > 0) {
			var  fs  = 	$('<fieldset />')
						.attr('name', sItem.name);
			var lgnd = 	$('<legend />').text(sItem.label);
			
			fs = fs.append(lgnd);
			
			sItem.fields.forEach(function (entry) {
				entry.name = entry.name || "undefined";
				
				if(sItem.inherit == "true") {
					entry.name = sItem.name + '.' + entry.name;
				}
				fs = fs.append(AddField(options, entry));
			});
			
			return fs;
		}	
	}
	
	function makeID(n)
	{
		n = parseInt(n) || 5;
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < n; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	
	return me;
}(jQuery));
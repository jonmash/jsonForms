jsonForms
=========

The jsonForms library is a small JavaScript client-side library that takes 
a set of options and a structured JSON data model as input and returns a 
[Bootstrap](http://getbootstrap.com/)-friendly HTML form that matches the schema.

The generated form includes client-side validation logic using 
[jQuery Validate](http://jqueryvalidation.org/) that provides instant feedback 
to the user upon submission. If all the field values are valid, then the form 
is submitted and a customizable callback is issued.

Getting started
---------------

The example below creates a form that asks for the user's name and age. The 
user's name is a required field, while the age is optional.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>jsonForms Simple Example</title>
	
	<link href="../css/bootstrap.min.css" rel="stylesheet">
  </head>
  <body>
	<div class="row">
		<div class="col-md-3">&nbsp;</div>
		<div class="col-md-6">
			<div id="formSpace"><small>Loading...</small></div><br />
		</div>
		<div class="col-md-3">&nbsp;</div>
	</div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="../js/jquery.validate.min.js"></script>
	<script src="../js/jsonForms.js"></script>
	<script type="text/javascript">
		var schema = [
			{
				"name": "email",
				"label": "Email",
				"type": "email",
				"required": "Y"
			},
			{
				"name": "password",
				"label": "Password",
				"type": "password",
				"required": "Y"
			},
			{
				"name": "submit",
				"type": "submit",
				"value": "Login"
			}
		];
		$('#formSpace').html(jsonForms.BuildForm(null, schema));
	</script>
  </body>
</html>
```

[See the example in action here](https://rawgit.com/jonmash/jsonForms/master/examples/simple.html)

Loading this page in a browser renders a form with two input fields and a submit button. 
Both of the fields implement the ```required``` option meaning that if nothing is entered, 
an error message will be displayed.

Documentation
-------------

You can do much more with the jsonForms library. You may define a more complex data model 
that fieldsets, checkboxes, dropdown menus, etc. For more information, check the 
[documentation for jsonForms](https://github.com/jonmash/jsonForms/wiki).


Sandbox
-------
If you're more of a do'er type than a reader, the 
[jsonForms Sandbox](https://rawgit.com/jonmash/jsonForms/master/test.html) is a simple 
jsonForms powered editor that lets you try out and extend all the examples in the doc.


Dependencies
------------

The jsonForms library requires:
- [jQuery](http://jquery.com/)
- The [jQuery Validate](http://jqueryvalidation.org/) plugin

The jsonForms library may require further libraries, depending on the features you need for the forms you need to render. In particular:
- [Bootstrap CSS](http://getbootstrap.com/) v3.3.1 or above is more or less needed. You can get away without it but all of the jsonForms forms are rendered with Bootstrap in mind.

![alt tag](https://raw.githubusercontent.com/jonmash/jsonForms/master/examples/compare.png)

All of these libraries are in the repository, although you might want to check their respective Web site for more recent versions.

Note: jsonForms uses ```JSON.parse``` and ```JSON.stringify``` which are normally supported by modern browsers. If you need to support other browsers, consider adding a JSON library.


License
-------

The jsonForms library is licensed under the [MIT license](https://raw.githubusercontent.com/jonmash/jsonForms/master/LICENSE).

All the libraries that jsonForms depends on are also licensed under the MIT license.
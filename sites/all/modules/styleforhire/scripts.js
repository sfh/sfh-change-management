
var testing = 0;

$(document).ready(function() {
	$("#block-uc_cart-0").hide();
	//var testing = 0;
	$("a#cartview").click(function () {
		if (testing  == 0) {
			
			/* */
			//$("#block-uc_cart-0").slideDown("slow").fadeTo("slow", 1, function() { 			});
			testing = 1;			
			$("#dialog_cartbox").dialog("open");
			
		} else {
			/* */
			//$("#block-uc_cart-0").fadeTo("slow", 0).slideUp("slow", function () { 			}); 
			testing = 0;			
		}
		return false;
	});
	
	
	$("a#cartview_close").click(function () {
		 $("#block-uc_cart-0").fadeTo("slow", 0).slideUp("slow");
		 testing = 0;
	 
   	return false;
	});	
	
	
})

Drupal.behaviors.your_module = function(context) {
$("#edit-attributes-7").removeClass('resizable');
}

/* Subu added to create expand collapse block */
$(document).ready(function(){
	
	$(".toggle_container").hide();

	$("h6.trigger").toggle(function(){
		$(this).addClass("active"); 
		}, function () {
		$(this).removeClass("active");
	});
	
	$("h6.trigger").click(function(){
		$(this).next(".toggle_container").slideToggle("slow,");
	});

});

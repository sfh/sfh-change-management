/* Subu added to create expand collapse block for zip code entering*/
$(document).ready(function(){
	
	$("#styleforhire-basic-search-form").hide();

	$("#findStylist-text").toggle(function(){
		$(this).addClass("active"); 
		}, function () {
		$(this).removeClass("active");
	});
	
	$("#findStylist-text").click(
		function(){
		$("#styleforhire-basic-search-form").slideToggle("slow,");
		});

});
$(document).ready(function() {
	$("#block-styleforhire-4").hide();
	var testing = 0;
	$("a.adv-search").click(function () {
		if (testing  == 0) {
			$("#block-styleforhire-4").slideDown("slow").fadeTo("slow", 1);
			testing = 1;
		} else {
			$("#block-styleforhire-4").fadeTo("slow", 0).slideUp("slow");
			testing = 0;
		}
		return false;
	});
})
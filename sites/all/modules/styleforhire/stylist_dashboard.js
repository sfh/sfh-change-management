
	$(function() {
		$( "#selectable" ).selectable();
	});
	
	


$(document).ready(function() {

	var dialog = $('<div id="dialog" style="display:none;" title="Thank you!"><p>These changes have been saved.</p></div>');
	$("body").append(dialog);		
		$("#dialog").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},
			/*buttons: {
				"Ok": function() {
					$(this).dialog("close");
				}
			}*/
		});

	$('#stylist-testimonials-form').submit(function(){
		//alert("Thank you! These changes have been saved.");
		$("#dialog").dialog("open");
	});
	$('#stylist-case-study1-form').submit(function(){
		//alert("Thank you! These changes have been saved.");
		$("#dialog").dialog("open");
	});
	$('#stylist-basic-personal-form').submit(function(){
		//alert("Thank you! These changes have been saved.");
		$("#dialog").dialog("open");
	});
	$('#stylist-profile-form').submit(function(){
		//alert("Thank you! These changes have been saved.");
		$("#dialog").dialog("open");
	});
	$('#stylist-rate-and-preferences-form').submit(function(){
		//alert("Thank you! These changes have been saved.");
		$("#dialog").dialog("open");
	});
	
	
	$('#edit-affiliations').each(function() {
	if(this.value === 'Relevant trade or professional organization memberships and volunteer experience. Ex. NAPO, Girl Scout Troop Leader, AICI, Junior League DC, on the board of local Dress for Success, PTA.')
	{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
	}
	});
	
		$('#edit-introduction').each(function() {
		if(this.value === 'Ex. I am a down-to-earth mother of two with an eye for high style and a nose for bargains.  My mother owned a small boutique so you could even say I was born into fashion!  I love mixing and matching brands and prices to create amazing outfits for women who are looking to update their work and casual looks.')
		{
			var default_value = this.value;
			$(this).css('color', '#747170'); // this could be in the style sheet instead
			$(this).focus(function() {
				if(this.value == default_value) {
					this.value = '';
					$(this).css('color', '#000000');
				}
			});
			$(this).blur(function() {
				if(this.value == '') {
					$(this).css('color', '#747170');
					this.value = default_value;
				}
			});
		}
	});
	

	$('#edit-education').each(function() {
		if(this.value === 'Ex.  I have a BA in Fashion Merchandising from X College, attended AICIs 2009 Workshop, apprenticed with a professional stylist for 2 years, interned at Glamour in 2003.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});

	$('#edit-things-i-love').each(function() {
		if(this.value === 'Let your personality shine here. We want to know about your aesthetic but also about you: Ex. Ballroom dancing, favorite movie is Moonstruck, 1960 Harper Bazaar, Vintage DVF wrap dresses, cats over dogs, my Hermes cuff with my tailored H&M dress.  I love taking my kids to the park on Saturday afternoons and movies with my best friend from high school.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});


	$('#edit-experience').each(function() {
		if(this.value === 'Ex.  I have had my own styling business for 5 years, prior to that I worked at Nordstrom as a personal shopper for 3 years.  I have moonlighted as a tailor and used to be a buyer at Ralph Lauren.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	
	$('#edit-testimonial1').each(function() {
		if(this.value === 'Ex. Sally was amazing!  She helped me clean out my closet (and even convinced me to get rid of my too-small high school jeans), and we were able to make a bunch of outfits out of what was left.  She even found me the PERFECT reunion dress.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	$('#edit-testimonial2').each(function() {
		
		if(this.value === 'Ex. Sally was amazing!  She helped me clean out my closet (and even convinced me to get rid of my too-small high school jeans), and we were able to make a bunch of outfits out of what was left.  She even found me the PERFECT reunion dress.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	$('#edit-testimonial3').each(function() {
		if(this.value === 'Ex. Sally was amazing!  She helped me clean out my closet (and even convinced me to get rid of my too-small high school jeans), and we were able to make a bunch of outfits out of what was left.  She even found me the PERFECT reunion dress.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	$('#edit-testimonial-name1').each(function() {
		if(this.value === 'Enter initials here with periods, ex. S.L.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	$('#edit-testimonial-name2').each(function() {
		if(this.value === 'Enter initials here with periods, ex. S.L.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	$('#edit-testimonial-name3').each(function() {
		if(this.value === 'Enter initials here with periods, ex. S.L.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	
	$('#edit-casestudy1').each(function() {
		if(this.value === 'S.L. is a 40 something professional in the finance sector who felt that her work wardrobe was drastically out of date.  Using an amazing tailor, we were able to modernize most of her staple blazers and trousers, which allowed us to spend more on chic new tops, shoes and accessories to up her style-ante.')
		{
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
		}
	});
	
	// Theming tables in dashboard
	$(".jtable th").each(function(){
		$(this).addClass("ui-state-default");
	});
	$(".jtable td").each(function(){
		$(this).addClass("ui-widget-content");
	});
	$(".jtable tr").hover(
		function()
		{
			$(this).children("td").addClass("ui-state-hover");
		},
		function()
		{
			$(this).children("td").removeClass("ui-state-hover");
		}
	);
});
/*
$(document).ready(function() {
	
	$('#edit-introduction').each(function() {
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
	});
});
	
$(document).ready(function() {
	$('#edit-things-i-love').each(function() {
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
	});
});	

$(document).ready(function() {
	$('#edit-education').each(function() {
		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
	});
});
	

*/
function def_text($var){
$($var).each(function() {

		var default_value = this.value;
		$(this).css('color', '#747170'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#747170');
				this.value = default_value;
			}
		});
	});

}



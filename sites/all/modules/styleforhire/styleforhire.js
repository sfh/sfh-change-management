function update_calendar(uid, next_day, requested_hours) {

	var URL = '/generate_calendar/' + uid + '/' + next_day + '/' + requested_hours;

	//alert(URL);

	$.get(URL, _update_calendar_callback, 'json');
}

function _update_calendar_callback(data, status) {

	var data = eval('(' + data + ')');
	$("#calendar-container").html(data);
}

function update_requested_date(requested_date, clean_date) {

	$("#requested_date").html(clean_date);
	$("#chosen_date").val(requested_date);
}

function adv_search_response(data, status) {

	var data = eval('(' + data + ')');

	if ( data["num_of_results"] == '0')
	{
		var param = window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);
		if(param.indexOf("%20")>0)	param = param.substring(0,param.indexOf("%20"))+ " " + param.substring(param.indexOf("%20")+3);
		$("#search_results").html(	'<div class="para-with-space">We\'re so sorry we do not yet have stylists serving the <b>'+param+'</b> zip code! If you\'d like to be notified when we do, please register below.  To thank you for your interest, we will deposit a $25 credit into your account to be used toward a future styling appointment.</div>' +
									data["results_html"] +
									'<div class="para-with-space">If you are a Stylist and would like to partner with us, <a href="/interested-in-becoming-a-stylist">please click here.</a><br>If you are a Retailer and would like to partner with us, <a href="/partnership-application">please click here.</a></div>');
		//$("#search_results").html(data["results_html"]);
	}
	else {
		
		$("#search_results").html(data["results_html"]);
		fadeInResults(0, data["num_of_results"]);
		$("#compare_stylists").html(data["compare_html"]);
	}
}

function update_chosen_date(uid, requested_hours, requested_date) {

	$("#edit-chosen-date").val(requested_date);
	$("#requested_date").html(requested_date);

	var URL = '/open_slots/' + uid + '/' + requested_hours + '/' + requested_date;

	$.get(URL, update_availible_times, 'json');
}

function update_availible_times(data, status) {

	var data = eval('(' + data + ')');

	$('#edit-start-time').find('option').remove().end();

	for (var key in data) {

		$('#edit-start-time').append($("<option></option>").attr("value",key).text(data[key]));
	}
}

function fadeIn(id) {

	$('#' + id).fadeIn('slow');
}

function fadeInResults(current, max) {

	if ( current == max)
	{
		//$("#edit-search").attr('disabled', false);
		return;
	}

	$('#stylist_' + current).fadeIn("slow");

	current++;

	setTimeout('fadeInResults('+current+', '+max+')', 300);
}

function basic_search_submit(zip) {
	var URL = '/adv_search/results/s_radius=50;s_zipcode=' + zip;
    if(zip.indexOf('s_name=') > -1){
		URL = '/adv_search/results/' + zip+";";
	}
	//alert(URL);

	$.get(URL, adv_search_response, 'json');
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function adv_search_submit(form, page) {

	//alert(page);

	var URL = '';

	//$("#edit-search").attr('disabled', true);

	for(i=0; i<form.elements.length; i++) {

		if ( form.elements[i].name.substring(0, 2) == "s_") {
		
			if (form.elements[i].type != "checkbox")
			{
				URL = URL + form.elements[i].name + '=' + form.elements[i].value + ';';
			}
			else {
				if ( form.elements[i].checked == true)
				{
					pos = form.elements[i].name.search('[0-9]+');
					URL = URL + form.elements[i].name.substring(0, pos-1) + '=' + form.elements[i].value + ';';
				}
				else {
					//URL = URL + form.elements[i].name + '=' + form.elements[i].value + ';';
				}
			}
		}
	}

	if ( page == 0)
	{
		//setCookie('adv_search_url', URL, 1);
		location = '/adv_search/forward/' + URL;
	}
	else{

		$.get('/adv_search/results/' + URL, adv_search_response, 'json');
	}
}

function adv_search_compare() {

	$('#adv_search_container').fadeOut('fast');
	$('#compare_stylists_container').fadeIn('fast');
}

function adv_search_return() {

	$('#compare_stylists_container').fadeOut('fast');
	$('#adv_search_container').fadeIn('fast');
}

function hide(id) {

	$('#'+id).fadeOut('fast');
}

function show(id) {

	$('#'+id).fadeIn('fast');
}

function show_column(checkbox, uid) {

	//alert(checkbox.value);

	if ($('#compare_checkbox_' + uid).attr('checked') == true)
	{
		$('td[id^=column_' + uid + ']').fadeIn('fast');
	}
	else {
		$('td[id^=column_' + uid + ']').fadeOut('fast');
	}
}


function remove_column(uid) {

	$('td[id^=column_' + uid + ']').fadeOut('fast');
	$('#compare_checkbox_' + uid).attr('checked', false);
}

function goto_stylist(uid) {

	window.location = "/stylist/" + uid;
}

function update_photo(id, select) {

	$('#'+select+' .lookbookPhotos').addClass('hiddenPhotos');
	
	$('#'+id).removeClass('hiddenPhotos');

}


function validate(address) {
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   //var address = document.forms[form_id].elements[email].value;
   if(reg.test(address) == false) {
      alert('Invalid Email Address');
      return false;
   }
}

/* Subu added to create expand collapse zip block - doesnt work*/
/*$(document).ready(function(){
	
	$(".styleforhire_basic_search_form_toggle_container").hide();

	$("h9.styleforhire_basic_search_form_trigger").toggle(function(){
		$(this).addClass("active"); 
		}, function () {
		$(this).removeClass("active");
	});
	
	$("h9.styleforhire_basic_search_form_trigger").click(function(){
		$(this).next(".styleforhire_basic_search_form_toggle_container").slideToggle("slow,");
	});

});
*/

$(document).ready(function() {
	$('#edit-s-zip').each(function() {
		var default_value = this.value;
		//alert(default_value);
		//$(this).css('color', '#666'); // this could be in the style sheet instead
		$(this).focus(function() {
			if(this.value == default_value) {
				this.value = '';
				$(this).css('color', '#000000');
			}
		});
		$(this).blur(function() {
			if(this.value == '') {
				$(this).css('color', '#D4D4D4');
				this.value = default_value;
			}
		});
	});
});
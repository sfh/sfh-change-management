$(document).ready(function(){
$('#tabbed-interface div').hide(); // Hide all divs
$('#tabbed-interface div:first').show(); // Show the first div
$('#tabbed-interface ul li:first').addClass('active'); // Set the class of the first link to active
$('#tabbed-interface ul li a').click(function(){ //When any link is clicked
$('#tabbed-interface ul li').removeClass('active'); // Remove active class from all links
$(this).parent().addClass('active'); //Set clicked link class to active
var currentTab = $(this).attr('href'); // Set variable currentTab to value of href attribute of clicked link
$('#tabbed-interface div').hide(); // Hide all divs
$(currentTab).show(); // Show div with id equal to variable currentTab
return false;
});
});
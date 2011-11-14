
var cal;
var startGlob;
var endGlob;
var dialogCal;


$(document).ready(function() {
		dashboard();
		
		/***** initializing the dialog */
		dialogModifyAppt = $(	'<div id="dialogModifyAppt" style="display:none;" title="Modify Appointment">'+
						/*'<div> Appointment Type: <input id="app-type" name="appointment-type" type="text"></div>' +*/
						'<div id="newdateandtime">Move the appointment to </div>' +
						'<div> Date <input id="datepicker" name="newdate" type="text"></div>'+
						'<div> Time <input id="modify-date-time" name="newtime" type="text"></div>'+
						'<input id="appt_node_id" name="appt_node_id" type="hidden">'+
						'<input id="appt_type_id" name="appt_type_id" type="hidden">'+
						'</div>');

$("body").append(dialogModifyAppt);	

$("#dialogModifyAppt").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},
			buttons: {
				"Cancel": function() {
					$(this).dialog("close"); 
				},
				"Confirm": function() {
					var fr_temps = $("#modify-date-time").val();
					if(	fr_temps === ''){
										alert("Please set the time before proceeding.");
										return;
						}
					var fr_date = $("#datepicker").val()
					if(	fr_date === ''){
										alert("Please set the date before proceeding.");
										return;
						}
					dialogModifyApptConfirm = $('<div id="dialogModifyApptConfirm" style="display:none;" title="Confirm Change">'+
							'Are you sure you want to move the appointment to ' +
							$("#datepicker").val() + ' at ' + $("#modify-date-time").val() + '</div>');
					$("body").append(dialogModifyApptConfirm);	
					$("#dialogModifyApptConfirm").dialog({
						autoOpen: true,
						width: 600,
						modal: true, 
						overlay: { 
							opacity: 0.5, 
							background: "black" 
						},
						buttons: {
							"No": function() {
								$(this).dialog("close"); 
							},
							"Yes": function() {
								$(this).dialog("close"); 
								// do things here to confirm the changes.
								var d = new Date($("#datepicker").val() + ' ' + $("#modify-date-time").val());
								$("#dialogBusy").dialog("open");
									$.ajax({
										type: 'post',
										url: '/stylist_modify_appointment/'+Drupal.settings.userid,
										data: { 'appt_node_id':$("#appt_node_id").val(),
												'start':Math.round(d.getTime()/1000),
												'appt_type_id':$("#appt_type_id").val(),
												'client_id':$("#client_id").val(),
												},
										success: function(res) {
											location.reload();
											$("#dialogBusy").dialog("close");
											$("#alertRslt").html("The appointment has been modified. Please wait for your browser to get refreshed...");
											$("#dialogAlertTest").dialog("open");
										}
									});
								$("#dialogModifyAppt").dialog("close");
							}
						}
					});
			}
			}
		});
		$( "#datepicker" ).datepicker({
			minDate:0
		});	
		$("#modify-date-time").timepicker({
			ampm: true,
			stepMinute: 15,
			hourMin: 7,
			hourMax: 22
		});
		
		dialogAlertTest = $('<div id="dialogAlertTest" style="display:none;" title="Confirmation">'+
							'<p><span id="alertRslt"></span></p></div>');
		$("body").append(dialogAlertTest);	
		$("#dialogAlertTest").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},buttons: {
				"Close": function() {
					$(this).dialog("close"); 
			}
			}
		});
		
		dialogBusy = $('<div id="dialogBusy" style="display:none;" title="Please wait....">' +
						'<p>Your changes are being updated</p></div>');

		$("body").append(dialogBusy);
		$("#dialogBusy").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},
		});
		
		
		
		dialogCal = $('<div id="dialogCal" style="display:none;" title="Event">' +
						'<div id="errors" style="display:none;color:red">Please correct the errors in red.</div>' +
						'<div id="error1" style="display:none;color:red">The date until which you want to repeat this event is earlier than the initial event.</div>' +
						'<FORM NAME="testform">'+
						'<p>When:   <span id="cal-when"></span></p>' +
						'<div id="eventName">What:   ' +
						'<INPUT TYPE="text" NAME="eventName" VALUE=""></div>' +
						'<p><input type="checkbox" NAME="check1" Value="Check-All-Day">All Day</p>' +
						'<p><input type="checkbox" id="check2" NAME="check2" Value="Check-Repeat" onClick="testCheckBox(this)">Repeat...</p>' +
						'<div id="repeatEvents" style="display:none;">' +
						'<p>Repeats every <select name="repeat_options">' +
						'<option value="1">1 day</option>' +
						'<option value="2">2 days</option>' +
						'<option value="3">3 days</option>' +
						'<option value="4">4 days</option>' +
						'<option value="5">5 days</option>' +
						'<option value="7">1 week</option>' +
						'<option value="14">2 weeks</option>' +
						'</select></p>' +
						'<div id="repeat_end_until">Until <input id="rep_datepicker" name="repeat_end_date" type="text"></div>'+
						'</div>' +
						'<INPUT TYPE="button" NAME="button" Value="Create this Event" '+
						'onClick="testButton(this.form)"><BR>'+
						'</form>'+
						/*'<div id="sectionRepeat" style="display:none;" title="Repeat">hello how are you?</div>' +*/
						'</div>');
		
		$("body").append(dialogCal);
		$( "#rep_datepicker" ).datepicker({
			minDate:0
		});			

		$("#dialogCal").dialog({

			autoOpen: false,

			width: 600,

			modal: true, 

			overlay: { 

				opacity: 0.5, 

				background: "black" 

			},

			buttons: {

				"Cancel": function() {

					$(this).dialog("close"); 

				}

			}

		});
		/* initialize the calendar
		-----------------------------------------------------------------*/
		var $calendar = $('#calendar');
		//alert($('#edit-areas-exp').val() );alert($('#areas-exp').val() );
		
		initializeCalendar($calendar); 

	});
	
function initializeCalendar($calendar){
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		var param = "/"+Drupal.settings.userid+"/"+date.getTimezoneOffset()/60;
	    cal = $calendar.fullCalendar({
			//theme: true,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaWeek,month,agendaDay'
			},
			//firstDay: (new Date()).getDay(),
			date: date.getDate()+1,
			minTime: 5,
			maxTime: 23,
			events: "/show_appointment_to_stylist_ajax"+param,
			defaultView:'agendaWeek',
			allDaySlot: false,
			selectable: true,
			editable: true,
			draggable: true,
			selectHelper: true,
			eventBackgroundColor: "red",
			eventTextColor: "black",
			lazyFetching: true,
			select: function(start, end, allDay) {
					
							//var title = prompt('Event Title:');
							$("#error1").hide();
							$("#repeat_end_until").css('color','black');
							$("#dialogCal").dialog("open");
							//$('#example_placeholder').html();
							startGlob = start;
							endGlob = end;
							var start_min = start.getMinutes();
							if(start_min < 10) start_min = '0' + start_min;
							var start_am_pm = 'AM';
							var start_hrs = start.getHours();
							if(start_hrs > 11) {start_am_pm = 'PM'; if(start_hrs > 12) start_hrs=start_hrs-12;}
							var end_min = end.getMinutes();
							if(end_min < 10) end_min = '0' + end_min;
							var end_am_pm = 'AM';
							var end_hrs = end.getHours();
							if(end_hrs > 11) {end_am_pm = 'PM'; if(end_hrs > 12) end_hrs=end_hrs-12;}
							
							$("#cal-when").html(getWeekDay(start.getDay()) + ", " + 
												getMonthName(start.getMonth()) + " " + start.getDate() + ", " + 
												start_hrs 	+ ":" + start_min + " " + start_am_pm + "-" + 
												end_hrs		+ ":" + end_min + " " + end_am_pm);
							
							/*cal.fullCalendar('renderEvent',
									{
										title: title,
										start: start,
										end: end,
										allDay: allDay
									},
									false // make the event "stick"
								);
								$.ajax({
										type: 'post',
										url: '/update_event/addnew'+param,
										data: { 'title':title,
												'start':Math.round(start.getTime()/1000),
												'end':Math.round(end.getTime()/1000)},
										success: function(res) {
											//alert(res);
										}
									});
							
							cal.fullCalendar('unselect');*/
			},
			eventDrop: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){

					/*alert(
						event.title + " was moved " +
						dayDelta + " days and " +
						minuteDelta + " minutes and "+
						event.start.getTime()/1000 + " event start and" +
						event.end.getTime()/1000 + " event end"
						);*/
					//alert(event.id);
					//alert("min"+minuteDelta);
					//alert("day"+dayDelta);
					var delta = dayDelta*24*60*60+minuteDelta*60;
					$.ajax({
										type: 'post',
										url: '/update_event/update'+param,
										data: { 'title':event.title,
												'id': event.id,
												'start':Math.round(event.start.getTime()/1000),
												'end':Math.round(event.end.getTime()/1000),
												'delta':delta},
										success: function(res) {
										}
									});
			
			},
			eventDragStop: function( event, jsEvent, ui, view ) { 
					/* this function is called before eventDrop. it gives an event's previous co-ordinates and not the latest co-ordinate
						$.ajax({
										type: 'post',
										url: '/update_event/70',
										data: { 'title':event.title,
												'id': event.id,
												'start':Math.round(event.start.getTime()/1000),
												'end':Math.round(event.end.getTime()/1000)},
										success: function(res) {
											alert(res);
										}
									});*/
			},
			eventResize: function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
					/*alert(
						event.title + " was moved " +
						dayDelta + " days and " +
						minuteDelta + " minutes and "+
						event.start.getTime() + " event start and" +
						event.end.getTime() + " event end"
						);*/
					//alert(event.id + ' ' + event.start + ' ' + event.end);
					$.ajax({
										type: 'post',
										url: '/update_event/update'+param,
										data: { 'title':event.title,
												'id': event.id,
												'start':Math.round(event.start.getTime()/1000),
												'end':Math.round(event.end.getTime()/1000)},
										success: function(res) {
											//alert(res);
											//event.title = res;
											
											//$('#calendar').fullCalendar('removeEvents');
											//$('#calendar').fullCalendar( 'refetchEvents');
										}
									});
			
			},
			eventResizeStop: function( event, jsEvent, ui, view ) { 
					/*	this function is called before eventDrop. it gives an event's previous co-ordinates and not the latest co-ordinate
					$.ajax({
										type: 'post',
										url: '/update_event/70',
										data: { 'title':event.title,
												'id': event.id,
												'start':Math.round(event.start.getTime()/1000),
												'end':Math.round(event.end.getTime()/1000)},
										success: function(res) {
											alert(res);
										}
									});*/
			},
			eventRender: function(calEvent, jsEvent, view) {
					/* only events are editable. Appointments are not editable ( This disallows stylists to delete appointments)*/
					if(calEvent.editable==undefined){calEvent.editable = true;}
					if(calEvent.editable == true)	renderEvent(calEvent,jsEvent,view);
					//else alert(calEvent.editable);
			}
			
		});
}

var id_out;
var date_out;
function removeEvent(id,date){
    //alert("date to delete is " + date);
	var rep_events=0;
	var delta = 0;
	if(id != null)	delta = parseFloat(id)-parseInt(id);
	//alert("delta is : " + delta);
	
	// i do this to make delta not equal to 1. This case arises when there are >1 recurring events 
	// and the user selects to delete the first event.
	if(	delta == 0){
		var events = cal.fullCalendar( 'clientEvents',parseInt(id)+".1");
		if(events.length == 0) events = cal.fullCalendar( 'clientEvents',parseInt(id)+".2");
		if(events.length == 0) events = cal.fullCalendar( 'clientEvents',parseInt(id)+".3");
		if(events.length == 0) events = cal.fullCalendar( 'clientEvents',parseInt(id)+".4");
		if(events.length != 0) delta = 1;
		}
	//var events = cal.fullCalendar( 'clientEvents',parseInt(id));//Typecast to integer to find if there are recurring events. eg: 732.0,732.1 will be typecasted to 732.

	if( delta != 0){  
		id_out = parseInt(id);
		date_out = date;
		//alert("should we delete recurring events as well?");
		/* NOT doing anything with id and date that i am passing to removeEventStep2...so dont get confused
		instead i am using id_out and date_out variables(defined externally) */
		dialogRecurring = $('<div id="dialogRecurring" style="display:none;" title="Recurring event">' +
						'<FORM NAME="recurform">'+
						'<INPUT TYPE="button" NAME="recur_button1" Value="Delete this instance only." '+
						'onClick="removeEventStep2(' + id_out + ',' + date + ')">'+
						'<INPUT TYPE="button" NAME="recur_button2" Value="Delete this event and all its recurring occurances." '+
						'onClick="removeAll(' + id_out + ')">'+
						'</form>'+
						'</div>');

		$("body").append(dialogRecurring);
		$("#dialogRecurring").dialog({
				autoOpen: false,
				width: 600,
				modal: true, 
				overlay: { 
					opacity: 0.5, 
					background: "black" 
				},
				buttons: {
					"Cancel": function() {
						$(this).dialog("close"); 
					}	
			}
		});
		$("#dialogRecurring").dialog("open");
	}
	else if(delta === 0){ // delete the individual event.
		$("#dialogRecurring").dialog("close");
		//$("#dialogBusy").dialog("open");
		cal.fullCalendar('removeEvents', id);
		//alert(id + " " +  date);
		$.ajax({
										type: 'post',
										url: '/update_event/delete/'+Drupal.settings.userid,
										data: { 'id': parseInt(id),
												'start': -1},
										success: function(res) {
											cal.fullCalendar( 'refetchEvents' );
											//$("#dialogBusy").dialog("close");
										}
									});
		}
	}

function removeEventStep2(id,date){
		$("#dialogRecurring").dialog("close");
		//$("#dialogBusy").dialog("open");
		cal.fullCalendar('removeEvents', id_out);
		//alert(id_out + " " +  date_out);
		$.ajax({
										type: 'post',
										url: '/update_event/delete/'+Drupal.settings.userid,
										data: { 'id': id_out,
												'start': date_out},
										success: function(res) {
											cal.fullCalendar( 'refetchEvents' );
											//$("#dialogBusy").dialog("close");
										}
									});
}
function removeAll(id){
		$("#dialogRecurring").dialog("close");
		//$("#dialogBusy").dialog("open");
		cal.fullCalendar('removeEvents', id_out);
		$.ajax({
										type: 'post',
										url: '/update_event/delete/'+Drupal.settings.userid,
										data: { 'id': id_out,
												'start': -1},
										success: function(res) {
											cal.fullCalendar( 'refetchEvents' );
											//$("#dialogBusy").dialog("close");
										}
									});
}
	
function renderEvent(calEvent, jsEvent, view){
jsEvent.qtip({
		   content: {
				 text: '<a href=\'javascript:removeEvent(' + calEvent.id + ',' + Math.round(calEvent.start.getTime()/1000) + ')\'>Delete this appointment</a>',
				 title: {
					text: calEvent.title
					//,
					//button: 'x' // can put an <img /> tag or any other valid HTML in here. Clicking it closes the tooltip.
				 }
			  },
			  position: {
				 corner: {
					tooltip: 'bottomLeft', // Display at the top right hand corner like Google Calendar
					target: 'topRight'
				 },
				 adjust: {
					screen: true // Keep the tooltip within the viewport at all times
				 }
			  },
			  show: 'click',
			  hide: { when: { target: $(document.body).children().not( $(self) ),event: 'mousedown' } },
// Close the tooltip when it loses focus e.g. anywhere except the tooltip is clicked
			  style: {
				 background: 'white',
				 border: {
					color: 'black', // Grey style border
					radius: 5 // Give it some rounded corners (Note 1px rounded borders aren't supported at the moment)
				 },
				 tip: true // Give it a speech bubble tip (corner is automatically detected)
			  },
			  // The magic
		api: {
			onRender: function() {
				this.elements.tooltip.click(this.hide) // <img src="http://craigsworks.com/projects/forums/images/smilies/wink.gif" style="vertical-align: middle;" border="0" alt="Wink" title="Wink" />
			}
		}



		});
}


function dashboard(){

var selected1 = $.cookie('tab1');
var selected2 = $.cookie('tab2');
var selected3 = $.cookie('tab3');



var $tab1 = $("#tabs").tabs({ 
	select: function(event, ui) {
		$.cookie('tab1', ui.index);
		//alert(ui.index);
		if(ui.index == 0){
			location.reload(); //Imp: Have to reload so that the calendar gets rendered correctly
		}
		
	},
	selected: parseInt(selected1) 
}); 


var $tab2 = $("#tab2").tabs({ 
	select: function(event, ui) {
		$.cookie("tab2", ui.index);
	},
	selected: parseInt(selected2) 
});

var $tab3 = $("#tab3").tabs({ 
	select: function(event, ui) {
		$.cookie("tab3", ui.index);
	},
	selected: parseInt(selected3) 
});

}
function testCheckBox(objEvent){

	$("#repeatEvents").toggle();

}
function testButton (form){
	var dialog_close = 0;
    if(form.eventName.value.trim() != ''){
		dialog_close = 1;
		$("#eventName").css('color','black');
		$("#errors").hide();
	}
	else{
		$("#errors").show();
		$("#eventName").css('color','red');
		return;//Return if the title of the event is  null
	}
	var date = new Date();
    var param = "/"+Drupal.settings.userid+"/"+date.getTimezoneOffset()/60;
	if(form.check1.checked){
		//alert(startGlob.getTime());
		var minushrs = startGlob.getHours();
		var minusmin = startGlob.getMinutes();
		startGlob = new Date(startGlob.getTime() - minushrs*60*60*1000 - minusmin*60*1000);
		//alert(startGlob.getTime());
		var plushrs = 24 - endGlob.getHours();
		endGlob = new Date(endGlob.getTime() + plushrs*60*60*1000);
		//alert(endGlob.getTime()-startGlob.getTime());
	}
	var repeat_frequency = 0;
	var until_date=0;
	var rrule='';
	if(form.check2.checked){
		repeat_frequency = form.repeat_options.value.trim();
		if(form.repeat_end_date.value.trim()===''){
			$("#errors").show();
			$("#repeat_end_until").css('color','red');
			return;
		}
		var until_date_str = form.repeat_end_date.value.trim();
		//alert(until_date_str);
		until_date = new Date(until_date_str);
		var until_mo = until_date.getMonth();
		var until_da = until_date.getDate();
		var until_ye = until_date.getFullYear();

		var modified_startDate = new Date(endGlob.getFullYear(),endGlob.getMonth(), endGlob.getDate());
		//alert(modified_startDate.getDate() +  " " + modified_startDate.getMonth() + " " + modified_startDate.getFullYear());
		var freq = 'DAILY';
		var interval = repeat_frequency;
		if(repeat_frequency >= 7) {
			freq='WEEKLY';
			interval = 1;
			if(repeat_frequency == 14) interval = 2;
		}
		rulemonth = until_mo+1;
		rrule = 	'RRULE:FREQ=' + freq + 
					';INTERVAL=' + interval + 
					';UNTIL=' + until_ye + '' + ((rulemonth<10)?'0'+rulemonth:rulemonth) + '' + 
					((until_da<10)?'0'+until_da:until_da) + 'T000000Z;' +
					'WKST=' + getWeekDay(until_date.getDay()).substr(0,2).toUpperCase();
		//alert(rrule);
		//alert(repeat_frequency);
		if((until_date.getTime() - endGlob.getTime()) < 0){
			$("#error1").show();
			$("#repeat_end_until").css('color','red');
			return;
		}
		else {
			dialog_close = 1;
			$("#error1").hide();
			$("#repeat_end_until").css('color','black');
		}
			/*cal.fullCalendar('renderEvent',
									{
										title: form.eventName.value,
										start: startGlob,
										end: endGlob,
										allDay: false
									},
									false // make the event "stick"
								); *//*Removed this because a user shouldn't start dragging or moving 
									the appointment before user gets a confirmation from the server  */
	$.ajax({
										type: 'post',
										url: '/update_event/addnew'+param,
										data: { 'title':form.eventName.value,
												'start':Math.round(startGlob.getTime()/1000),
												'end':Math.round(endGlob.getTime()/1000),
												'repeat_freq':repeat_frequency,
												'repeat_end_until':Math.round(until_date.getTime()/1000),
												'repeat_rule':rrule},
										success: function(res) {
											cal.fullCalendar( 'refetchEvents' );
										}
									});
	}
	
	if(dialog_close === 1){
		$("#dialogCal").dialog("close");
	}
	
	if(!form.check2.checked){
	/*cal.fullCalendar('renderEvent',
									{
										title: form.eventName.value,
										start: startGlob,
										end: endGlob,
										allDay: false
									},
									false // make the event "stick"
								);*//*Removed this because a user(stylist) shouldn't start dragging or moving 
									the appointment before user(stylist) gets a confirmation from the server -see success
									function in $.ajax function*/
	//alert('title ' + form.eventName.value);
	//alert('start' + Math.round(startGlob.getTime()/1000));
	//alert('end' + Math.round(endGlob.getTime()/1000));
	$.ajax({
										type: 'post',
										url: '/update_event/addnew'+param,
										data: { 'title':form.eventName.value,
												'start':Math.round(startGlob.getTime()/1000),
												'end':Math.round(endGlob.getTime()/1000),
												'repeat_freq':0,
												'repeat_end_until':0,
												'repeat_rule':''},
										success: function(res) {
											cal.fullCalendar( 'refetchEvents' );
										}
									});
	}
	
}

function getWeekDay(daynum){
var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";
return weekday[daynum];
}

function getMonthName(monthnum){
var monthName=new Array(12);
monthName[0]="January";
monthName[1]="February";
monthName[2]="March";
monthName[3]="April";
monthName[4]="May";
monthName[5]="June";
monthName[6]="July";
monthName[7]="August";
monthName[8]="September";
monthName[9]="October";
monthName[10]="November";
monthName[11]="December";
return monthName[monthnum];
}

function openModifyAppt(appt_node_id, appt_type_id){
$("#appt_node_id").val(appt_node_id);
$("#appt_type_id").val(appt_type_id);
$("#dialogModifyAppt").dialog("open");
}

String.prototype.trim = function() {
   return this.replace(/^\s+|\s+$/g,"");
}


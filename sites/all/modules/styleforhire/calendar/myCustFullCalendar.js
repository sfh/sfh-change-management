var dragged = 0;
var total_duration = 0;	
var param = window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1);

$(document).ready(function() {

	if(getCookie('dragstylist[' + param + '][closet_shopping_info]')) dragged++;
	if(getCookie('dragstylist[' + param + '][stylist_introduction_info]')) dragged++;
	if(getCookie('dragstylist[' + param + '][closet_audit_info]')) dragged++;
	if(getCookie('dragstylist[' + param + '][personal_shopping_with_info]')) dragged++;
	if(getCookie('dragstylist[' + param + '][personal_shopping_for_info]')) dragged++;
	
	/* initialize the external events
		-----------------------------------------------------------------*/
		iterateEvents();
		/* initialize the calendar
		-----------------------------------------------------------------*/
		var $calendar = $('#calendar');
		initializeCalendar($calendar);
		
		$("#edit-next, #edit-next-t").click(function () {
			//alert(dragged);
			if(dragged < 1) {
				alert("Please schedule(drag and drop) all your appointments onto the calendar before proceeding ahead.");
				//$("#dialog").dialog("open");
				return false;
			}else {
				var fields = jQuery("#styleforhire-appointment-form").serializeArray(); 
				var original_rate = parseInt($("input[name=original_rate]").val());
				var rate = parseInt($("input[name=rate]").val());
				if(original_rate > rate){
					//alert('Congratulations! You are getting your stylist\'s special rate of $'+rate);
					var stylist_name = $("input[name=stylist_name]").val();
					var special_rate = $('<div id="special_rate" style="display:none;" title="Message">Welcome back from ' +
										stylist_name + '! ' + stylist_name.substring(0,stylist_name.indexOf(" ")) + ' would like to offer you a special rate of $'+rate+'/Hour.</div>');
					$("body").append(special_rate);		
					$("#special_rate").dialog({
						autoOpen: true,
						width: 600,
						modal: true, 
						overlay: { 
							opacity: 0.5, 
							background: "black" 
						},
						buttons: {
							"Ok": function() {
								$(this).dialog("close");
								jQuery("#step3_conf").load("/book_appointment/step3/"+rate, fields, function(){
									$("#step3_conf").dialog("open");
								});	
							}
						}
					});
				}
				else{
					jQuery("#step3_conf").load("http://"+window.location.hostname+"/book_appointment/step3/"+rate, fields, function(){
						$("#step3_conf").dialog("open");
					});	
				}				
				return false;
			} 
		}); 
		
		/*var dialog = $('<div id="dialog" style="display:none;" title="Message"><p>Please schedule(drag and drop) your appointments on the calendar before proceeding ahead.</p></div>');
		$("body").append(dialog);		
		$("#dialog").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},
			buttons: {
				"Ok": function() {
					$(this).dialog("close");
				}
			}
		});*/
		
		var sameday_scheduling = $('<div id="sameday_scheduling" style="display:none;" title="Message"><p>' +
									'We take our appointment preparation very seriously! ' +  
									"Therefore, it can be difficult for our Stylists to " +
									"accomodate same-day and next-day appointments. " +
									"However, in the case of a Fashion Emergency, please email " +
									"our Customer Service Department (service@styleforhire.com) " +
									'and we will check availability on your behalf.</p></div>');
		$("body").append(sameday_scheduling);		
		$("#sameday_scheduling").dialog({
			autoOpen: false,
			width: 600,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},
			buttons: {
				"Ok": function() {
					$(this).dialog("close");
				}
			}
		});
		
		
		var step3_conf = $('<div id="step3_conf" style="display:none;" title="Confirmation">&nbsp;</div>');
		$("body").append(step3_conf);		
		$("#step3_conf").dialog({
			autoOpen: false,
			width: 450,
			modal: true, 
			overlay: { 
				opacity: 0.5, 
				background: "black" 
			},			
			buttons: {
				"Close": function() {
					$(this).dialog("close"); 
				},
				"Confirm": function() {
					document.getElementById('styleforhire-appointment-form').submit();
				}
			}
		});
	});
	
function initializeCalendar($calendar){
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
		
		/* Setting the timezone of the user and passing it to server */
		$("#user_timezone_info").val(date.getTimezoneOffset()/60);
		var param1 = "/"+window.location.pathname.substring(window.location.pathname.lastIndexOf("/")+1)+"/"+date.getTimezoneOffset()/60;
		$calendar.fullCalendar({
			theme: true,
			header: {
				//left: 'prev,next',
				left:	'today',
				center: 'prev,title,next',
				right: 'agendaWeek,month'
			},
			firstDay: (new Date()).getDay(),
			aspectRatio:1.5,
			//contentHeight: 700,
			minTime: 5,
			maxTime: 23,
			defaultView:'agendaWeek',
			allDaySlot: false,
			defaultEventMinutes: 120,
			selectable: true,
			select: function(start, end, allDay) {
			  	alert('Please schedule(drag and drop) all your appointments from the left panel onto the calendar before proceeding ahead.');
			},
			editable: true,
			disableResizing: true,
			eventBackgroundColor: "#aabbbb",
			eventTextColor: "black",
			//disableDragging: true,
			//draggable: true,
			events: "/book_appointment_ajax/"+param1,
			//events: "=/dragstylistjson.php?baid="+param ,
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped
				drop(this,date,allDay);
			},
			eventRender: function(calEvent, jsEvent, view) {
					renderEvent(calEvent,jsEvent,view);
			},
			eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {
					trigger_whendragstopped(event,dayDelta,minuteDelta,allDay,revertFunc);
			}
		});
}
function iterateEvents(){
		$('#external-events div.external-event').each(function() {

			var title=$.trim($(this).text());
			var idtitle=1;
			if(title.indexOf('Stylist Introduction') === 0) {idtitle=1;}
			if(title.indexOf('Closet Audit') === 0) {idtitle=2;}
			if(title.indexOf('Closet Shopping') === 0) {idtitle=3;}
			if(title.indexOf('Personal Shopping: Shopping with you') === 0) {idtitle=4;}
			if(title.indexOf('Personal Shopping: Shopping for you') === 0) {idtitle=5;}
			var eventObject = {
				title: $.trim($(this).text()), // use the element's text as the event title
				id: idtitle
			};
			//alert(idtitle);
			// store the Event Object in the DOM element so we can get to it later
			$(this).data('eventObject', eventObject);

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});

		});
	}
	




function removeEvent(id,num_hrs){
	if(dragged>0){ dragged -- ;}
	total_duration -= num_hrs;
	var order_total = Drupal.settings.rate*total_duration;
	$("#total_order").html('$'+order_total);
	$('#calendar').fullCalendar('removeEvents', id);	
	
	if(id === 1){
		$("#stylist_introduction_info").val('');			
	} else if(id === 2){
		$("#closet_audit_info").val('');
	} else if(id === 3){
		$("#closet_shopping_info").val('');
	} else if(id === 4){
		$("#personal_shopping_with_info").val('');	
	} else if(id === 5){
		$("#personal_shopping_for_info").val('');
	}
	
}

function renderEvent (calEvent, jsEvent, view){
	/*if(dragged==0) {dragged ++;}*/
	var start;
	var monthApp = calEvent.start.getMonth()+1;
	var dateOfApp = monthApp + "/" + calEvent.start.getDate() + "/" + calEvent.start.getFullYear();
	
	var start_min = calEvent.start.getMinutes();
	if(start_min < 10) start_min = '0' + start_min;
	var start=calEvent.start.getHours();
	var start_am_pm = 'AM';
	if(calEvent.start.getHours() > 11) {start_am_pm = 'PM'; if(start > 12) start=start-12;}
	start = start+':'+ start_min + start_am_pm;
	
	var end='';
	var end_min = '';
	var end_am_pm = 'AM';
	if(calEvent.end === null){
		end=calEvent.start.getHours()+2;
		end_min=start_min;
	}
	else { //if(calEvent.end != null)
	end=calEvent.end.getHours();
	end_min=calEvent.end.getMinutes();
	if(end_min < 10) end_min = '0' + end_min;
	}
	
	if(end > 11) {
			end_am_pm = 'PM';
			if(end > 12) end=end-12;
			}
	end=end+":"+end_min+end_am_pm;
	
	var diff = 2;
	if(calEvent.end != null){
		diff = (calEvent.end - calEvent.start)/(60*60*1000);
	}
	
	//var datestr = "<table width='100%' style='margin:1px 0px;'><tr><td>Date:</td><td align='right'>"+ dateOfApp +"</td></tr><tr><td>Time:</td><td align='right'>"+ start +"-"+ end +"</td></tr><tr><td>Duration:</td><td align='right'>"+ diff +" hrs</td></tr></table>";
	var datestr = "<table width='100%' style='margin:1px 0px;'><tr><td>Date:</td><td align='right'>"+ dateOfApp +"</td></tr><tr><td>Time:</td><td align='right'>"+ start +"-"+ end +"</td></tr></table>";
	if(calEvent.id === 1){
			$("#requested_date_1").html(datestr);

		//$("#requested_date_1").html(dateOfApp);

		//$("#requested_time_1").html('&nbsp;'+start + '-' + end);

		$("#service_1").html(calEvent.title);

		$("#stylist_introduction_info").val(dateOfApp+'-'+start + '-' + end+'-'+diff);	
		
		}
	else if(calEvent.id === 2){
		$("#requested_date_2").html(datestr);

		//$("#requested_date_2").html(dateOfApp);

		//$("#requested_time_2").html('&nbsp;'+start + '-' + end);

		$("#service_2").html(calEvent.title);

		$("#closet_audit_info").val(dateOfApp+'-'+start + '-' + end+'-'+diff);
		}
	else if(calEvent.id === 3){
		$("#requested_date_3").html(datestr);

		//$("#requested_date_3").html(dateOfApp);

		//$("#requested_time_3").html('&nbsp;'+start + '-' + end);

		$("#service_3").html(calEvent.title);

		$("#closet_shopping_info").val(dateOfApp+'-'+start + '-' + end+'-'+diff);
		}
	else if(calEvent.id === 4){
		$("#requested_date_4").html(datestr);

		//$("#requested_date_4").html(dateOfApp);

		//$("#requested_time_4").html('&nbsp;'+start + '-' + end);

		$("#service_4").html(calEvent.title);

		$("#personal_shopping_with_info").val(dateOfApp+'-'+start + '-' + end+'-'+diff);	
		}
	else if(calEvent.id === 5){
		$("#requested_date_5").html(datestr);

		//$("#requested_date_5").html(dateOfApp);

		//$("#requested_time_5").html('&nbsp;'+start + '-' + end);

		$("#service_5").html(calEvent.title);
		//Notes - shouldn't use diff in this case for the duration because duration is always 1. Should pass the actual value back to ther server.
		$("#personal_shopping_for_info").val(dateOfApp+'-'+start + '-' + end+'-'+calEvent.title.substring(calEvent.title.lastIndexOf("- ")+2,calEvent.title.lastIndexOf(" hrs")));
		}
		
	if(calEvent.id != 999){
	jsEvent.qtip({
		   content: {
				 text: '<a href=\'javascript:removeEvent('+calEvent.id+','+ (calEvent.end - calEvent.start)/(60*60*1000) +')\'>Delete this appointment</a>',
				 title: {
					text: calEvent.title + '<br />Date&nbsp;&nbsp;:&nbsp;&nbsp;' + dateOfApp + '<br />Start&nbsp;&nbsp;:&nbsp;&nbsp;' + start + '<br />End&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;' + end
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
		}// end if(calEvent.id != 999)
	}

	
	function drop(obj, date, allDay){
				if(check_if_event_overlaps_with_existing_events(date)) return;
				if(check_if_event_starts_after_30hrs(date)){
					$("#sameday_scheduling").dialog("open");
					return;
				}
				dragged ++;
	
	// retrieve the dropped element's stored Event Object
				var d = date.getDate();
				var m = date.getMonth();
				var y = date.getFullYear();
				var h = date.getHours();
				var n = date.getMinutes();
	// retrieve the dropped element's stored Event Object
				var originalEventObject = $(obj).data('eventObject');

				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);
				if(copiedEventObject.id === 1) {
							copiedEventObject.end = new Date(y,m,d,h,n+30);
							total_duration += 0.5;
							}
				else if(copiedEventObject.id === 2) {
							var hrs = copiedEventObject.title;
							hrs = hrs.substr(hrs.indexOf('-')+1, hrs.indexOf('hrs'))
							//alert(parseInt(hrs));
							copiedEventObject.end = new Date(y,m,d,h+parseInt(hrs),n);
							total_duration += parseInt(hrs);
						}
				else if(copiedEventObject.id === 3) {
							var hrs = copiedEventObject.title;
							hrs = hrs.substr(hrs.indexOf('-')+1, hrs.indexOf('hrs'))
							copiedEventObject.end = new Date(y,m,d,h+parseInt(hrs),n);
							total_duration += parseInt(hrs);
						}
				else if(copiedEventObject.id === 4) {
							var hrs = copiedEventObject.title;
							hrs = hrs.substr(hrs.indexOf('-')+1, hrs.indexOf('hrs'))
							copiedEventObject.end = new Date(y,m,d,h+parseInt(hrs),n);
							total_duration += parseInt(hrs);
						}
				else if(copiedEventObject.id === 5) {
							var hrs = copiedEventObject.title;
							hrs = hrs.substr(hrs.indexOf('-')+1, hrs.indexOf('hrs'))
							copiedEventObject.end = new Date(y,m,d,h+1,n);
							total_duration += 1;
				}
				
				/* Below line for setting the date to 8AM if a user drags a date to month view*/
				if(date.getHours() === 0) {date.setHours(8); allDay = false;}
				
				// assign it the date that was reported
				copiedEventObject.start = date;
				
				copiedEventObject.allDay = allDay;
				
				// setting the look and feel of the event.
				copiedEventObject.backgroundColor = 'red';
				copiedEventObject.textColor = 'black';
	
				var order_total = Drupal.settings.rate*total_duration;
				$("#total_order").html('$'+order_total);
	
				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

					// remove the element from the "Draggable Events" list
					//$(obj).remove();
			
				
	}
	/* Subu:@date-9/30/11 Notes -  dont think trigger_whendragstopped() ever gets called. All the functionality
	is handled in drop()
	*/
	function trigger_whendragstopped(event,dayDelta,minuteDelta,allDay,revertFunc){
		if(check_if_event_overlaps_with_existing_events(event.start)){
			revertFunc(); // revertFunc() is part of FullCalendar API with which I can revert back the event.
		}
		if(check_if_event_starts_after_30hrs(event.start)){
			revertFunc();
		}
		
	}
	
	function check_if_event_overlaps_with_existing_events(date){
		var eventObjs = $('#calendar').fullCalendar( 'clientEvents');
		var i;
				for(i=0;i<eventObjs.length;i++){
					var eventObj = eventObjs[i];
					if(date<eventObj.end && date>eventObj.start){
						return true;
					}
				}
		return false;
	}
	
	function check_if_event_starts_after_30hrs(date){
		var date_now = new Date();
		var date_nowplus30hrs = Math.round(date_now.getTime()/1000) + 30*60*60;
		if (date.getTime()/1000<date_nowplus30hrs) return true;
		return false;
	}
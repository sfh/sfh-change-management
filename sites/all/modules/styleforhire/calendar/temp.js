$(document).ready(function() {


		/* initialize the external events
		-----------------------------------------------------------------*/

		$('#external-events div.external-event').each(function() {

			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
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


		/* initialize the calendar
		-----------------------------------------------------------------*/

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaWeek,month,agendaDay'
			},
			defaultView:'agendaWeek',
			allowCalEventOverlap : true,
			  overlapEventsSeparate: false,
			editable: true,
			droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped

				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');

				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);

				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;

				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}

			},
			eventRender: function(calEvent, jsEvent, view) {

					jsEvent.qtip({
					                       content: {
										         text: 'blah and <a href>delete</a>',
										         title: {
										            text: calEvent.title + ' ' + calEvent.id,
										            button: 'x' // can put an <img /> tag or any other valid HTML in here. Clicking it closes the tooltip.
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
										      hide: 'click', // Close the tooltip when it loses focus e.g. anywhere except the tooltip is clicked
										      style: {
										         background: 'white',
										         border: {
										            color: '#ABABAB', // Grey style border
										            radius: 5 // Give it some rounded corners (Note 1px rounded borders aren't supported at the moment)
										         },
										         tip: true // Give it a speech bubble tip (corner is automatically detected)
										      }


					                        });

			        //alert('Event: ' + calEvent.title);
			        //alert('Event id: ' + calEvent.id);
					update_appointments_with_dates(calEvent.title+';' + calEvent.start+';' + calEvent.end, calEvent.id);
			        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        //alert('View: ' + view.name);

			        // change the border color just for fun
			        //$(this).css('border-color', 'red');

			        //$('#calendar').fullCalendar('removeEvents',calEvent.id);
			 }



		});


	});


function select_color(selected) {

	var selected_id = selected.attr('id')
	selected = selected_id.split('_');
	//alert(selected[0]);
	//alert(selected[1]);

	if ( $('#'+selected_id).hasClass('selected_color')) {

		for(var i=0; i < num_colors; i++) {

			if ( colors[selected[0]][i] == selected[1])
			{
				colors[selected[0]][i] = -1;
				$('#'+selected[0]+'_'+i).css('background-color', '#FFFFFF');
				break;
			}
		}

		$('#'+selected_id).removeClass('selected_color');
	}
	else{

		for(var i=0; i < num_colors; i++) {

			if ( colors[selected[0]][i] == -1)
			{
				colors[selected[0]][i] = selected[1];
				$('#'+selected_id).addClass('selected_color');
				$('#'+selected[0]+'_'+i).css('background-color', '#'+selected[1]);
				break;
			}
		}

		if ( i == num_colors)
		{
			alert('You may only select '+num_colors+' colors, please deselect one before selecting another.');
		}
	}

	var selected_colors = '';
	for(var i=0; i < num_colors; i++) {
		selected_colors = selected_colors + colors['best'][i] + ',';
	}

	for(var i=0; i < num_colors; i++) {
		selected_colors = selected_colors + colors['worst'][i] + ',';
	}

	$('#edit-selected-colors').val(selected_colors);

	//alert($('#edit-selected-colors').val());
}



/*
	$(".toc-list a").click(
		function(e){
			e.preventDefault();
			var anchorName = $(this).attr("href").split("#")[1];
			var target = $("#" + anchorName);
			anchorOffset = target.offset();
			$.scrollTo(anchorOffset.top-80);
		}
	);
*/
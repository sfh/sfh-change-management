var num_colors = 6;

var colors = new Array('best', 'worst');

colors['best'] = new Array(num_colors);
colors['worst'] = new Array(num_colors);

for(var i=0; i < num_colors; i++) {

	colors['best'][i] = -1;
	colors['worst'][i] = -1;
}

$(document).ready(
	function() {

		$(".color-selector div").click(

			function(e) {

			select_color($(this));

		}
	);
});

function preselect_colors(selected_colors) {

	selected_colors = selected_colors.split(',');

	for(var i=0; i < num_colors; i++) {

		colors['best'][i] = selected_colors[i];

		if ( selected_colors != -1)
		{
			$('#best_'+selected_colors[i]).addClass('selected_color');
			$('#best_'+i).css('background-color', '#'+selected_colors[i]);
		}
	}

	for(i=0; i < num_colors; i++) {

		colors['worst'][i] = selected_colors[i+6];

		if ( selected_colors != -1)
		{
			$('#worst_'+selected_colors[i+6]).addClass('selected_color');
			$('#worst_'+i).css('background-color', '#'+selected_colors[i+6]);
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
}
<h2>My Fashion Profile</h2>

<div class="field field-type-text field-field-lookbook-best-colors">
  <div class="field-items">
      <div class="field-item"><?php print styleforhire_color_palette($node->field_lookbook_best_colors[0]['value']) ?></div>
  </div>
</div>

<h3 class="field-label">Measurements:</h3>
<div class="field-items" id="col1">
  <div class="field-item"><h4 class="field-label">Height:</h4> <?php print $node->field_lookbook_height[0]['view'] ?></div>
  <div class="field-item"><h4 class="field-label">Weight:</h4> <?php print $node->field_lookbook_weight[0]['view'] ?></div>
  <div class="field-item"><h4 class="field-label">Bust:</h4> <?php print $node->field_lookbook_bust[0]['view'] ?></div>
  <div class="field-item"><h4 class="field-label">Waist:</h4> <?php print $node->field_lookbook_waist[0]['view'] ?></div>
</div>
<div class="field-items" id="col2">
  <div class="field-item"><h4 class="field-label">Hips:</h4> <?php print $node->field_lookbook_hips[0]['view'] ?></div>
  <div class="field-item"><h4 class="field-label">Inseam:</h4> <?php print $node->field_lookbook_inseam[0]['view'] ?></div>
  <div class="field-item"><h4 class="field-label">Shoulders:</h4> <?php print $node->field_lookbook_shoulders[0]['view'] ?></div>
</div>

<div class="field field-type-text field-field-lookbook-store">
	<h3 class="field-label">Sizes:</h3>
	<div class="field-items">
		<div class="field-item<?php if (empty($node->field_lookbook_store)) { print " empty2"; } ?>">
		<?php
			$stores['store'] = tpl_unserialize($node->field_lookbook_store[0]['value']);
			$stores['tops'] = tpl_unserialize($node->field_lookbook_tops[0]['value']);
			$stores['pants'] = tpl_unserialize($node->field_lookbook_pants[0]['value']);
			$stores['dresses'] = tpl_unserialize($node->field_lookbook_dresses[0]['value']);
			$stores['skirts'] = tpl_unserialize($node->field_lookbook_skirts[0]['value']);
			$stores['shoes'] = tpl_unserialize($node->field_lookbook_shoes[0]['value']);
			
			for($x=0;$x<count($stores['store']);$x++) {

				if ( !empty($stores['store'][$x])) {
				?>
					<p class="sizes"><strong><?php print ($stores['store'][$x]) ?></strong>: 
					<?php print $stores['tops'][$x] ?> for tops, 
					<?php print $stores['pants'][$x] ?> for pants, 
					<?php print $stores['dresses'][$x] ?> for dresses, 
					<?php print $stores['skirts'][$x] ?> for skirts, 
					<?php print $stores['shoes'][$x] ?> for shoes.</p>
				<?php
				}
			}
		?>
		</div>
	</div>
</div>


<div class="field field-type-text field-field-lookbook-rec-description">
  <h3 class="field-label">Shopping Recomendations</h3>
  <div class="field-items">
	<div class="field-item">
<p><?php print $node->field_lookbook_comments[0]['view'] ?></p>
		<?php

			$shopping['description'] = tpl_unserialize($node->field_lookbook_rec_description[0]['view'] );
			$shopping['comments'] = tpl_unserialize($node->field_lookbook_rec_comments[0]['view']);
			$shopping['type'] = tpl_unserialize($node->field_lookbook_type[0]['view']);
			$shopping['color'] = tpl_unserialize($node->field_lookbook_color[0]['view']);
			$shopping['style'] = tpl_unserialize($node->field_lookbook_style[0]['view']);

			for($x=0;$x<count($shopping['description']);$x++) {
			
				if ( !empty($shopping['description'][$x])) {
				
				?>
					<ul id="recommendations">
					<li><?php print $shopping['description'][$x] ?> (<span><?php print $shopping['comments'][$x] ?>)</span></li>
					<li><?php print $shopping['type'][$x] ?> (<span><?php print $shopping['color'][$x] ?>, <?php print $shopping['style'][$x] ?></span>)</li>
					</ul>
				<?php
				}
			}
		?>
	</div>
  </div>
</div>

<!-- <div class="field field-type-text field-field-lookbook-comments">
  <h3 class="field-label">Comments:</h3>
  <div class="field-items">
      <div class="field-item"><?php print $node->field_lookbook_comments[0]['view'] ?></div>
  </div>
</div> -->

<div class="field field-type-filefield field-field-lookbook-photos">
  <h2>My Photos:</h2>
	<!-- 
	<div id="before" class="field-items">
	<h3 class="field-label">Before</h3>
	<?php s4h_build_lookbook_photos($node->field_lookbook_photos, 'before'); ?>
	</div>
	<div id="after" class="field-items">
	<h3 class="field-label">After</h3>
	<?php s4h_build_lookbook_photos($node->field_lookbook_photos_after, 'after'); ?>
	</div> -->
	<div id="wardrobe" class="field-items">
	<h3 class="field-label">My Wardrobe:</h3>
	<?php s4h_build_lookbook_photos($node->field_lookbook_photos_wardrobe, 'wardrobe'); ?>
	</div>
	<div id="styles" class="field-items">
	<h3 class="field-label">Recommended Styles:</h3>
	<?php s4h_build_lookbook_photos($node->field_lookbook_photos_rec, 'styles'); ?>
	</div>
</div>



<?php if 	( !empty($user_data->lb_nid)) {
	print l('View Lookbook', 'user/'.$user_data->uid.'/profile/lookbook', array('attributes'=>array('target'=>'_blank')));
}
?>

<div class="widget-left">

<div class='preferences group'>

	<div class='outer'>
		<div class='inner'>
			<div class='controls'>
				<a class='edit' href='<?php print $GLOBALS['base_url'] ?>/user/<?php print $user_data->uid ?>/edit/preferences'>Edit</a>
			</div>
			<div class='philosophy<?php if (empty($user_data->style)) { print " empty"; } ?>'>
			<h2>My Style Philosophy</h2>
				<p><?php print $user_data->style ?></p>
			</div>
			<div class='icons<?php if (empty($user_data->icons) AND empty($user_data->icons_other)) { print " empty"; } ?> clearfix'>
			<h2>My Style Icons</h2>
				<ul>
					<li>
						<?php print $user_data->icons ?><?php if (!empty ($user_data->icons_other)) { echo ', '.$user_data->icons_other; } ?>
					</li>
				</ul>
			</div>
			<div class='fav-brands<?php if (empty($user_data->brands) AND empty($user_data->brandss_other)) { print " empty"; } ?> clearfix'>
			<h2>My Favorite Brands</h2>
				<ul>
					<li>
						<?php print $user_data->brands ?><?php if (!empty ($user_data->brands_other)) { echo ', '.$user_data->brands_other; } ?>
					</li>
				</ul>
			</div>
			<div class='my-shops<?php if (empty($user_data->shops) AND empty($user_data->shops_other)) { print " empty"; } ?> clearfix'>
			<h2>Favorite Places to Shop</h2>
				<ul>
					<li>
						<?php print $user_data->shops ?><?php if (!empty ($user_data->shops_other)) { echo ', '.$user_data->shops_other; } ?>
					</li>
				</ul>
			</div>
			<div class='my-sites<?php if (empty($user_data->url1) AND empty($user_data->url2) AND empty($user_data->url3)) { print " empty-sites"; } ?>'>
			<h2>Favorite Fashion Sites</h2>
				<ul>
					<li><?php print $user_data->url1 ?></li>
					<li><?php print $user_data->url2 ?></li>
					<li><?php print $user_data->url3 ?></li>
				</ul>
			</div>
		</div>
	</div>
</div>
</div> <!-- end widget-left -->
<div class="widget-right">
<?php print theme('account_info', $user_data) ?>
</div> <!-- end widget-right -->

<div class="fashion-profile group">
	<?php if ( ! isset($user->roles[4])) { ?>
	<div class="controls">
		<a class="edit" href='<? echo $GLOBALS['base_url'] ?>/user/<?php print $user_data->uid ?>/profile/lookbook/edit'>Edit</a>
	</div>
	<?php
	}
	?>
	<div class="outer">
		<div class="inner clearfix">
			<h2>My Fashion Profile</h2>
			
			<div class="field field-type-text field-field-lookbook-best-colors clearfix">
				<div class="field-items">
					<div class="field-item"><?php print styleforhire_color_palette($node->field_lookbook_best_colors[0]['value']) ?></div>
				</div>
			</div>
			
			<div class="field field-type-text field-field-lookbook-comments">
				<h3 class="field-label">Comments:</h3>
				<div class="field-items">
					<div class="field-item"><p><?php if ( !empty($node->field_lookbook_comments[0]['value'])) { print $node->field_lookbook_comments[0]['value']; } else { print 'N/A'; } ?></p></div>
				</div>
			</div>
			
			<div class="field field-type-text field-field-lookbook-comments">
				<h3 class="field-label">Measurements:</h3>
				<div class="field-items">
					<p>Height: <?php if ( !empty($node->field_lookbook_height[0]['value'])) { print $node->field_lookbook_height[0]['value']; } else { print 'N/A'; } ?> 
					Weight: <?php if ( !empty($node->field_lookbook_weight[0]['value'])) { print $node->field_lookbook_weight[0]['value']; } else { print 'N/A'; } ?> 
					Bust: <?php if ( !empty($node->field_lookbook_bust[0]['value'])) { print $node->field_lookbook_bust[0]['value']; } else { print 'N/A'; } ?> 
					Waist: <?php if ( !empty($node->field_lookbook_waist[0]['value'])) { print $node->field_lookbook_waist[0]['value']; } else { print 'N/A'; } ?> 
					Hips: <?php if ( !empty($node->field_lookbook_hips[0]['value'])) { print $node->field_lookbook_hips[0]['value']; } else { print 'N/A'; } ?> 
					Inseam: <?php if ( !empty($node->field_lookbook_inseam[0]['value'])) { print $node->field_lookbook_inseam[0]['value']; } else { print 'N/A'; } ?> 
					Shoulders: <?php if ( !empty($node->field_lookbook_shoulders[0]['value'])) { print $node->field_lookbook_shoulders[0]['value']; } else { print 'N/A'; } ?></p>
				</div>
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
				<h3 class="field-label">Shopping Recomendations:</h3>
				<div class="field-items">
				<div class="field-item<?php if (empty($node->field_lookbook_rec_description)) { print " empty2"; } ?>">
					<?php
			
						$shopping['description'] = tpl_unserialize($node->field_lookbook_rec_description[0]['value'] );
						$shopping['comments'] = tpl_unserialize($node->field_lookbook_rec_comments[0]['value']);
						$shopping['type'] = tpl_unserialize($node->field_lookbook_type[0]['value']);
						$shopping['color'] = tpl_unserialize($node->field_lookbook_color[0]['value']);
						$shopping['style'] = tpl_unserialize($node->field_lookbook_style[0]['value']);
			
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
			
		</div> <!-- end inner -->
	</div> <!-- end outer -->
</div>

<div class="my-photos group">
	<?php if ( ! isset($user->roles[4])) { ?>
	<div class="controls">
		<a class="edit" href='<? echo $GLOBALS['base_url'] ?>/user/<?php print $user_data->uid ?>/profile/lookbook/edit'>Edit</a>
	</div>
	<?php
	}
	?>
	<div class='outer'>
		<div class='inner'>
			<h2>My Photos</h2>
			<div id="tabbed-interface" class="field field-type-filefield field-field-lookbook-photos">
			<ul id="tabs">
			<li class="active" id="first"><a href="#before">Before</a></li>
			<li><a href="#after">After</a></li>
			<li><a href="#wardrobe">Your Wardrobe</a></li>
			<li><a href="#styles">Recommended Styles</a></li>
			</ul>
				<div id="before" class="field-items">
				<?php s4h_build_lookbook_photos($node->field_lookbook_photos, 'before'); ?>
				</div>
				<div id="after" class="field-items">
				<?php s4h_build_lookbook_photos($node->field_lookbook_photos_after, 'after'); ?>
				</div>
				<div id="wardrobe" class="field-items">
				<?php s4h_build_lookbook_photos($node->field_lookbook_photos_wardrobe, 'wardrobe'); ?>
				</div>
				<div id="styles" class="field-items">
				<?php s4h_build_lookbook_photos($node->field_lookbook_photos_rec, 'styles'); ?>
				</div>
			</div>
		</div>
	</div>
</div>


<?php
// $Id: node.tpl.php,v 1.4 2008/09/15 08:11:49 johnalbin Exp $

	global $user;

	$client_email = styleforhire_client_email($node->nid);

	$stylist_1			=	explode('View user profile">', $node->field_apt_stylist[0]['view']);
	$stylist_2			=	explode('</a>',$stylist_1[1]);
	$apt_type_1			=	explode('">',$node->field_apt_type[0]['view']); $apt_type_2 = explode('</a>',$apt_type_1[1]);

	$stylist_uid		=	$node->field_apt_stylist[0]['uid'];
	$stylist_name		=	styleforhire_user_name($stylist_uid);						/*	Substitute first and last name in this variable.					*/
	$apt_type			=	$apt_type_2[0];
	$apt_date			=	format_date($node->field_apt_date[0]['value'], 'custom', 'm/d/y h:ia'). ' - '.format_date($node->field_apt_date[0]['value2'], 'custom', 'h:ia');		/*	Need to make the date output more user friendly.					*/
	$apt_price			=	$node->field_apt_price[0]['view'];
	$apt_status			=	$node->field_apt_status[0]['view'];	/*	This var is currently returning no value. Don't know why.			*/
	$apt_loc_street		=	$node->field_apt_address1[0]['view'];
	$apt_loc_street2	=	$node->field_apt_address2[0]['view'];
	$apt_loc_city		=	$node->field_apt_city[0]['view'];
	$apt_loc_state		=	$node->field_apt_state[0]['view'];
	$apt_loc_zip		=	$node->field_apt_zip[0]['view'];
	$apt_fname			=	$node->field_apt_fname[0]['view'];
	$apt_lname			=	$node->field_apt_name[0]['view'];
	$apt_map_url		=	"http://maps.google.com/maps?q=".
							implode("+",explode(" ",$apt_loc_street))."+".
							implode("+",explode(" ",$apt_loc_city))."+".
							implode("+",explode(" ",$apt_loc_state))."+".
							implode("+",explode(" ",$apt_loc_zip));
	
	$link_cancel		=	"/node/".$node->nid."/delete";		/*	Each of these links are just placeholders for requested features.	*/
	$link_client_modify	=	"/edit_appointment/".$node->nid;
	$link_modify		=	"/node/".$node->nid."/edit";
	$link_complain		=	"/node/add/complaint/".$node->nid;
	//$link_confirm		=	"/node/".$node->nid."/confirm";
	//$link_complete		=	"/node/".$node->nid."/complete";
	$link_complete		=   "/complete_appointment/".$node->nid."/".$stylist_uid;
	$corp_notes			=	"This is the notes field";			/*	Notes field should only be visible to to Corporate users.			*/
	
	$user_role			=	"stylist";							/*	Some links are only shown to certain roles. See below.				*/

?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"><div class="node-inner">

  <?php print $picture; ?>

  <?php if (!$page): ?>
    <h2 class="title">
      <a href="<?php print $node_url; ?>" title="<?php print $title ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>

  <?php if ($unpublished): ?>
    <div class="unpublished"><?php print t('Unpublished'); ?></div>
  <?php endif; ?>

  <?php if ($submitted): ?>
    <div class="meta">
        <div class="submitted">
		 <?php 
			print $submitted;
		  ?>
        </div>
    </div>
  <?php endif; ?>

  <div class="content">
  <?php if (( $node->field_apt_status[0]["value"] != "Completed") || 
			isset($user->roles[7]) || isset($user->roles[10]) ||
			isset($user->roles[9]) || isset($user->roles[3])) { 
			/*display this info if the user is admin/district manager/stylist/corporate + display
			to the client only if the appointment is incomplete */?>
  	<dl class="appointment-details">
		<dt class="apt-stylist">Stylist:</dt> <dd><a href="/stylist/<?php print $stylist_uid ?>"><?php print $stylist_name ?></a></dd>
		<dt class="apt-type">Client:</dt> <dd class="apt-client">
			<ul>
				<li class="apt-client-name"><?php print $apt_fname.' '.$apt_lname ?></li>
				<li class="apt-client-email"><?php print $client_email ?></li>
			</ul>
		</dd>
		<dt class="apt-type">Type:</dt> <dd><?php print $apt_type ?></dd>
		<dt class="apt-date">Date:</dt> <dd><?php print $apt_date ?></dd>
		<?php if (( $node->field_apt_status[0]["value"] != "Completed") && 
		(isset($user->roles[7]) || isset($user->roles[10]) || isset($user->roles[9]))){ ?>
			<dt class="apt-price">Price:</dt> <dd>$<?php print $apt_price ?></dd>
		<?php } ?>
		<?php  if ($apt_loc_street != "") { ?>
		<dt class="apt-location">Location:</dt> <dd class="apt-address">
			<ul>
				<li class="apt-street"><?php print $apt_loc_street ?></li>
				<li class="apt-street2"><?php print $apt_loc_street2 ?></li>
				<li class="apt-city"><?php print $apt_loc_city ?></li>
				<li class="apt-state"><?php print $apt_loc_state ?></li>
				<li class="apt-zip"><?php print $apt_loc_zip ?></li>
				<li class="apt-maplink"><a href="<?php print $apt_map_url ?>" target="_blank">view map</a></li>
			</ul>
		</dd>
		<?php } ?>
		<dt class="apt-comments">Comments:</dt> <dd><?php print $node->field_comments[0]['value'] ?></dd>
		<?php if ($apt_status != "") { ?><dt>Status:</dt> <dd><?php print $apt_status ?></dd><?php } ?>
				
		<?php if (isset($user->roles[9])) { ?><dt>CSR Notes:</dt> <dd><?php print $node->field_notes[0]['value'] ?></dd><?php } ?>
	</dl>
	
		<p class="modify-appt">
			<?php if ($user_role == "client") { ?>
				<a href="<?php print $link_client_modify ?>">modify</a> | 
				<a href="<?php print $link_cancel ?>">cancel</a>
			<?php } elseif (isset($user->roles[9]) || isset($user->roles[10])) { ?>
				This appointment: 
				<a href="<?php print $link_modify ?>">modify</a> | 
				<a href="<?php print $link_complete ?>">mark as completed</a> 
			<?php } ?>
		</p>
		<p><a href="/dashboard">Go back to your dashboard</a></p>
	<?php } elseif(( $node->field_apt_status[0]["value"] == "Completed") && 
	(isset($user->roles[1]) || isset($user->roles[2]) || isset($user->roles[4]) || isset($user->roles[10]))) { ?> 
		<h3><span style="color : #000000;">Welcome <?php print $node->field_apt_fname[0]["value"] ?>!</span></h3> 
		<div class="para-with-space-on-bottom">We would love your feedback on your appointment with <?php print $stylist_name ?>.
		Thanks for using the Style For Hire Services and we look forward to working with you in the future.</div>
		<dt class="apt-type">Type:</dt> <dd><?php print $apt_type ?></dd>
		<dt class="apt-date">Date:</dt> <dd><?php print $apt_date ?></dd>
	<?php } ?>
	
  </div><!-- /content -->

  <?php print $links; ?>

	<?php 
		if (( $node->field_apt_status[0]["value"] == "Completed") && 
		(isset($user->roles[1]) || isset($user->roles[4]) || isset($user->roles[10]))) { ?> 
		<div class="para-with-space-on-top">Please rate your appointment with <?php print $stylist_name ?></div>
	<?php	
		print fivestar_widget_form($node);
	}	?>

</div></div> <!-- /node-inner, /node -->
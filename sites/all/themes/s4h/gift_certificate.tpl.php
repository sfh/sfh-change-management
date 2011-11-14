<?php

// $Id: node.tpl.php,v 1.4 2008/09/15 08:11:49 johnalbin Exp $



	drupal_add_css("sites/all/themes/s4h/gift-cert.css");



/*	These variables are dummy values, please set them from actual data sources. */

/*

	$gc_value	= "250";

	$gc_to		= "Andrew";

	$gc_from	= "Cindy";

	$gc_mesg	= "<p>Enjoy! I recommend Jackie O...she's the best.</p><p>Oh, and don't forget to embrace the pocket-square.</p>";

	$gc_code	= "SFH-81-84627449";

*/





?>

<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?>"><div class="node-inner">



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

      <?php if ($submitted): ?>

        <div class="submitted">

          <?php print $submitted; ?>

        </div>

      <?php endif; ?>

    </div>

  <?php endif; ?>



  

 <div class="content">

  <img src="<? echo url('sites/all/themes/s4h/_img/gc/s4h_gc_frame.JPG'); ?>" style="z-index:1;" />

  <table id="gc-wrapper" cellpadding="0" cellspacing="0" style="background:none; position:relative; margin-top:-580px; margin-left:-20px; ">

		<tr>

			<td class="td6 content" colspan="2">

				<div id="gc-main">

                   <p><i>Dear </i><i><?php echo ucfirst($gc_to); ?>,</i></p>

				   <p>Congratulations! You have received a gift certificate for <span>$<?php echo number_format($gc_value, 2); ?></span> toward personal styling services at Style for Hire.</p>

                   <p><i>Note: </i><i><?php echo ucfirst($gc_mesg); ?></i></p>

                   <p><i>From: </i><i><?php echo ucfirst($gc_from); ?></i></p>

                   <p>To redeem, please visit <a href="http://styleforhire.com/redeem">http://styleforhire.com/redeem</a> and create an account before entering the Gift Certificate code.  Your gift amount will be deducted during the check-out process. Email us at appointments@styleforhire.com if you have any questions at all.</p>

                   <p id="red-para">Gift Certificate Code: <?php echo $gc_code; ?></p>

				</div>

			</td>

		</tr>

	</table>



	<p><form id="print-form">

	<input type="button" value="Print This Page" onClick="window.print()" />

	</form>

	</p>

</div>



</div></div> <!-- /node-inner, /node -->


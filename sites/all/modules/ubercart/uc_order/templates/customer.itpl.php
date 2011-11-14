<?php
// $Id: customer.itpl.php,v 1.5.2.9 2009/09/21 14:34:49 islandusurper Exp $

/**
 * @file
 * This file is the default customer invoice template for Ubercart.
 */

?>

<table width="95%" border="0" cellspacing="0" cellpadding="1" align="center" bgcolor="#006699" style="font-family: verdana, arial, helvetica; font-size: small;">
  <tr>
    <td>
      <table width="100%" border="0" cellspacing="0" cellpadding="5" align="center" bgcolor="#FFFFFF" style="font-family: verdana, arial, helvetica; font-size: small;">
        <?php if ($business_header) { ?>
        <tr valign="top">
          <td>
            <table width="100%" style="font-family: verdana, arial, helvetica; font-size: small;">
              <tr>
                <td width="98%">
                  <span style="font-size: large;">[store-name]</span><br />
                </td>
                <td width="98%">
                  <div style="padding-left: 1em;">
                  [site-slogan]
                  </div>
                </td>
                <td nowrap="nowrap">
                  <br />
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <?php } ?>

        <tr valign="top">
          <td>

            <?php if ($thank_you_message) { ?>
            <p><b><?php echo t('Thanks for your order, [order-first-name]!'); ?></b></p>
			
            <?php } ?>
            <table cellpadding="4" cellspacing="0" border="0" width="100%" style="font-family: verdana, arial, helvetica; font-size: small;">
			   <?php if (is_array($order->products)) {
			    $only_once=0;
				foreach ($order->products as $product) {
				if(stristr($product->title,'Gift Certificate') == FALSE){ 
				if($only_once==0){?>
				<tr>
                <td colspan="2" bgcolor="red" style="color: white;">
                  <b><?php echo t('Appointment Information:'); ?></b>
                </td>
				</tr>
				<?php
				$only_once++;
				}
					if(stristr($product->title,'Closet Audit') != FALSE) $product_type = "Closet Audit";
					else if(stristr($product->title,'Stylist Introduction') != FALSE) $product_type = "Stylist Introduction";
					else if(stristr($product->title,'Closet Shopping') != FALSE) $product_type = "Closet Shopping";
					else if(stristr($product->title,'Personal Shopping: Shopping with you') != FALSE) $product_type = "Personal Shopping - Shopping with you";
					else if(stristr($product->title,'Personal Shopping: Shopping for you') != FALSE) $product_type = "Personal Shopping - Shopping for you";
				?>
			  <tr>
                <td nowrap="nowrap">
                    <b><?php echo t('Service:'); ?></b>
                </td>
                <td width="98%">
                        <b><?php echo $product_type; ?></b>
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                    <?php echo t('Stylist:'); ?>
                </td>
                <td width="98%">
                        <?php echo $product->data["apt_details"]["stylist"]; ?>
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                    <?php echo t('Requested Date:'); ?>
                </td>
                <td width="98%">
				    <?php echo date('l- F d, Y',(int)$product->data["apt_node"]->field_apt_date[0]["value"]); ?>
                </td>
              </tr>
			  <!-- <tr>
                <td nowrap="nowrap"> -->
                   <!-- <?php echo t('Requested Time:'); ?> -->
               <!-- </td>
                <td width="98%"> -->
				 <!--   <?php 
					$tz = (int)$product->data["apt_details"]["tz"]+5*60*60; //1) field_apt_date[0]["timezone"] is a negative value. 2) Central is GMT-5
					echo date('g:i a',(int)$product->data["apt_node"]->field_apt_date[0]["value"]+$tz); //this pulls the timezone of the server. since its in houston. it assumes the timezone of houston. 
					?> -->
              <!--  </td>
              </tr> -->
			  <tr>
                <td nowrap="nowrap">
                    <?php echo t('Duration:'); ?>
                </td>
                <td width="98%">
                        <?php echo $product->data["apt_details"]["requested_hours"].' hrs'; ?> 
                </td>
              </tr>
			  <?php }}} ?>
              <tr>
                <td colspan="2" bgcolor="red" style="color: white;">
                  <b><?php echo t('Order Information:'); ?></b>
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                    <?php echo t('Order #:'); ?>
                </td>
                <td width="98%">
                        [order-id] 
                </td>
              </tr>
			  <?php if (is_array($order->products)) {
                            $context = array(
                              'revision' => 'formatted',
                              'type' => 'order_product',
                              'subject' => array(
                                'order' => $order,
                              ),
                            );
                            foreach ($order->products as $product) {
                              $price_info = array(
                                'price' => $product->price,
                                'qty' => $product->qty,
                              );
                              $context['subject']['order_product'] = $product;
                              $context['subject']['node'] = node_load($product->nid);
							  if (is_array($product->data['attributes']) && count($product->data['attributes']) > 0) {
							  $gc_type = '';
							  foreach ($product->data['attributes'] as $attribute => $option) {
								if($attribute == "Certificate Type") {
										$gc_type = implode(', ', (array)$option);
										if(stristr($gc_type, 'Printable') === FALSE) {
												$gc_type = "(Electronic)";
										}
										else $gc_type = "(Printable)";
									}
								}
							}
							$product_type='';
							if(stristr($product->title,'Gift Certificate') != FALSE) $product_type = "Gift Certificate";
							else if(stristr($product->title,'Closet Audit') != FALSE) $product_type = "Closet Audit";
							else if(stristr($product->title,'Stylist Introduction') != FALSE) $product_type = "Stylist Introduction";
							else if(stristr($product->title,'Closet Shopping') != FALSE) $product_type = "Closet Shopping";
							else if(stristr($product->title,'Personal Shopping: Shopping with you') != FALSE) $product_type = "Personal Shopping - Shopping with you";
							else if(stristr($product->title,'Personal Shopping: Shopping for you') != FALSE) $product_type = "Personal Shopping - Shopping for you";
				?>
				<tr>
					<td nowrap="nowrap">
							<?php echo $product_type.$gc_type.':'; ?>
					</td>
					<td width="98%">
                        <?php echo uc_price($price_info, $context); ?>
                            <?php if ($product->qty > 1) {
                              $price_info['qty'] = 1;
                              echo t('(!price each)', array('!price' => uc_price($price_info, $context)));
                            } ?>
					</td>
				</tr>
							<?php }} ?>
					
			  <tr>
                      <td>&nbsp;</td>
                      <td>---------------</td>
                    </tr>
			  <tr>
                <td nowrap="nowrap">
                    <b><?php echo t('Order Total'); ?></b>
                </td>
                <td width="98%">
                        <b>[order-total]</b>
                </td>
              </tr>
			  <tr>
                <td colspan="2" bgcolor="red" style="color: white;">
                  <b><?php echo t('Billing Information:'); ?></b>
                </td>
              </tr>
              <tr>
                <td nowrap="nowrap">
                  <?php echo t('Name:'); ?>
                </td>
                <td width="98%">
                  [order-first-name] [order-last-name]
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                  <?php echo t('Address:'); ?>
                </td>
                <td width="98%">
                  [order-billing-address]
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                  <?php echo t('Phone:'); ?>
                </td>
                <td width="98%">
                  [order-billing-phone]
                </td>
              </tr>
			  <tr>
                <td nowrap="nowrap">
                  <?php echo t('Email:'); ?>
                </td>
                <td width="98%">
                  [order-email]
                </td>
              </tr>
              <tr>
                <td nowrap="nowrap">
                  <?php echo t('Payment Method:'); ?>
                </td>
                <td width="98%">
                  [order-payment-method]
                </td>
              </tr>
				
                   <?php
                    $context = array(
                      'revision' => 'themed',
                      'type' => 'line_item',
                      'subject' => array(
                        'order' => $order,
                      ),
                    );
                    foreach ($line_items as $item) {
                    if ($item['line_item_id'] == 'subtotal' || $item['line_item_id'] == 'total') {
                      continue;
                    }?>

                    <?php } ?>


                          <?php if (is_array($order->products)) {
                            $context = array(
                              'revision' => 'formatted',
                              'type' => 'order_product',
                              'subject' => array(
                                'order' => $order,
                              ),
                            );
                            foreach ($order->products as $product) {
                              $price_info = array(
                                'price' => $product->price,
                                'qty' => $product->qty,
                              );
                              $context['subject']['order_product'] = $product;
                              $context['subject']['node'] = node_load($product->nid);
                              ?>
                              <?php if (is_array($product->data['attributes']) && count($product->data['attributes']) > 0) {
								$gc_details = array();
								foreach ($product->data['attributes'] as $attribute => $option) {
								if($attribute == "Certificate Type") {
										$gc_details["Gift certificate"] = implode(', ', (array)$option);
										if(stristr($gc_details["Gift certificate"], 'Printable') === FALSE) {
												$gc_details["Gift certificate"] = "Electronic";
										}
										else $gc_details["Gift certificate"] = "Printable";
									}
								else if($attribute == "Recipient's First Name") {
										$gc_details["Recipient's first name"] = implode(', ', (array)$option);
									}
								else if($attribute == "Recipient's Last Name") {
										$gc_details["Recipient's last name"] = implode(', ', (array)$option);
									}
								else if($attribute == "Message To Recipient") {
										$gc_details["Gift message"] = implode(', ', (array)$option);
									}
								else if($attribute == "Certificate Code") {
										$gc_details["Gift certificate #"] = implode(', ', (array)$option);
									}
								else if($attribute == "Recipient's Email Address") {
										$gc_details["Recipient's Email Address"] = implode(', ', (array)$option);
									}
										
									
                              }
							if (count($gc_details > 0)) { ?>
							<tr>
								<td colspan="2" bgcolor="red" style="color: white;">
								<b><?php echo t('Gift Certificate Details:'); ?></b>
								</td>
							</tr>
							<tr>
                            <td valign="top" nowrap="nowrap">
                              <?php echo t('Recipient\'s name:'); ?>
                            </td>
                            <td width="98%">
                              <?php echo ucfirst($gc_details["Recipient's first name"]). ' '. ucfirst($gc_details["Recipient's last name"]); ?>
							  <br />
                            </td>
							</tr>
							<tr>
                            <td valign="top" nowrap="nowrap">
                              <?php echo t('Gift message:'); ?>
                            </td>
                            <td width="98%">
                              <?php echo $gc_details["Gift message"]; ?>
							  <br />
                            </td>
							</tr>
							<tr>
                            <td valign="top" nowrap="nowrap">
                              <?php echo t('Gift Certificate #:'); ?>
                            </td>
                            <td width="98%">
                              <?php echo $gc_details["Gift certificate #"]; ?>
							  <br />
                            </td>
							</tr>		
							<tr>
								<td colspan="2">
									<?php 
										if ($gc_details["Gift certificate"] == 'Printable'){
												echo t('Please <a href=\'https://styleforhire.com/giftcertificate/code/').$gc_details["Gift certificate #"].t('\'> click here </a> to view and print your certificate!'); 
											}
										else if($gc_details["Gift certificate"] == 'Electronic'){
												echo t('We have sent a gift certificate via email to ')
												.ucfirst($gc_details["Recipient's first name"])
												.' '
												.ucfirst($gc_details["Recipient's last name"])
												.' at '
												.$gc_details["Recipient's Email Address"]; 
										}
										
										?>
								</td>
							</tr>							
								
							
					 <?php }} ?>
                             
                          <?php }}?>

              <tr>
                <td colspan="2">
				  <br/>
                  <?php echo t('If you have any questions, please contact us at service@styleforhire.com.'); ?>
				  <br/><br/>
				  <?php echo t('Thank you,');?>
				  <br/>
				  <?php echo t('Style for Hire');?> 
				  <hr noshade="noshade" size="1" /><br />
                  <?php echo t('Please note: This e-mail message is an automated notification. Please do not reply to this message.'); ?>
				</td>
              </tr>
             

            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

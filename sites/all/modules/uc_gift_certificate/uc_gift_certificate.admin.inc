<?php
/**
 * Manage all of the gift certificates on record
 */
function uc_gift_certificate_manage($view_type = 'manage') {
  $query = "SELECT gc.* ,u.name as purchasername,u2.name as username, u.mail as purchasermail,u2.mail as usermail
    FROM {uc_gift_certificates} AS gc
    left outer join {users} AS u on gc.purchaser_id = u.uid
    left outer join {users} AS u2 on gc.user_id = u2.uid";

  // $result = db_query($query);
  $rows = array();

  $header = array(
    array('data' => t('Name'), field => 'gc.name'),
    array('data' => t('Gift Certificate Purchaser'), 'field' => 'purchasername', 'width' => '230'),
    array('data' => t('Gift Certificate Recipient'), 'width' => '230', 'field' => 'username'),
    array('data' => 'Value', 'width' => '60', 'field' => 'gc.value'),
    array('data' => 'Action', 'width' => 50),
    array('sort' => 'asc'),
  );

  $result = pager_query($query.tablesort_sql($header), 200, 0, NULL);

  while ($row = db_fetch_object($result)) {
    $rows[] = array($row->name,
                    $row->purchasername." (".$row->purchasermail.")",
                    $row->username." (".$row->usermail.")",
                    $row->value,
                    l(t('edit'), "admin/store/gift_certificates/$row->certificate_id/edit") . ' ' . l(t('delete'),"admin/store/gift_certificates/$row->certificate_id/delete"),
                  );
  }

  $output = theme('table', $header, $rows).theme('pager', NULL, 20, 0);

  // No gift certificates
  if ($output == null) {
    $output = "<p>There are currently no gift certificates in the system.</p>";
  }

  return $output;
}

/**
 * Implementation of hook_form
 *
 * Show the form to add a new certificate
 */
function uc_gift_certificate_add_form($form_state, $certificate_id) {
  $is_add = $certificate_id == 'add';

  if (!$is_add) {
    $value = uc_gift_certificate_load($certificate_id);

    $form['certificate_id'] = array(
      '#type' => 'value',
      '#value' => $value->certificate_id,
    );
  }
  $form['name'] = array(
    '#type' => 'textfield',
    '#title' => t('Gift Certificate Name'),
    '#default_value' => $value->name,
    '#weight' => 0,
    '#required' => true,
  );
  $form['cert_code'] = array(
    '#prefix' => t('<b>Certificate Code:</b><br/>'),
    '#value' => $value->cert_code,
    '#weight' => 14,
  );

  // If not using autocomplete
  if(!variable_get('uc_use_autocomplete_user_fields', true)) {
    $form['purchaser_id'] = array(
      '#type' => 'select',
      '#title' => t('Gift Certificate Purchaser'),
      '#default_value' => $value->purchaser_id,
      '#options' => uc_gift_certificate_load_users(),
      '#description' => 'Purchaser of gift certificate',
      '#weight' => 13,
    );

    $form['user_id'] = array(
      '#type' => 'select',
      '#title' => t('Gift Certificate Recipient'),
      '#default_value' => $value->user_id,
      '#options' => uc_gift_certificate_load_users(),
      '#description' => 'User of gift certificate',
      '#weight' => 13,
    );
  }
  else {
    $form['purchaser_id'] = array(
      '#type' => 'textfield',
      '#title' => t('Gift Certificate Purchaser'),
      '#default_value' => uc_gift_certificate_username_from_uid($value->purchaser_id),
      '#description' => 'Purchaser of gift certificate',
      '#autocomplete_path' => 'user/autocomplete',
      '#weight' => 13,
    );

    $form['user_id'] = array(
      '#type' => 'textfield',
      '#title' => t('Gift Certificate Recipient'),
      '#default_value' => uc_gift_certificate_username_from_uid($value->user_id),
      '#autocomplete_path' => 'user/autocomplete',
      '#description' => 'User of gift certificate',
      '#weight' => 13,
    );
  }
  $form['value'] = array(
    '#type' => 'textfield',
    '#title' => t('Value'),
    '#default_value' => $value->value,
    '#size' => 25,
    '#description' => t(''),
    '#required' => true,
    '#weight' => 6,
    );


  if ($is_add) {
    $form['new_user'] = array(
      '#type' => 'fieldset',
      '#title' => t('Create a new user'),
      '#collapsible' => TRUE,
      '#collapsed' => TRUE,
      '#weight' => 18,
    );
    $form['new_user']['new_user_checkbox'] = array(
      '#type' => 'checkbox',
      '#title' => t('Create a new user'),
      '#description' => t('Please check here to create a new user. You must then enter the email of the new user below.'),
      '#weight' => 18,
    );
    $form['new_user']['new_user_email'] = array(
      '#type' => 'textfield',
      '#size' => 25,
      '#description' => t(''),
      '#weight' => 19,
    );
  }
  $form['mail_user_checkbox'] = array(
    '#type' => 'checkbox',
    '#title' => t('Email the recipient'),
    '#description' => t('Check here to email the recipient the gift certificate.'),
    '#weight' => 20,
  );
  $form['cancel'] = array(
    '#type' => 'item',
    '#value' => l(t('Cancel and return to Gift Certificate Listing'), 'admin/store/gift_certificates'),
    '#weight' => 21,
  );
  $form['op'] = array('#type' => 'submit',
    '#value' => t('Submit'),
    '#weight' => 22,
  );
  return $form;
}

/**
 * Implementation of hook_form_submit
 * Adding a new gift certificate
 */
function uc_gift_certificate_add_form_submit($form, &$form_state) {
  $use_auto = variable_get('uc_use_autocomplete_user_fields', true);
  $is_new_cert = !isset($form_state['values']['certificate_id']);
  $is_new_user = $form_state['values']['new_user_checkbox'];
  $do_mail = $form_state['values']['mail_user_checkbox'];

  //drupal_set_message($form['cert_code']);
  // Make sure we don't generate a new cert code if we are editing an existing certificate.
  if (!isset($form_state['values']['cert_code'])) {
    $cert_code = uc_gift_certificate_mKey();
  }
  else {
    $cert_code = $form_state['values']['cert_code'];
  }

  // Using autocomplete
  if ($use_auto) {
    $form_state['values']['user_id'] =  uc_gift_certificate_uid_from_username($form_state['values']['user_id']);
    $form_state['values']['purchaser_id'] = uc_gift_certificate_uid_from_username($form_state['values']['purchaser_id']);
  }

  if ($is_new_cert) {
    $success = drupal_write_record('uc_gift_certificates', $form_state['values']);
    $certificate_id = db_last_insert_id('uc_gift_certificates', 'certificate_id');
    $cert_code = $certificate_id."-".$cert_code;
    db_query("UPDATE {uc_gift_certificates} SET cert_code = '%s' WHERE certificate_id = %d", $cert_code, $certificate_id);
  } else {
    $certificate_id = $form_state['values']['certificate_id'];
    $success = drupal_write_record('uc_gift_certificates', $form_state['values'], 'certificate_id');
  }

  if ($success) {
    if ($is_new_user) {
      uc_gift_certificate_mail_cert_notice($form_state['values']['new_user_email'], $certificate_id);
      drupal_set_message(t('A new user was created and emailed their gift certificate.'));
    }
    if ($do_mail && !$is_new_user) {
      $gc = uc_gift_certificate_load($certificate_id);
      $user = user_load(array('uid' => $gc->purchaser_id));
      $msg_to_recipient = NULL;
      if (!empty($gc->order_id)) {
        $order = uc_order_load($gc->order_id);
        foreach ($order->products as $product) {
          if ($product->order_product_id == $gc->order_product_id) {
            $data = $product->data;
            if (!empty($data['attributes']['Message To Recipient'])) {
              $msg_to_recipient = $data['attributes']['Message To Recipient'];
            }
            break;
          }
        }
      }
      uc_gift_certificate_mail_cert_notice($user->mail, $certificate_id, $msg_to_recipient);
      drupal_set_message(t('The recipient was emailed their gift certificate.'));
    }

    if ($is_new_cert) {
      drupal_set_message('Successfully added the gift certificate.');
    } else {
      drupal_set_message('Successfully updated the certificate.');
    }
  }
  drupal_goto('admin/store/gift_certificates');
}

/**
 * Confirm certificate deletion
 */
function uc_gift_certificate_delete_confirm($form_state, $cid) {
 $form['cid'] = array('#type' => 'value', '#value' => $cid);

 return confirm_form($form,
  t('Confirm Deletion of Gift Certificate %cid', array('%cid' => $cid)),
    'admin/store/gift_certificates',
  t('Deleting this gift certificate is irreversible.'),
    t('Delete'),
    t('Cancel')
  );
}

/**
 * Delete gift certificate
 */
function uc_gift_certificate_delete_confirm_submit($form, &$form_state) {
  $cert_id = $form_state['values']['cid'];
  $query = "DELETE FROM {uc_gift_certificates} WHERE certificate_id = '" . $cert_id . "'";
  if (db_query($query)) {
    drupal_set_message("Gift Certificate Deleted Successfully");
  }
  else {
    drupal_set_message("Error deleting gift certificate");
  }
  $form_state['redirect'] = 'admin/store/gift_certificates';
}

/**
 * Build the form
 */
function uc_gift_certificate_issue_certificate($certificate_id) {
  $output .= drupal_get_form('uc_gift_certificate_issue_form', $certificate_id);
  return $output;
}

/**
 * Form to enter a gift certificate (for a product)
 */
function uc_gift_certificate_issue_form(&$form_state, $certificate_id) {
  global $user;
  if (!uc_gift_certificate_is_purchaser($certificate_id, $user)){
    // Redirect to homepage
    drupal_goto();
  }
  $form['certificate_id'] = array('#type' => 'value',
      '#value' => $certificate_id,
  );
  $form['email'] = array(
    '#type' => 'textfield',
    '#title' => t('Email'),
    '#description' => t('Enter the email of the person you would like to give the gift certificate to.'),
    '#default_value' =>  '',
  );
  $form['op'] = array('#type' => 'submit',
    '#value' => t('Submit'),
    '#weight' => 2,
  );
  return $form;
}

/**
 * Implementation of hook_submit
 */
function uc_gift_certificate_issue_form_submit($form, &$form_state) {
  $mail = $form_state['values']['email'];
  $certificate_id = $form_state['values']['certificate_id'];
  uc_gift_certificate_mail_cert_notice($mail, $certificate_id);

  return 'my_gift_certificates';
}

/**
 * Hook_settings
 */
function uc_gift_certificate_settings() {
  $form['email_first']['uc_gc_email_new_user_subject'] = array(
    '#type' => 'textfield',
    '#title' => t('Email Subject - New User'),
    '#default_value' => variable_get('uc_gc_email_new_user_subject', uc_gift_certificate_get_setting_defaults('uc_gc_email_new_user_subject')),
    '#description' => t('Email sent to notify a new user. Available variables are: !gift_certificate_message, !gift_certificate_value, !gift_certificate_value_integer, !gift_certificate_code, !username, !site, !password, !uri, !uri_brief, !mailto, !date, !login_uri, !edit_uri, !login_url.'),
  );
  $form['email_first']['uc_gc_email_new_user_body'] = array(
    '#type' => 'textarea',
    '#title' => t('Email Body'),
    '#default_value' => variable_get('uc_gc_email_new_user_body', uc_gift_certificate_get_setting_defaults('uc_gc_email_new_user_body')),
    '#description' => t('Email sent to notify an existing user.'),
  );
  $form['email_second']['uc_gc_email_subject'] = array(
    '#type' => 'textfield',
    '#title' => t('Email Subject - Existing User'),
    '#default_value' => variable_get('uc_gc_email_subject', uc_gift_certificate_get_setting_defaults('uc_gc_email_subject')),
    '#description' => t('Email sent to notify an existing user. Available variables are: !gift_certificate_message, !gift_certificate_value, !gift_certificate_value_integer, !gift_certificate_code, !username, !site,  !uri, !uri_brief, !mailto, !date, !login_uri.'),
  );
  $form['email_second']['uc_gc_email_body'] = array(
    '#type' => 'textarea',
    '#title' => t('Email Body'),
    '#default_value' => variable_get('uc_gc_email_body', uc_gift_certificate_get_setting_defaults('uc_gc_email_body')),
    '#description' => t('Email sent to notify an existing user.'),
  );
  $form['uc_gc_email_format'] = array(
    '#type' => 'select',
    '#title' => t('Email format'),
    '#options' => _uc_gift_certificate_format_options(),
    '#default_value' => variable_get('uc_gc_email_format', uc_gift_certificate_get_setting_defaults('uc_gc_email_format')),
    '#description' => t('If you have the mimemail module installed, you can choose to send your email messages in HTML format.'),
  );
  $form['uc_gc_pane_msg'] = array(
    '#type' => 'textarea',
    '#title' => t('Checkout Pane Message'),
    '#default_value' => variable_get('uc_gc_pane_msg', uc_gift_certificate_get_setting_defaults('uc_gc_pane_msg')),
    '#description' => t('Gift certificate message in the checkout pane.'),
  );
  $form['uc_use_autocomplete_user_fields'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use Autocomplete Fields'),
    '#default_value' => variable_get('uc_use_autocomplete_user_fields', true),
    '#description' => t('Use autocomplete fields for choosing which users are associated with a given gift certificate.'),
  );
  foreach (uc_order_status_list('general') as $status) {
    $options[$status['id']] = $status['title'];
  }
  foreach (uc_order_status_list('specific') as $status) {
    $options[$status['id']] = $status['title'];
  }
  //$options['status_any'] = "Any status";
  $gc_status_array_default = array (
    'payment_received' => 'payment_received',
    'pending' => 0,
    'processing' => 0,
    'paypal_pending' => 0,
    'completed' => 0,
    'canceled' => 0,
    'in_checkout' => 0,
  );
  $form['uc_gift_certificate_order_status'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Order Status Gift Certificate '),
    '#default_value' => variable_get('uc_gift_certificate_order_status', $gc_status_array_default),
    '#options' => $options,
    '#attributes' => array('style' => 'display: inline;'),
    '#description' => t('Choose what the order status must be when issuing gift certificates'),

  );
  return system_settings_form($form);
}

/**
 * Issue a new gift certificate
 */
function uc_gift_certificate_issue() {
  global $user;

  $num_rows = db_result(db_query("SELECT COUNT(*) FROM {uc_gift_certificates} WHERE purchaser_id = %d", $user->uid));
  $result = db_query("SELECT * FROM {uc_gift_certificates} WHERE purchaser_id = %d", $user->uid);
  $rows = array();

  while ($row = db_fetch_object($result)) {
    if ($num_rows == 1) {
      drupal_goto("gift_certificates/$row->certificate_id/issue");
    }
    $rows[] = array($row->name, $row->value, l(t('send'), "gift_certificates/$row->certificate_id/issue"));
  }
  $header = array(array('data' => 'Name', 'width' => '100'),  array('data' => 'Value', 'width' => '60'),  array('data' => '', 'width' => 50));
  $output .= theme('table',$header, $rows);

  if ($output == null) {
    $output = "<p>There are currently no gift certificates in the system.</p>";
  }
  return $output;
}

/**
 * Determine possible mail format options.
 *
 * The mime_mail module must be installed to send HTML mails.
 */
function _uc_gift_certificate_format_options() {
  $options = array('plain' => t('plain'));
  if (module_exists('mimemail')) {
    $options['html'] = t('html');
  }
  return $options;
}

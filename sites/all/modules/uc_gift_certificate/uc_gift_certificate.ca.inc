<?php
// $Id

/**
 * @file
 * Conditional Actions hooks for uc_gift_certificate.module.
 */

/**
 * Implementation of hook_ca_trigger().
 */
function uc_gift_certificate_ca_trigger() {

  $triggers = array();

  $triggers['calculate_certificate_discounts'] = array(
    '#title' => t('Calculate Gift Certificate discounts'),
    '#category' => t('Gift Certificates'),
    '#arguments' => array(
      'line_item' => array('#entity' => 'uc_line_item', '#title' => t('Line item')),
      'account' => array('#entity' => 'user', '#title' => t('User account')),
    ),
  );

  return $triggers;
}

/**
 * Implementation of hook_ca_condition().
 */
function uc_gift_certificate_ca_condition() {
  $conditions = array();

  $conditions['uc_gift_certificate_condition_coupon_code'] = array(
    '#title' => t('Paying with gift certificates'),
    '#description' => t('Customer has entered a valid coupon code at checkout.'),
    '#category' => t('Order'),
    '#callback' => 'uc_gift_certificate_condition_coupon_code',
    '#arguments' => array(
      'order' => array('#entity' => 'uc_order', '#title' => t('Order')),
    ),
  );

  return $conditions;
}

function uc_gift_certificate_condition_coupon_code($order, $settings) {

}


/**
 * Implementation of hook_ca_action().
 */
function uc_gift_certificate_ca_action() {
  $actions = array();

  $actions['uc_gift_certificate_action_get_order_discount'] = array(
    '#title' => t('Apply a discount'),
    '#category' => t('Discounts'),
    '#callback' => 'uc_gift_certificate_get_order_discount',
    '#arguments' => array(
      'order' => array(
        '#entity' => 'uc_order',
        '#title' => t('Order'),
      ),
    ),
  );
  $actions['uc_gift_certificate_action_get_product_discount'] = array(
    '#title' => t('Apply a discount to a product'),
    '#category' => t('Discounts'),
    '#callback' => 'uc_gift_certificate_get_product_discount',
    '#arguments' => array(
      'product' => array(
        '#entity' => 'node',
        '#title' => t('Product'),
      ),
    ),
  );
  $actions['uc_gift_certificate_action_get_line_item_discount'] = array(
    '#title' => t('Apply a discount to a line item'),
    '#category' => t('Discounts'),
    '#callback' => 'uc_gift_certificate_get_line_item_discount',
    '#arguments' => array(
      'line_item' => array(
        '#entity' => 'line_item',
        '#title' => t('Line item'),
      ),
    ),
  );

  return $actions;
}

/**
 * Wrapper function for order discounts.
 */
function uc_gift_certificate_get_order_discount($order, $settings) {
  return uc_gift_certificate_get_discount($order, $settings);
}

/**
 * Wrapper function for order discount forms.
 */
function uc_gift_certificate_get_order_discount_form($form_state, $settings = array()) {
  $settings['context'] = 'order';

  $form = uc_gift_certificate_get_discount_form($form_state, $settings);
  $form['line_item_weight'] = array(
    '#type' => 'weight',
    '#title' => t('List position'),
    '#delta' => 10,
    '#default_value' => isset($settings['line_item_weight']) ? $settings['line_item_weight'] : variable_get('uc_li_discount_weight', 5),
  );

  return $form;
}

/**
 * Wrapper function for product discounts.
 */
function uc_gift_certificate_get_product_discount($product, $settings) {
  $product->sell_price += uc_gift_certificate_get_discount($product, $settings);
}

/**
 * Wrapper function for product discount forms.
 */
function uc_gift_certificate_get_product_discount_form($form_state, $settings = array()) {
  $settings['context'] = 'product';
  return uc_gift_certificate_get_discount_form($form_state, $settings);
}

/**
 * Wrapper function for line item discounts.
 */
function uc_gift_certificate_get_line_item_discount($line_item, $settings) {
  $line_item->amount += uc_gift_certificate_get_discount($line_item, $settings);
}

/**
 * Wrapper function for line item discount forms.
 */
function uc_gift_certificate_get_line_item_discount_form($form_state, $settings = array()) {
  $settings['context'] = 'line_item';
  return uc_gift_certificate_get_discount_form($form_state, $settings);
}

/**
 * Action callback to return the amount of a discount line item.
 *
 * Unfortunately, only the forms of the discount actions is any different based
 * on the discount context. The form function names are based on the callback
 * function of the action, so they have to be split apart to establish context.
 *
 * @see uc_gift_certificate_ca_action()
 */
function uc_gift_certificate_get_discount($entity, $settings) {
  // If we are adding a base number as a discount, return it.
  if ($settings['operation'] == 'add') {
    return floatval($settings['amount']);
  }

  // When multiplying, we need to figure out how much to multiply the amount
  // by.
  $type = $settings['discount']['type'];
  $discount = uc_gift_certificate_get_discounts('discounts', $type);

  // Each discount type uses its settings and the order object to calculate
  // what the discount applies to.
  if (isset($discount['callback']) && function_exists($discount['callback'])) {
    $base = call_user_func($discount['callback'], $entity, $settings['discount'][$type]);
  }
  else {
    $base = 0;
  }

  return $base * $settings['amount'];
}

/**
 * Settings form for uc_gift_certificate_action_get_discount().
 *
 * @see uc_gift_certificate_action_get_discount()
 */
function uc_gift_certificate_get_discount_form($form_state, $settings = array()) {
  $form = array();

  $form['operation'] = array(
    '#type' => 'radios',
    '#title' => t('Operation'),
    '#options' => array(
      'add' => t('Add'),
      'multiply' => t('Multiply'),
    ),
    '#default_value' => isset($settings['operation']) ? $settings['operation'] : 'add',
    '#description' => t('Choose how the discount amount will be calculated against the order.'),
  );

  $form['amount'] = array(
    '#type' => 'textfield',
    '#title' => t('Amount'),
    '#default_value' => $settings['amount'],
    '#description' => t('The value to be added to or multiplied. Remember to use negative numbers to lower the order total.'),
  );

  $form['discount'] = array(
    '#type' => 'fieldset',
    '#title' => t('Discount settings'),
    '#tree' => TRUE,
  );

  // Get all of the discount types for this context, and their settings forms.
  $discounts = uc_gift_certificate_get_discount_options($settings['context']);
  $form['discount']['type'] = array(
    '#type' => 'radios',
    '#title' => t('Discount type'),
    '#options' => $discounts,
    '#default_value' => isset($settings['discount']['type']) ? $settings['discount']['type'] : key($discounts),
    '#description' => t('The part of the order needed to calculate the discount amount. Added discounts are always applied to the order total.'),
  );

  $discount_forms = uc_gift_certificate_get_discount_forms($form_state, $settings);
  foreach ($discount_forms as $id => $fieldset) {
    $form['discount'][$id] = $fieldset;
    if (!empty($fieldset)) {
      $form['discount'][$id] = $form['discount'][$id] + array(
        '#type' => 'fieldset',
        '#title' => $discounts[$id],
        '#collapsible' => TRUE,
        '#collapsed' => TRUE,
      );
    }
  }

  return $form;
}

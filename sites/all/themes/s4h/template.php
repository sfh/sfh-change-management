<?php
// $Id: template.php,v 1.17.2.1 2009/02/13 06:47:44 johnalbin Exp $

/**
 * @file
 * Contains theme override functions and preprocess functions for the theme.
 *
 * ABOUT THE TEMPLATE.PHP FILE
 *
 *   The template.php file is one of the most useful files when creating or
 *   modifying Drupal themes. You can add new regions for block content, modify
 *   or override Drupal's theme functions, intercept or make additional
 *   variables available to your theme, and create custom PHP logic. For more
 *   information, please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/theme-guide
 *
 * OVERRIDING THEME FUNCTIONS
 *
 *   The Drupal theme system uses special theme functions to generate HTML
 *   output automatically. Often we wish to customize this HTML output. To do
 *   this, we have to override the theme function. You have to first find the
 *   theme function that generates the output, and then "catch" it and modify it
 *   here. The easiest way to do it is to copy the original function in its
 *   entirety and paste it here, changing the prefix from theme_ to s4h_.
 *   For example:
 *
 *     original: theme_breadcrumb()
 *     theme override: s4h_breadcrumb()
 *
 *   where s4h is the name of your sub-theme. For example, the
 *   zen_classic theme would define a zen_classic_breadcrumb() function.
 *
 *   If you would like to override any of the theme functions used in Zen core,
 *   you should first look at how Zen core implements those functions:
 *     theme_breadcrumbs()      in zen/template.php
 *     theme_menu_item_link()   in zen/template.php
 *     theme_menu_local_tasks() in zen/template.php
 *
 *   For more information, please visit the Theme Developer's Guide on
 *   Drupal.org: http://drupal.org/node/173880
 *
 * CREATE OR MODIFY VARIABLES FOR YOUR THEME
 *
 *   Each tpl.php template file has several variables which hold various pieces
 *   of content. You can modify those variables (or add new ones) before they
 *   are used in the template files by using preprocess functions.
 *
 *   This makes THEME_preprocess_HOOK() functions the most powerful functions
 *   available to themers.
 *
 *   It works by having one preprocess function for each template file or its
 *   derivatives (called template suggestions). For example:
 *     THEME_preprocess_page    alters the variables for page.tpl.php
 *     THEME_preprocess_node    alters the variables for node.tpl.php or
 *                              for node-forum.tpl.php
 *     THEME_preprocess_comment alters the variables for comment.tpl.php
 *     THEME_preprocess_block   alters the variables for block.tpl.php
 *
 *   For more information on preprocess functions and template suggestions,
 *   please visit the Theme Developer's Guide on Drupal.org:
 *   http://drupal.org/node/223440
 *   and http://drupal.org/node/190815#template-suggestions
 */


/*
 * Add any conditional stylesheets you will need for this sub-theme.
 *
 * To add stylesheets that ALWAYS need to be included, you should add them to
 * your .info file instead. Only use this section if you are including
 * stylesheets based on certain conditions.
 */
/* -- Delete this line if you want to use and modify this code
// Example: optionally add a fixed width CSS file.
if (theme_get_setting('s4h_fixed')) {
  drupal_add_css(path_to_theme() . '/layout-fixed.css', 'theme', 'all');
}
// */

function tpl_unserialize($var) {
	return unserialize(str_replace("&quot;", '"', $var));
}

/**
 * Implementation of HOOK_theme().
 */
function s4h_theme(&$existing, $type, $theme, $path) {
  $hooks = zen_theme($existing, $type, $theme, $path);
  // Add your theme hooks like this:
  /*
  $hooks['hook_name_here'] = array( // Details go here );
  */
  $hooks['comment_form'] = array(
     'arguments' => array('form' => NULL),
  );
  $hooks['user_register'] = array(
     'arguments' => array('form' => NULL),
	 'template' => 'user-register',
  );
  $hooks['user_login'] = array(
     'arguments' => array('form' => NULL),
	 'template' => 'user-login',
  );
  // @TODO: Needs detailed comments. Patches welcome!
  return $hooks;
}

/**
 * Override or insert variables into all templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered (name of the .tpl.php file.)
 */
/* -- Delete this line if you want to use this function
function s4h_preprocess(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function s4h_preprocess_page(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function s4h_preprocess_node(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function s4h_preprocess_comment(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function s4h_preprocess_block(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */


/**
 * Implementation of theme_menu_item_link().
 *
 * Integrates Menu Class
 */

function phptemplate_menu_item_link($link) {
  if (function_exists('menuclass_to_link')) {
    menuclass_to_link($link);
  }
  return theme_menu_item_link($link);
}

/**
 * Implements theme_menu_item_link()
 */


function s4h_menu_item_link($link) {
/* Subu to hide the login, register and forgot your pwd tabs */
// Do not render tab or link for "Create new account" pointing to "user/register".
  if ($link['title'] == t('Create new account') && $link['path'] == 'user/register') return;
// Do not render tab or link for "Log in" pointing to "user/login".
  if ($link['title'] == t('Log in') && $link['path'] == 'user/login') return;
// Do not render tab or link for "Request new password" pointing to "user/password".
  if ($link['title'] == t('Request new password') && $link['path'] == 'user/password') return;
 
  if (empty($link['localized_options'])) {
    $link['localized_options'] = array();
  }

if (function_exists('menuclass_to_link')) {
  menuclass_to_link($link);
}

/* //   New code
   if ($link['href'] == "/adv_search") {
    if (empty($link['localized_options']['attributes']['id'])) {
      $link['localized_options']['attributes']['id'] = 'adv-search';
    } else {
      $link['localized_options']['attributes']['id'] .= ' adv-search';
    }
  }
  // end new code
*/

  // If an item is a LOCAL TASK, render it as a tab
  if ($link['type'] & MENU_IS_LOCAL_TASK) {
    $link['title'] = '<span class="tab">' . check_plain($link['title']) . '</span>';
    $link['localized_options']['html'] = TRUE;
  }

  return l($link['title'], $link['href'], $link['localized_options']);
}

if (module_exists('cluetip')) {
jq_add('cluetip');
}


/**
* Removes the resizable functionality from the textareas if they are not on a node creation page.
* The node body textarea disapears when it is not resizable.
*/
function phptemplate_textarea($element) {
  if (strpos($_GET['q'], 'node/add') !== 0) {
    $element['#resizable'] = FALSE;
  }
  return theme_textarea($element);
}

/* adds a span tag inside the legend so we can control the legend width
function s4h_fieldset($element) {

  if (!empty($element['#collapsible'])) {
    drupal_add_js('misc/collapse.js');

    if (!isset($element['#attributes']['class'])) {
      $element['#attributes']['class'] = '';
    }

    $element['#attributes']['class'] .= ' collapsible';
    if (!empty($element['#collapsed'])) {
      $element['#attributes']['class'] .= ' collapsed';
    }
  }

// Opening Tag
    $fieldset  .= '<fieldset'. drupal_attributes($element['#attributes']) .'>';
    
    // Add the title.
    if (isset($element['#title']) && ($element['#title'] != '')) {
        $fieldset .= '<legend><span>'. $element['#title'] .'</span></legend>';
    }
    
    // Add the description.
    if (isset($element['#description']) && ($element['#description'] != '')) {
        $fieldset .= '<div class="description">'. $element['#description'] .'</div>';
    }
    
    // Add any child elements.
    if (!empty($element['#children'])) {
        $fieldset .= $element['#children'];
    }
    
    // Add this items content.
    if (isset($element['#value'])) {
        $fieldset .= $element['#value'];
    }
    
    // Closing Tag
    $fieldset .= "</fieldset>\n";
}
*/

function s4h_build_lookbook_photos($photos, $section) {

	//var_dump($photos);

	$first = true;
	if ( is_array($photos)) {
		foreach ($photos as $item) {
			print '<span id="lookbookPhotoMain-'.md5($item['filepath']).'" class="lookbookPhotos'.($first === TRUE? '' : ' hiddenPhotos').'">';

			print theme(
				'imagecache',
				'lookbook_detail',
				$item['filepath']
			);
			print '<span class="description">'.$item['data']['description'].'</span></span>';

			$first = false;
		}

		print '<span id="thumbNails">';

		foreach ($photos as $item) {

			print '<a href="javascript:update_photo(\'lookbookPhotoMain-'.md5($item['filepath']).'\', \''.$section.'\')">'.theme(
				'imagecache',
				'lookbook_thumbnail',
				$item['filepath']
			).'</a>';

		}

		print '</span>';
	}
	
	else {
		print '<span class="lookbookPhotos"><img src="/sites/all/themes/s4h/_img/lookbook_imgholder.gif" alt="no image" /></span>';
	}
}
/* subu created this to remove the view/edit tabs from appointment */
function s4h_menu_local_tasks() {

  $output = '';
  $node = new stdClass();
  if (arg(0) == 'node' && is_numeric(arg(1))) {
    $node = node_load(arg(1));
  }
  if (in_array($node->type, array('appointment'))) {
    return;
  }
  if ($primary = menu_primary_local_tasks()) {
    $output .= "<ul class=\"tabs clear-block primary\">\n". $primary ."</ul>\n";
  }
  if ($secondary = menu_secondary_local_tasks()) {
    $output .= "<ul class=\"tabs clear-block secondary\">\n". $secondary ."</ul>\n";
  }

  return $output;
}


// subu - theme the crap out of the comment form
function s4h_comment_form($form) {
$nid = $form['nid']['#value'];
$node = node_load(array('nid' => $nid));
   
  // Only edit the comment form if the node type is 'appointment'.
  if ($node->type == 'appointment' && $node->field_apt_status[0]['value'] == "Completed") {
    // Your form customisations here
	// Add some intro text.
	
	  $form['intro']['#value']  = t('<h3>Please leave your review!</h3>');
	  // Wrap the intro in a div for themeing.
	  //$form['intro']['#prefix']  = '<div class="comment-guidelines">';
	  //$form['intro']['#suffix']  = '</div>';
	  // Weight it so it floats to the top.
	  //$form['intro']['#weight']  = -40;
	 
	  // Make the text-area smaller.
	  $form['comment_filter']['comment']['#rows']   = 5;
	  // Change the text-area title
	  $form['comment_filter']['comment']['#title']  = t('Your message');
	  // Add a div wrapper for themeing.
	  $form['comment_filter']['comment']['#prefix'] = '<div class="comment-form-prefix">';
	  $form['comment_filter']['comment']['#suffix'] = '</div>';
	  // Remove input formats information.
	  $form['comment_filter']['format'] = NULL;
	  unset($form['_author']);
	  unset($form['comment_filter']['comment']['#title']);  
	  unset($form['preview']);
	  unset($form['subject']);
	  //$form['author']['#value'] = $node->field_apt_fname[0]["value"];
	  //dpm($form['author']['#value']);
  }

  
  
  return drupal_render($form);
}

function s4h_comment_submitted($comment) {
  
  $node = node_load(array('nid' => $comment->nid));
   if ($node->type == 'appointment' && $node->field_apt_status[0]['value'] == "Completed") {
	return t('Submitted by '.$node->field_apt_fname[0]["value"].' on @datetime.',
    array(
      '@datetime' => format_date($comment->timestamp)
    ));
   
   }
  return t('Submitted by !username on @datetime.',
    array(
      '!username' => theme('username', $comment),
      '@datetime' => format_date($comment->timestamp)
    ));
}

function s4h_preprocess_box(&$vars, $hook) {
  switch($vars['title']) {
   case 'Post new comment':
    $vars['title'] = t('Please leave your review!');
   case 'Reply':
	$vars['title'] = t('Please leave your review!');
  }
}
/*
function s4h_form(&$node, &$param) {
	
	if($node->type == "event"){
	$form = array();
		$form['#submit'] = array('s4h_node_event_submit_handler');
		return $form;
	}
	
}

function s4h_node_event_submit_handler($form, &$form_state) {
	var_dump("get to template.php");
	drupal_goto("dashboard","");
}

*/
function s4h_preprocess_user_register(&$variables) {
  $variables['intro_text'] = t('Register with Style for Hire');
  $variables['rendered'] = drupal_render($variables['form']);
}
function s4h_preprocess_user_login(&$variables) {
  $variables['intro_text'] = t('Login');
  $variables['rendered'] = drupal_render($variables['form']);
}





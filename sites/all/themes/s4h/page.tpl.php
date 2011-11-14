<?php
// $Id: page.tpl.php,v 1.14.2.6 2009/02/13 16:28:33 johnalbin Exp $

/**
 * @file page.tpl.php
 *
 * Theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $css: An array of CSS files for the current page.
 * - $directory: The directory the theme is located in, e.g. themes/garland or
 *   themes/garland/minelli.
 * - $is_front: TRUE if the current page is the front page. Used to toggle the mission statement.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Page metadata:
 * - $language: (object) The language the site is being displayed in.
 *   $language->language contains its textual representation.
 *   $language->dir contains the language direction. It will either be 'ltr' or 'rtl'.
 * - $head_title: A modified version of the page title, for use in the TITLE tag.
 * - $head: Markup for the HEAD section (including meta tags, keyword tags, and
 *   so on).
 * - $styles: Style tags necessary to import all CSS files for the page.
 * - $scripts: Script tags necessary to load the JavaScript files and settings
 *   for the page.
 * - $body_classes: A set of CSS classes for the BODY tag. This contains flags
 *   indicating the current layout (multiple columns, single column), the current
 *   path, whether the user is logged in, and so on.
 * - $body_classes_array: An array of the body classes. This is easier to
 *   manipulate then the string in $body_classes.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 * - $mission: The text of the site mission, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $search_box: HTML to display the search box, empty if search has been disabled.
 * - $primary_links (array): An array containing primary navigation links for the
 *   site, if they have been configured.
 * - $secondary_links (array): An array containing secondary navigation links for
 *   the site, if they have been configured.
 *
 * Page content (in order of occurrance in the default page.tpl.php):
 * - $left: The HTML for the left sidebar.
 *
 * - $breadcrumb: The breadcrumb trail for the current page.
 * - $title: The page title, for use in the actual HTML content.
 * - $help: Dynamic help text, mostly for admin pages.
 * - $messages: HTML for status and error messages. Should be displayed prominently.
 * - $tabs: Tabs linking to any sub-pages beneath the current page (e.g., the view
 *   and edit tabs when displaying a node).
 *
 * - $content: The main content of the current Drupal page.
 *
 * - $right: The HTML for the right sidebar.
 *
 * Footer/closing data:
 * - $feed_icons: A string of all feed icons for the current page.
 * - $footer_message: The footer message as defined in the admin settings.
 * - $footer : The footer region.
 * - $closure: Final closing markup from any modules that have altered the page.
 *   This variable should always be output last, after all other dynamic content.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 */
 function ae_detect_ie()
{
    if (isset($_SERVER['HTTP_USER_AGENT']) && 
    (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false))
        return true;
    else
        return false;
}
//detect IE7 browser
function detect_ie7()
{
 if (stristr($_SERVER['HTTP_USER_AGENT'], "msie 7"))
	return true;
 else return false;
}
 function set_cookie_to_find_if_browser_supports_cookies(){
	setCookie('check_if_browser_cookies_enabled', 'true',time()+60*60);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
    <title><?php print $head_title ?></title>
    <meta name="DC.description" content="" />
    <meta name="DC.subject" content="" />
    <meta name="DC.creator" content="Style for Hire" />
    <meta name="DC.publisher" content="" />
    <meta name="DC.language" content="en" />
    <?php print $head; ?>
    <?php print $styles; ?>
    <?php print $scripts; ?>
	<?php if(!$_COOKIE['check_if_browser_cookies_enabled']){
			set_cookie_to_find_if_browser_supports_cookies();
		}
	?>
</head>
<body class="<?php print $body_classes; if ($tabs) print " with-tabs"; ?>">
<div id="center">

  <div id="page"><div id="page-inner">
	<?php if($node->nid==29): ?>
    <div id="stacyImageLeftAbout">
	    <a href="/" title="Home"><img alt="" src="/sites/all/themes/s4h/_img/newones/leftedge/stacy-about-left.JPG" /></a>
	</div>
	<?php endif; ?>
	<?php if($node->nid==30): ?>
    <div id="stacyImageLeftServices">
	    <a href="/" title="Home"><img width="330" height="545" alt="" src="/sites/all/themes/s4h/_img/newones/leftedge/stacy-gifts-left.JPG" /></a>
	</div>
	<?php endif; ?>
	<?php if($node->nid==31): ?>
    <div id="stacyImageLeftGifts">
	    <a href="/" title="Home"><img width="337" height="570" alt="" src="/sites/all/themes/s4h/_img/newones/leftedge/stacy-gifts-left.JPG" /></a>
	</div>
	<?php endif; ?>
	<?php if($node->nid==32): ?>
    <div id="stacyImageLeftStylists">
	    <a href="/" title="Home"><img width="340" height="575" alt="" src="/sites/all/themes/s4h/_img/newones/leftedge/stacy-gifts-left.JPG" /></a>
	</div>
	<?php endif; ?>
	<?php if($node->nid==232): ?>
    <div id="stacyImageLeftStylists">
	    <a href="/" title="Home"><img width="340" height="575" alt="" src="/sites/all/themes/s4h/_img/newones/leftedge/stacy-gifts-left.JPG" /></a>
	</div>
	<?php endif; ?>
	<a name="top" id="navigation-top"></a>

    <div id="header">
	<?php if (  ($node->nid==29 
                ||  $node->nid==31
                ||  $node->nid==30 
                ||  $node->nid==32
                ||  $node->nid==232)): ?>
		<div id="header-inner">
	<?php else: ?>
		<div id="header-inner" class="clear-block">
	<?php endif; ?> 
	
	
     
   <div id="supernav">
	<?php if (  !($node->nid==29 
                ||  $node->nid==31
                ||  $node->nid==30 
                ||  $node->nid==32
                ||  $node->nid==232)): ?>
        <div id="logo"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><img src="/sites/default/files/s4h_logo.PNG" alt="<?php print t('Home'); ?>" /></a></div>
    <?php endif; ?> 
 	<div id="superdupernav-blocks">
		<div id="superdupernav-inner">
			<div class="body-group">
				<?php
					global $user;
					if (!$user->uid) {
						print t('<a href="@login" class="loginout popups login">Login</a>', array('@login' => url('http://styleforhire.com/user')));
					} else {
						print t('<a href="@logout" class="loginout login">Logout</a>', array('@logout' => url('logout')));
					}
				?>
			</div>
	</div></div>
	<div id="supernav-soc-net-blocks">
		<?php print t('<a target="new" href="http://www.facebook.com/styleforhire"><img src="/sites/all/themes/s4h/_img/newones/facebook-logo.png" border="0" /></a>'); ?>
		<?php print t('<a target="new" href="http://twitter.com/styleforhire"><img src="/sites/all/themes/s4h/_img/newones/twitter-logo.png" border="0" /></a>'); ?>
	</div>
	<?php 
    if ($user->uid) {
    $value_certificate = uc_gift_certificate_total($user->uid);
    if ($value_certificate != 0) {
      $congratulation = t("Congratulations"). '&nbsp;' . $user->name . '!&nbsp;<br>' . t("You have <strong>!value</strong> credit<br>toward your next appointment.",array('!value' => uc_currency_format($value_certificate)));
	  echo '<div class="gift-certificate-msg">'.$congratulation.'</div>';
    }
	else echo '<div class="gift-certificate-msg">Logged in as '.$user->name.'</div>';
 }                                   
?>

	<div id="supernav-blocks">
        <?php if (!(isset($user->roles[3]) || isset($user->roles[8]) || isset($user->roles[9]))) {
				print t('<a href="@cart" id="cartview">View Cart</a>', array('@cart' => url('cart')));
				}
			  else if ($user->uid && (isset($user->roles[3]) || isset($user->roles[8]) || isset($user->roles[9]))) {
			   print t('<a href="@dashboard" id="dashboard">My Dashboard</a>', array('@dashboard' => url('dashboard')));
			  }
		?>
        <?php if ($supernav): ?>
          <?php print $supernav; ?>
        <?php endif; ?>
     </div> 
	 <div id="contact-num"><?php echo t('1.877.789.5307'); ?></div>
   </div>
      
      <?php if ($logo || $site_name || $site_slogan): ?>
    
        <div id="supernav" class="body-group">

        <?php if ($site_name): ?>
        <?php if ($title): ?>
          <div id="site-name" class="img-sub">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
            <?php print $site_name; ?>
            </a>
          </div>
        <?php else: ?>
          <h1 id="site-name" class="img-sub">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home">
            <?php print $site_name; ?>
            </a>
          </h1>
        <?php endif; ?>
        <?php endif; ?>
    
         <div id="superdupernav-blocks"><div id="superdupernav-inner">
            <div class="body-group">
        <?php
            global $user;
            if (!$user->uid) {
                print t('<a href="@login" class="loginout">Login</a>', array('@login' => url('user')));
            } else {
                print t('<a href="@logout" class="loginout">Logout</a>', array('@logout' => url('logout')));
            }
            print $message;
        ?>
        <?php if ($superdupernav): ?>
          <?php print $superdupernav; ?>
        <?php endif; ?>
            </div>
        </div></div>
         <div id="supernav-blocks">
        <?php if ($user->uid) print t('<a href="@cart" id="cartview" class="popups">View Cart</a>', array('@cart' => url('cart'))); ?>
        <?php if ($supernav): ?>
          <?php print $supernav; ?>
        <?php endif; ?>
        </div> 

        <?php if ($logo): ?>
        <div id="logo"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" id="logo-image" /></a></div>
        <?php endif; ?>
        
        <?php if ($site_slogan): ?>
        <div id="site-slogan" class="img-sub"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><?php print $site_slogan; ?></a></div>
        <?php endif; ?>
        
        <?php if ($search_box): ?>
        <div id="search-box">
          <?php print $search_box; ?>
        </div> <!-- /#search-box -->
        <?php endif; ?>
        
        </div> <!-- /#supernav -->
        <?php endif; ?>
      
        <?php if ($primary_links): ?>

		<?php if (( $node->nid==29 
                ||  $node->nid==31
                ||  $node->nid==30 
                ||  $node->nid==32
                ||  $node->nid==232) && detect_ie7()): ?>
			<div id="primary-ie7" class="body-group">
			<div id="primary-inner-ie7">
		<?php else: ?>
			<div id="primary" class="body-group">
			<div id="primary-inner">
		<?php endif; ?>
		
          <?php print theme('links', $primary_links); ?>
          <!-- <?php print theme('nice_menu_primary_links'); ?> -->
           
          <?php print $navbar; ?> <!-- subu - this is of no use I think -->
		  <?php print drupal_get_form('styleforhire_basic_search_form'); ?>
         </div></div> <!-- /#primary-inner, /#primary -->
        <?php endif; ?>

        <?php if ($header): ?>
        <div id="header-blocks" class="region region-header">
          <?php print $header; ?>
        </div> <!-- /#header-blocks -->
        <?php endif; ?>

    </div></div> <!-- /#header-inner, /#header -->

    <div id="main">
	<?php if ( $node->nid==29 
                ||  $node->nid==31
                ||  $node->nid==30 
                ||  $node->nid==32
                ||  $node->nid==232): ?>
				<?php if (ae_detect_ie()): ?>
						<?php if ($node->nid==232): ?>
							<div id="main-inner-frontpages"  class="body-group">
						<?php else: ?>
							<div id="main-inner-frontpages">
						<?php endif; ?>
				<?php else: ?>
					<div id="main-inner" class="body-group<?php if ($secondary_links) { print ' with-nav'; } ?>">
				<?php endif; ?>
				<div id="content">
	<?php else: ?>
		<div id="main-inner" class="body-group<?php if ($secondary_links) { print ' with-nav'; } ?>">
		<div id="content"  class="clear-both">
    <?php endif; ?>

	  <div id="content-inner">
		<?php if ($node->nid==232): ?>
			<div id="press-container"><!--press container -->
		<?php endif; ?>
        <?php if ($mission): ?>
          <div id="mission"><?php print $mission; ?></div>
        <?php endif; ?>

        <?php if ($title && $node->type != team_member) { ?>
          <div id="page-title"><div id="page-title-inner">
            <h1 class="title"><?php print $title; ?></h1>
          </div></div>
        <?php } ?>
        
        <?php if ($content_top): ?>
          <div id="content-top" class="region region-content_top">
            <?php print $content_top; ?>
          </div> <!-- /#content-top -->
        <?php endif; ?>

        <?php if ($breadcrumb || $help || $messages || $tabs): ?>
          <div id="content-header">
            <?php if ($tabs): ?>
              <div class="tabs"><?php print $tabs; ?></div>
            <?php endif; ?>
            <?php print $breadcrumb; ?>
            <?php print $messages; ?>
            <?php print $help; ?>
          </div> <!-- /#content-header -->
        <?php endif; ?>

        <div id="content-area">
          <?php print $content; ?>
        </div>

        <?php if ($feed_icons): ?>
          <div class="feed-icons"><?php print $feed_icons; ?></div>
        <?php endif; ?>

        <?php if ($content_bottom): ?>
          <div id="content-bottom" class="region region-content_bottom">
            <?php print $content_bottom; ?>
          </div> <!-- /#content-bottom -->
        <?php endif; ?>

	<?php if ($node->nid==232): ?>
			</div> <!-- /# press-container-->
	<?php endif; ?>
      </div>
      </div> <!-- /#content-inner, /#content -->

        
         <div id="sidebar-left"><div id="sidebar-left-inner" class="region region-left">
    
              <a name="navigation" id="navigation"></a>
            <div id="secondary">
              <?php // print phptemplate_secondary_links(true); // true means "kill links for top-level secondary nav items" ?>
            </div> <!-- /#secondary -->


          <?php print $left; ?>
        </div></div> <!-- /#sidebar-left-inner, /#sidebar-left -->

      <?php if ($right): ?>
        <div id="sidebar-right"><div id="sidebar-right-inner" class="region region-right">
          <?php print $right; ?>
        </div></div> <!-- /#sidebar-right-inner, /#sidebar-right -->
      <?php endif; ?>

    </div></div> <!-- /#main-inner, /#main -->

  </div></div> <!-- /#page-inner, /#page -->

      <div id="footer"><div id="footer-inner" class="region region-footer body-group">

        <?php if ($footer_message): ?>
          <div id="footer-message"><?php print $footer_message; ?></div>
        <?php endif; ?>
        
        <?php print $footer; ?>

        <span class="copyright"><span>&#169;<?php echo date("Y"); ?> Style for Hire</span></span>

      </div></div> <!-- /#footer-inner, /#footer -->

  <?php if ($closure_region): ?>
    <div id="closure-blocks" class="region region-closure"><?php print $closure_region; ?></div>
  <?php endif; ?>

  <?php print $closure; ?>
</div>
</body>
</html>

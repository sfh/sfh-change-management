DEVELOPED BY:
------------------------------------------
TaRA Consulting Services
www.taracs.com

Sponsored by: Legend Films/Rifftrax
A special mention to Erik (torgosPizza) for his invaluable input and suggestions

Further development by Erik Peterson (torgosPizza)


SUMMARY: 
------------------------------------------
This module allows for an "Uberstore" to sell gift certificates.

FEATURES:
------------------------------------------
- Automatic assignment of gift certificates to recipients. No certificate code entry required.
- Configurable certificate issue email message
- Configurable certificate message on check-out pane
- Optional block for certificate-value credit message
- Manual gift certificate issue by a site administrator

INSTALLATION AND USAGE INSTRUCTIONS: 
------------------------------------------
1) Put the module folder "uc_gift_certificate" in sites/all/modules and enable the module ("Administer >> Site Building >> Modules"). 

**This module adds two product attribute types,"Recipient's Email Address" and "Message To Recipient". The "Recipient's Email Address" attribute is required for proper functioning. 

2) Create and save a product. eg. "$5 gift certificate"

3) REQUIRED: Edit the product to add the gift certificate attribute "Recipient's Email Address".  ("edit >> attributes")  
(optional) Add the "Message To Recipient" attribute which allows the purchaser to include a personal message when sending a certificate.

4) Configure primary module settings ("admin >> settings >> gift_certificates") 

a) Set the email that's sent to the recipient notifying them that somebody has bought them a gift certificate (for both new users and existing users). Several variables are available.

b) (optional) Change the default message that appears on the checkout pane when somebody has a gift certificate to redeem
c) (optional) Enable the side block that shows when somebody has gift certificates to redeem. The message is configurable.(eg."You have $x worth of gift certificates to be credited to your next purchase".)
d) (optional) For administrator use only, select Whether to use an autocomplete field or a pull-down menu, when manually sending a certificate

5) (optional) Enable the gift certificate code-entry page. ("admin >> site building >> menus" and enable "Gift Certificate Code"). 

This adds a menu item link that takes users to a page they can enter a certificate code. This is meant to be used in cases of cart migration, where users have been issued gift certificates and they have not redeemed them. (This module generates a random code that is stored when a gift certificate is created also) This code entry field may also be used in cases where a gift certificate recipient is unable to access their email.

NOTE: This has not been tested with the latest release of the cart (v8). As some of the carts API's are still in development, there is the possibility of some incompatibility with newer releases. The module does not write to any existing tables, so it is unlikely to negatively interfer with your current installation.


DESCRIPTION:
------------------------------------------
The way that things work is a little different than other gift certificate systems; it is not necesary for the recipient of a gift certificate to enter a code. When a user buys a gift certificate, they enter the email of the recipient. If there is already a user associated with this email, the certificate is issued to this user. Otherwise a new user is created and the certificate is issued to them. Then an email is sent informing the recipient that "somebody has purchased a gift certificate for you valued at x dollars, this amount will be credited to your next purchase" (The email is configurable from the settings page). This way it is not necessary for a user to enter a certificate code.

The module handles the case of multiple certificates (and the certificate value >= the order total) properly. There is also the functionality for an admin to create gift certificates for users as well. The recipient of the certificate can be chosen from an autocomplete field or a pulldown list (configurable from the settings page). Right now it has only been tested for a site that does not have anonymous purchases. As well it does not check the order status before issuing the gift certificate. So if, say, the site allows "pay by check" and the gift cert should not be issued until the check is cleared, this would cause problems. We will be adding in a setting to only issue certificates on certain specified statuses.




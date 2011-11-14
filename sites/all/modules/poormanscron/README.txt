$Id: README.txt,v 1.6.2.1 2009/09/30 00:00:53 davereid Exp $

Description
-----------

Poormanscron is a module which runs the Drupal cron operations without
needing the cron application.

This is a Drupal 6 backport of the simple Poormanscron feature that was added
to Drupal 7 (http://drupal.org/node/331611).


Installation
------------

1) Extract the package.
2) Copy/upload the Poormanscron folder to your sites/all/modules directory of
   your Drupal installation (e.g. sites/all/modules/poormanscron).
3) Enable the 'Automatically run cron' option in your site's information
   settings (Administer > Site configuration > Site information).


Configuration
-------------

Poormanscron can be configured at:
  Administer > Site configuration > Site information


Authors
-------

 * Moshe Weitzman <weitzman@tejasa.com> - original author
 * Uwe Hermann <uwe@hermann-uwe.de> - current maintainer
 * Dave Reid <http://drupal.org/user/53892> - co-maintainer

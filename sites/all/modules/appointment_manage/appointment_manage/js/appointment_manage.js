
jQuery(document).ready(function() {
  
  jQuery('div.rating_timelines a').click(function(){
    rate = jQuery(this).attr('href').replace('#', '');
    jQuery('#edit-rating-timelines').val(rate);
  });

  jQuery('div.rating_courtesy a').click(function(){
    rate = jQuery(this).attr('href').replace('#', '');
    jQuery('#edit-rating-courtesy').val(rate);
  });

  jQuery('div.rating_expertise a').click(function(){
    rate = jQuery(this).attr('href').replace('#', '');
    jQuery('#edit-rating-expertise').val(rate);
  });  
  
  jQuery('div.rating_attitude a').click(function(){
    rate = jQuery(this).attr('href').replace('#', '');
    jQuery('#edit-rating-attitude').val(rate);
  });  



  jQuery("#appointment-manage-rating-stylist-form").submit(function(){   
     showThanksBox();    
  }); 


  jQuery('.rating_form_close').click(function(){
    jQuery('.thanksbox').hide();
    window.close();
  });
  
  
  
});


  function showThanksBox() {
    jQuery('.thanksbox').css('background-color', '#ffffff');
    jQuery('.thanksbox').css('border', '2px solid #ff0000');
    jQuery('.thanksbox').css('position', 'absolute');
    jQuery('.thanksbox').css('top', '200px');
    jQuery('.thanksbox').css('left', '100px');
    jQuery('.thanksbox').css('width', '400px');
    jQuery('.thanksbox').css('height', '90px'); 
    jQuery('.thanksbox').css('padding', '10px');
    jQuery('.thanksbox').css('font-weight', 'bold');
    
    jQuery('.thanksbox').show(); 
  }

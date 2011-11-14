function getCert() {
  $('#certificate-message').remove();

  var code = $('#edit-panes-cert-code');
  $.get(Drupal.settings.base_path + "?q=cart/checkout/certificate/" + encodeURIComponent(code.val()), {}, function(certificate) {
    if (certificate.valid) {
      if (window.set_line_item) {
        set_line_item('gift_certificate', certificate.title, -certificate.amount, 6);
      }
    }
    else {
      code.parent().next().after('<div id="certificate-message">' + certificate.message + '</div>');
      if (window.remove_line_item) {
        remove_line_item('gift_certificate');
      }
    }

    if (window.getTax) {
      getTax();
    }
    else if (window.render_line_items) {
      render_line_items();
    }
  }, 'json');
}

/** Apply a Discount **/
function getCertDiscount() {
  $('#certificate-message').remove();

  var code = $('#edit-panes-cert-certificate-user');
  $.get(Drupal.settings.base_path + "?q=cart/checkout/get_certificate_discount/" + encodeURIComponent(code.val()), {}, function(certificate) {
    if (certificate.valid) {
      if (window.set_line_item) {
        set_line_item('gift_certificate', certificate.title, -certificate.amount, 6);
        $('#edit-panes-cert-certificate-user-value').val(-certificate.amount)
      }
    }
    else {
      code.parent().next().after('<div id="certificate-message">' + certificate.message + '</div>');
      if (window.remove_line_item) {
        remove_line_item('gift_certificate');
      }
    }

    if (window.getTax) {
      getTax();
    }
    else if (window.render_line_items) {
      render_line_items();
    }
  }, 'json');
}



function getCertificate(path) {
  var progress = new Drupal.progressBar('certificateProgress');
  progress.setProgress(-1, '');
  $('#certificate_details').empty().append(progress.element).removeClass('display-none');
  $("#certificate_details").addClass("solid-border").css("margin-top", "1em");

  var subtotal = $('#edit-panes-payment-current-total').val();

  // Make the post to get the details for the chosen payment method.
  $.post(path, { },
    function(details) {
      // details_tab : [0] : Discount validity | [1] : Discount sentense | [2] Discount id | [3] Discount code | [4] Formated discounted amount | [5] Discounted amount | [6] Weight
      var details_tab = details.split('|');

      if (details_tab[0] == false) {
        $('#certificate_details').empty().html(details_tab[1]);
      }

      // Otherwise display the returned details.
      else {
        // Disable the "Add Certificate" button.
        $('#uc-cart-checkout-form input#edit-panes-cert-certificate-get').attr('disabled', 'disabled');

        // If the amount of the certificate is less than the subtotal,
        // .. use up the certificates. (This will leave a difference).
        var amount = 0;

        if (subtotal > details_tab[4]) {
          amount = details_tab[4];
        }
        else {
          amount = subtotal;
        }

        $('#certificate_details').empty().append('<span class="message">'+ details_tab[1] + '</span><span class="label">' + details_tab[3] + '</span><span class="price"> = ' + details_tab[4] + '</span>');
        set_line_item("gift_certificate", 'Gift Certificates', -amount, 2);
      }
    }
  );
}


var uc_certificate_next_method = '';
var using_certificate = -1;

// Adds a click function to the total so we can check its updated values.
$(document).ready(
  function() {
    $('#edit-panes-payment-current-total').click(function() { uc_gift_certificate_check_total(this.value); });
  }
);

/**
 * Checks the current total and updates the available/selected payment methods
 * accordingly.
 */
function uc_gift_certificate_check_total(total) {
  total = parseFloat(total);

  if (total >= .01) {

  }
  else {
    // Disable the CC option and select the gift card option.
    if (using_certificate != 1) {
      // Hide the fallback payment method radio.
      //$("#payment-pane .form-radios input:radio").attr('disabled', 'disabled').parent().hide(0);

      // Show and select the gift card.
      $("input:radio[@value=zero_total]").removeAttr('disabled').attr('checked', 'checked').parent().show(0);

      // Refresh the payment details section.
      get_payment_details(Drupal.settings.ucURL.checkoutPaymentDetails + 'zero_total');

      using_certificate = 1;
    }
  }
}



(function($){
  
  $(document).ready(function() {

    var state = {
      initialSupport : 0,
      currentGiftType : null,
      userVal: 0,
      giver: {
        firstname: '',
        lastname: '',
        email: ''
      }
    };

    // Page initialisation
    var $pb = $('.progress .progress-bar');
    updateGauge(state.initialSupport);
    $("#firstname").focus();

    // events
    $('.btn-support').click(onSupportBtnClicked);
    $('.btn-continue').click(onContinueClicked);
    $("#firstname").on('blur', onFirstnameBlured);
    $("#lastname").on('blur', onLastnameBlured);
    $("#email").on('blur', onEmailBlured);
    $("#amount").on('blur', onAmountBlured);


    function onSupportBtnClicked(evt) {
      evt.preventDefault();
      $('.btn-support').removeClass('btn-selected');
      $(evt.target).addClass('btn-selected');
      $('#amount')
        .prop("disabled", false)
        .focus();
      state.currentGiftType = $(evt.target).data('type');
      var newSupport = recalculateSupport(state.userVal, state.initialSupport, state.currentGiftType);
      updateGauge(newSupport);
    }

    function onFirstnameBlured() {
      state.giver.firstname = $('#firstname').val();
      checkFirstname();
    }
    function onLastnameBlured() {
      state.giver.lastname = $('#lastname').val();
      checkLastname();
    }
    function onEmailBlured() {
      state.giver.email = $('#email').val();
      checkEmail();
    }
    function onAmountBlured() {
      state.giver.email = $('#amount').val();
      checkAmount();
    }

    function checkFirstname() {
      if (!state.giver.firstname.length) {
        $('#error')[0].innerText = 'Merci de saisir votre prénom';
        $('#error').removeClass('hide');
      } else {
        $('#error').addClass('hide');
      }
    }

    function checkLastname() {
      if (!state.giver.lastname.length) {
        $('#error')[0].innerText = 'Merci de saisir votre nom';
        $('#error').removeClass('hide');
      } else {
        $('#error').addClass('hide');
      }
    }

    function checkEmail() {
      if (!state.giver.email.length) {
        $('#error')[0].innerText = 'Merci de saisir votre email';
        $('#error').removeClass('hide');
      } else {
        $('#error').addClass('hide');
      }
    }

    function checkAmount() {
      if (!state.userVal) {
        $('#error')[0].innerText = 'Merci de saisir un montant';
        $('#error').removeClass('hide');
      } else {
        $('#error').addClass('hide');
      }
    }

    function onContinueClicked() {
      //check inputs
      checkFirstname();
      checkLastname();
      checkEmail();
      checkAmount();

      // si pas de message d'erreur
      if ($('#error').hasClass('hide'){
        $.ajax({
          type: "POST",
          url: 'api/register.php',
          data: state,
          success: success,
          dataType: "json"
        });

        function success(data, textStatus, jqXHR) {
          $('#omForm').addClass('hide');
          $('#thanks').removeClass('hide');
        }
      })
      // appel AJAX
      
      
    }

    function updateGauge(amount) {
      console.info('updating gauge to :',amount);
      $pb.attr('data-transitiongoal', amount)
        .progressbar({display_text: 'center'});
    }


    $('#amount').keyup(function(evt){
      var iptVal = $(evt.target).val();
      state.userVal = iptVal;
      var newSupport = recalculateSupport(state.userVal, state.initialSupport, state.currentGiftType);
      updateGauge(newSupport);
    });

    function checkIfNumber(value) {
      return !$.isNumeric(value) && value.length > 0;
    }

    /*
    @param iptval: user input value
    @param initsup: initial support
    @param gifttype: mensual or ponctual gift
    returns the new support value
    */
    function recalculateSupport(iptval, initsup, gifttype) {
      var computedval = (gifttype === 'monthly' ? iptval*13 : iptval*1);
      var finalVal = initsup + computedval;
      return finalVal;
    }

  });


})(jQuery);
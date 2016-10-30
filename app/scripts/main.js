(function($){
  $.material.init();

  $(document).ready(function() {

    var state = {
      initialSupport : 0,
      currentGiftType : null,
      userVal: 0
    };

    // Page initialisation
    var $pb = $('.progress .progress-bar');
    $pb.attr('data-transitiongoal', state.initialSupport).progressbar({display_text: 'fill', use_percentage: true});
    $("#firstname").focus();

    // events
    $('.btn-support').click(onSupportBtnClicked);


    function onSupportBtnClicked(evt) {
      evt.preventDefault();
      $(evt.target).addClass('btn-default');
      $('#montant')
        .prop("disabled", false)
        .focus();
      state.currentGiftType = $(evt.target).data('type');
      var newSupport = recalculateSupport(state.userVal, state.initialSupport, state.currentGiftType);
      updateGauge(newSupport);
    }

    function updateGauge(amount) {
      console.info('updating gauge to :',amount);
      $pb.attr('data-transitiongoal', amount)
        .progressbar({display_text: 'fill', use_percentage: true});
    }

  	
    

    $('#montant').keyup(function(evt){
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
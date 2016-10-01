(function($){
	$.fn.CRBoxes = function(){
		return this.each(function(){
			if ($(this).hasClass('dn')) {
				return;
			}

			var $input = $(this);

			$input.parent().prepend('<span></span>').attr('for',$input.attr('id'));

			var $link = $(this).parent().find('span');

			changeStatus();

			$input.change(function(){
				changeStatus();
			})

			if ($.browser.msie) {
				$input.click(function(){
					changeStatus();
				})
			}

			function changeStatus(){
				if ($input.attr('checked')) {
					if ($input.attr('type') == 'radio') {
						var name = $input.attr('name');
						$('input[name=' + name + ']').each(function(){
							$(this).parent().find('span').removeClass('checked');
						})
					}
					$link.addClass('checked');
				} else {
					$link.removeClass('checked');
				}
			};

		});
	}
})(jQuery);
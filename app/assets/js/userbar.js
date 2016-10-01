$(document).ready(function(){
	


	
	

		
	$("#top_settings_but").click(function(){
		if ($(".lastBlockPanel div").is(".elementPanelList")) { 
			var hidden=('.firstBlockPanel')
		}
		else { 
			var hidden=('#panel')
		}
		hidePan(hidden, this);
		
	})
	
	function hidePan (hidden, mythis){
		if ($("#top_settings_but").hasClass("open") == true) { 
			$(mythis).find(".arr").removeClass("up").addClass("down")
			$(hidden).slideUp(250);
			$("#top_settings_but").removeClass("open").addClass("close")
		return false;
		}
		if ($("#top_settings_but").hasClass("close") == true) { 
			$(mythis).find(".arr").removeClass("down").addClass("up")
			$("#panel").slideDown(250);
			$(hidden).slideDown(250);
			$("#top_settings_but").removeClass("close").addClass("open")
		return false;
		}
	}
	
	$(".firstBlockPanel input[type=radio]").click(function(){
		
		$(".firstBlockPanel input[type=radio]:not(:checked)").parent().parent().removeClass("active_pos")
		$(".firstBlockPanel input[type=radio]:checked").parent().parent().addClass("active_pos")
		})
		
	$(".firstBlockPanel input[type=checkbox]").click(function(){
		$(this).parent().parent().toggleClass("active_pos")
		})
	
	$(".firstBlockPanel button[type=reset]").click(function(){	
		$(".firstBlockPanel .active_pos").removeClass("active_pos");
	})
	
	$(".lastBlockPanel .clear_filters .cross").click(function(){
			$(".elementPanelList").remove();
			$(".topSettingsNavtwo").css("display","none");
			$(".lastBlockPanel").slideUp(250);
			$(".firstBlockPanel button[type=reset]").click();
			if ($("#top_settings_but").hasClass("close") == true) { 
				$("#panel").slideUp(250, function(){$(".firstBlockPanel").css("display","block")});	
			}
	})
	
	$(".elementPanelList .smallCross").click(function(){
		$(this).parent().remove();
		if (!$(".lastBlockPanel div").is(".elementPanelList")) { 
			$(".lastBlockPanel .clear_filters .cross").click()
		}
	})
})
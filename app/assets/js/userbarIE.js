$(document).ready(function(){
	

	$(".radiobut").click(function(){
		$(this).find("input[type=radio]").attr("checked", "checked");
		$(".firstBlockPanel input[type=radio]:not(:checked)").parent().parent().removeClass("active_pos")
		$(".firstBlockPanel input[type=radio]:checked").parent().parent().addClass("active_pos")
	})
	

	
	$(".checkboxes").toggle(
		function(){
			$(this).find("input").attr("checked", "checked");
			$(this).addClass("active_pos")
		},
		function(){
			$(this).find("input").attr('checked',false);
			$(this).removeClass("active_pos")
		}
	 );
	
})
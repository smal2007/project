$(document).ready(function(){
	$("#song_name").click(function(){
		$("#playlist_wrap").slideToggle(250);
		})
	
	$("#playlist_settings .chgplaylist").click(function(){
		$("#user_playlists").slideToggle(250);
		$(this).toggleClass("open");
		})
		
		
	$("#volume_pic").click(function(){
		if ($('#slider_hidinp').attr('value') != 0) {
		volume_val = $('#slider_hidinp').val()
		$('#slider_hidinp').attr('value', 0);
		$('.volume_set .slider a').css("left","0px");
		$('.volume_set .slider div').css("width","0px");
		$(this).addClass("nosound");
		}
		else {
		$('#slider_hidinp').attr('value', volume_val);
		$('.volume_set .slider a').css("left", + volume_val +"%");
		$('.volume_set .slider div').css("width", + volume_val +"%");
		$(this).removeClass("nosound");
		}
		})
		
})
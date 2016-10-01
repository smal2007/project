$(document).ready(function(){
    $('.playlist_wrap tr:odd').addClass('odd_gray_d');

   $('.playlist_wrap table tr').hover(function(){
        $('.l-actions', this).fadeIn(100);
    }, function(){
        $('.l-actions', this).fadeOut(100);
    })

    $('.playlist_wrap table tr').hover(function(){
        $('.playlist_wrap table td a.play_song', this).addClass('st-hr');
    }, function(){
        $('.playlist_wrap table td a.play_song', this).removeClass('st-hr');
    })

	// Return a helper with preserved width of cells
    var fixHelper = function(e, ui) {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    };
 
    $('.playlist_wrap table tbody').sortable({
        helper: fixHelper,
        axis:'y',
        containment: 'parent',
        handle: ".drop_bord",
        stop: function(event, ui) {
            $('tr', this).each(function(){
                $(this).removeClass('odd_gray_d');
                if ($(this).index() % 2 == 0) {
                    $(this).addClass('odd_gray_d');
                }
            })
        }
        
    }).disableSelection()

    $('.title_playlist .edit').click(function(){
        $(this).parent().parent().find('.edit_name_playlist').show().find('.fld').trigger('focus');
        $(this).parent().hide();
    })

    $('.title_playlist .fld').blur(function(){
        var namePlaylist = $(this).val();
        if (namePlaylist == '' || typeof namePlaylist == 'undefined') {
            $(this).closest('.title_playlist').find('.title_playlist_name').show();
            $(this).closest('.edit_name_playlist').hide();
        } else {
            $(this).closest('.title_playlist').find('.title_playlist_name').show().find('.playlist_name').html(namePlaylist);
            $(this).closest('.edit_name_playlist').hide();
        }
    })

})


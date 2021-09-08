$( document ).ready(function() {
    console.log( "ready!" );
    $(".btn-volumeOff").hide();

    $(".btn-volumeOff").click(function(){
        $(".btn-volumeOff").fadeOut(function(){
            $(".btn-volumeOn").fadeIn();
        });
    })

    $(".btn-volumeOn").click(function(){
        $(".btn-volumeOn").fadeOut(function(){
            $(".btn-volumeOff").fadeIn();
        });
    })
});
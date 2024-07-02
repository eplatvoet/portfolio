$(document).ready(function(){
    // MODAL FUNCTIONALITY
    $('.portfolio-thumbnails').click(function(){
        var imgSrc = $(this).attr('src');
        $('.modal-img').attr('src', imgSrc);
        
        var imgAlt = $(this).attr('alt');
        $('.modal-caption').html(imgAlt);

        var repoLink = $(this).attr('data-repo');
        $('#repo-link').attr('href', repoLink);

        var deployedLink = $(this).attr('data-deployed');
        console.log(deployedLink)
        if(deployedLink === ""){
            $('#dep-link').css('display', "none");
        } else{
            $('#dep-link').css('display', "block");
            $('#dep-link').attr('href', deployedLink);
        }

        $('#project-modal').css('display', 'block');
    });

    $('.close').click(function(){
        $('#project-modal').css('display', 'none');
    });

    $(window).click(function(event){
        if ($(event.target).is('#project-modal')) {
            $('#project-modal').css('display', 'none');
        }
    });

    // 
});
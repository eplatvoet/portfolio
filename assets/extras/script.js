$(document).ready(function(){
    // PORTFOLIO MODAL FUNCTIONALITY
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

        $('#project-modal').css('display', 'flex');
    });

    $('.close').click(function(){
        if($('#project-modal').css('display') === "flex"){
            $('#project-modal').css('display', 'none');
        }
        if($('#certificates-modal').css('display') === "flex"){
            $('#certificates-modal').css('display', 'none');
        }
    });

    $(window).click(function(event){
        if ($(event.target).is('#project-modal')) {
            $('#project-modal').css('display', 'none');
        }
        if ($(event.target).is('#certificates-modal')) {
            $('#certificates-modal').css('display', 'none');
        }
    });

    // CERTIFICATES MODAL FUNCTIONALITY
    $('.certificates-modal-trigger').click(function(){
        $('#certificates-modal').css('display', 'flex')
        function updateCarousel(direction) {
            var $activeItem = $('.carousel-item.active');
            var $newActiveItem;

            if (direction === 'left') {
                $newActiveItem = $activeItem.prev('.carousel-item');
                if ($newActiveItem.length === 0) {
                    $newActiveItem = $('.carousel-item').last();
                }
            } else {
                $newActiveItem = $activeItem.next('.carousel-item');
                if ($newActiveItem.length === 0) {
                    $newActiveItem = $('.carousel-item').first();
                }
            }

            $activeItem.removeClass('active');
            $newActiveItem.addClass('active');
        }

        $('.c-trig.left-trigger').click(function() {
            updateCarousel('left');
        });

        $('.c-trig.right-trigger').click(function() {
            updateCarousel('right');
        });
        
    })
});
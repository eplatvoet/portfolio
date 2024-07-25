$(document).ready(function(){
    
    $('nav a[data-section-id]').on('click', function(event) {
        event.preventDefault();

        var sectionId = $(this).data('section-id');
        var $target = $('#' + sectionId);

        $('html, body').animate({
            scrollTop: $target.offset().top - 50
        }, 1250, function() {
            // Temporarily store the current scroll position
            var scrollTop = $target.offset().top - 50;

            // Update the hash in the URL without affecting the scroll position
            window.location.hash = sectionId;

            // Restore the scroll position to prevent jump
            $(window).scrollTop(scrollTop);
        });
    });
    
    // Intersection Observer API to handle blur effect
    if(window.innerWidth > 767){

        var sections = document.querySelectorAll('.sections');
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.25 // Adjust this value as needed
        };
    
        var observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('section-blurred');
                } else {
                    entry.target.classList.add('section-blurred');
                }
            });
        }, observerOptions);
    
        sections.forEach(function(section) {
            section.classList.add('section-blurred'); // Add blur effect initially
            observer.observe(section); // Observe each section
        });
    } else{
        var sections = document.querySelectorAll('.sections');
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Adjust this value as needed
        };
    
        var observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('section-blurred');
                } else {
                    entry.target.classList.add('section-blurred');
                }
            });
        }, observerOptions);
    
        sections.forEach(function(section) {
            section.classList.add('section-blurred'); // Add blur effect initially
            observer.observe(section); // Observe each section
        });
    }


    // PORTFOLIO MODAL FUNCTIONALITY
    // $('.portfolio-thumbnails').click(function(){
    //     var imgSrc = $(this).attr('src');
    //     $('.modal-img').attr('src', imgSrc);
        
    //     var imgAlt = $(this).attr('alt');
    //     $('.modal-caption').html(imgAlt);

    //     var repoLink = $(this).attr('data-repo');
    //     $('#repo-link').attr('href', repoLink);

    //     var deployedLink = $(this).attr('data-deployed');
    //     console.log(deployedLink)
    //     if(deployedLink === ""){
    //         $('#dep-link').css('display', "none");
    //     } else{
    //         $('#dep-link').css('display', "block");
    //         $('#dep-link').attr('href', deployedLink);
    //     }

    //     $('#project-modal').css('display', 'flex');
    // });
    var currentIndex;

    function updateModalContent(index) {
        var img = $('.portfolio-thumbnails[data-number="' + index + '"]');
        var imgSrc = img.attr('src');
        var imgAlt = img.attr('alt');
        var repoLink = img.attr('data-repo');
        var deployedLink = img.attr('data-deployed');

        $('.modal-img').attr('src', imgSrc);
        $('.modal-caption').html(imgAlt);
        $('#repo-link').attr('href', repoLink);

        if (deployedLink === "") {
            $('#dep-link').css('display', "none");
        } else {
            $('#dep-link').css('display', "block");
            $('#dep-link').attr('href', deployedLink);
        }
    }

    $('.portfolio-thumbnails').click(function () {
        currentIndex = $(this).attr('data-number');
        updateModalContent(currentIndex);
        $('#project-modal').css('display', 'flex');
    });

    $('.left-trigger').click(function () {
        currentIndex--;
        if (currentIndex < 1) {
            currentIndex = $('.portfolio-thumbnails').length;
        }
        updateModalContent(currentIndex);
    });

    $('.right-trigger').click(function () {
        currentIndex++;
        if (currentIndex > $('.portfolio-thumbnails').length) {
            currentIndex = 1;
        }
        updateModalContent(currentIndex);
    });

    // CLOSE MODAL FUNCTIONALITY
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
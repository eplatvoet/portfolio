$(document).ready(function(){
    
    $('nav a[data-section-id]').on('click', function(event) {
        event.preventDefault();

        var sectionId = $(this).data('section-id');
        var $target = $('#' + sectionId);

        $('html, body').animate({
            scrollTop: $target.offset().top - 25
        }, 1250, function() {
            // Temporarily store the current scroll position
            var scrollTop = $target.offset().top - 50;

            // Update the hash in the URL without affecting the scroll position
            window.location.hash = sectionId;

            // Restore the scroll position to prevent jump
            $(window).scrollTop(scrollTop);
        });
    });

    // add functionality that depending on what section is active, the nav bar will be highlighted
    let scrollTimeout;
    $(window).scroll(function(){
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            var scrollPosition = $(window).scrollTop() + 50; // Add offset for nav height
            var sections = $('.sections');
            var currentSection = null;
            
            sections.each(function(){
                var sectionTop = $(this).offset().top;
                var sectionBottom = sectionTop + $(this).outerHeight();
                
                if(scrollPosition >= sectionTop && scrollPosition < sectionBottom){
                    currentSection = $(this).attr('id');
                }
            });
            
            // Remove active class from all nav items first
            $('nav a[data-section-id]').removeClass('active-nav');
            
            // Add active class to current section's nav item
            if(currentSection) {
                $('nav a[data-section-id="' + currentSection + '"]').addClass('active-nav');
            }
        });
    });
    // Reveal sections as they scroll into view with alternating left/right motion
    var sections = document.querySelectorAll('.sections');
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    sections.forEach(function(section, index) {
        section.classList.add('section-reveal');
        section.setAttribute('data-reveal-direction', index % 2 === 0 ? 'left' : 'right');
        revealObserver.observe(section);
    });

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
    var certIndex = 0;
    var certsLoaded = false;

    async function loadCertificates() {
        if (certsLoaded) return;

        var wrap = document.querySelector('#certificates-modal .carousel-item-wrap');

        try {
            var res = await fetch('./assets/data/certificates.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            var slides = await res.json();

            wrap.innerHTML = '';
            slides.forEach(function(slide, i) {
                var item = document.createElement('div');
                item.className = 'carousel-item';
                if (slide.className) item.classList.add(slide.className);
                if (i === 0) item.classList.add('active');

                slide.images.forEach(function(image) {
                    var img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    if (image.fullWidth) img.className = 'w-100';
                    item.appendChild(img);
                });

                wrap.appendChild(item);
            });

            certIndex = 0;
            certsLoaded = true;
        } catch (err) {
            console.error('Could not load certificates:', err);
        }
    }

    function showCertificate(index) {
        var $items = $('#certificates-modal .carousel-item');
        if (!$items.length) return;

        certIndex = (index + $items.length) % $items.length; // wraps both directions
        $items.removeClass('active').eq(certIndex).addClass('active');
    }

    $('.certificates-modal-trigger').click(async function(){
        await loadCertificates();
        $('#certificates-modal').css('display', 'flex');
    });

    $('#certificates-modal .left-trigger').click(function () {
        showCertificate(certIndex - 1);
    });

    $('#certificates-modal .right-trigger').click(function () {
        showCertificate(certIndex + 1);
    });
});
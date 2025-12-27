$(document).ready(function() {

    // Modal logic
    $('.view-details').on('click', function() {
        var project = $(this).data('project');
        $('#modal-' + project).fadeIn();
    });

    $('.modal .close').on('click', function() {
        $(this).closest('.modal').fadeOut();
    });

    $(window).on('click', function(event) {
        if ($(event.target).is('.modal')) {
            $(event.target).fadeOut();
        }
    });

    // Fade-in animations on scroll
    const faders = $('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                $(entry.target).css({
                    'opacity': 1,
                    'transform': 'translateY(0)'
                });
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.each(function() {
        appearOnScroll.observe(this);
    });

    // Lightbox logic
    $(document).on('click', '.lightbox-trigger', function(event) {
        event.preventDefault();
        var imageUrl = $(this).attr('href');
        var altText = $(this).find('img').attr('alt');

        // Create lightbox HTML
        var lightboxHtml = `
            <div class="lightbox-overlay">
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-content">
                    <img src="${imageUrl}" alt="${altText}" />
                </div>
            </div>
        `;
        $('body').append(lightboxHtml);
        $('.lightbox-overlay').css('display', 'flex').hide().fadeIn();
    });

    // Close lightbox when close button is clicked
    $(document).on('click', '.lightbox-close', function() {
        $(this).closest('.lightbox-overlay').fadeOut(function() {
            $(this).remove();
        });
    });

    // Close lightbox when clicking outside the image
    $(document).on('click', '.lightbox-overlay', function(event) {
        if ($(event.target).is('.lightbox-overlay')) {
            $(this).fadeOut(function() {
                $(this).remove();
            });
        }
    });

});

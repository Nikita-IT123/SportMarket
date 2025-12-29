// plugin.js
(function($) {
    $.fn.asideZoom = function(options) {
        const settings = $.extend({
            duration: 600,
            fontSize: '1.8em',
            position: 'center',
            overlayOpacity: 0.7,
            overlayColor: '#000'
        }, options);
        
        if ($('#aside-zoom-overlay').length === 0) {
            $('<div id="aside-zoom-overlay"></div>')
                .css({
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: settings.overlayColor,
                    opacity: 0,
                    zIndex: 9998,
                    display: 'none',
                    cursor: 'pointer'
                })
                .appendTo('body');
        }
        
        const $overlay = $('#aside-zoom-overlay');
        
        $overlay.on('click', function() {
            $('.aside-zoomed').each(function() {
                const $el = $(this);
                const originalState = $el.data('original-state');
                
                $overlay.animate({ opacity: 0 }, settings.duration / 2, function() {
                    $(this).hide();
                });
                
                const scrollTop = $(window).scrollTop();
                const scrollLeft = $(window).scrollLeft();
                
                $el.animate({
                    top: originalState.offset.top - scrollTop,
                    left: originalState.offset.left - scrollLeft,
                    width: originalState.width,
                    fontSize: originalState.fontSize
                }, settings.duration, function() {
                    $el.css({
                        position: originalState.position,
                        margin: originalState.margin
                    }).removeClass('aside-zoomed');
                });
            });
        });
        
        return this.each(function() {
            const $element = $(this);
            
            $element.css('cursor', 'pointer');
            
            $element.on('click', function(e) {
                e.stopPropagation();
                
                if ($element.hasClass('aside-zoomed')) {
                    const originalState = $element.data('original-state');
                    
                    $overlay.animate({ opacity: 0 }, settings.duration / 2, function() {
                        $(this).hide();
                    });
                    
                    const scrollTop = $(window).scrollTop();
                    const scrollLeft = $(window).scrollLeft();
                    
                    $element.animate({
                        top: originalState.offset.top - scrollTop,
                        left: originalState.offset.left - scrollLeft,
                        width: originalState.width,
                        fontSize: originalState.fontSize
                    }, settings.duration, function() {
                        $element.css({
                            position: originalState.position,
                            margin: originalState.margin
                        }).removeClass('aside-zoomed');
                    });
                } else {
                    $('.aside-zoomed').each(function() {
                        const $el = $(this);
                        const originalState = $el.data('original-state');
                        
                        $overlay.animate({ opacity: 0 }, settings.duration / 2, function() {
                            $(this).hide();
                        });
                        
                        const scrollTop = $(window).scrollTop();
                        const scrollLeft = $(window).scrollLeft();
                        
                        $el.animate({
                            top: originalState.offset.top - scrollTop,
                            left: originalState.offset.left - scrollLeft,
                            width: originalState.width,
                            fontSize: originalState.fontSize
                        }, settings.duration, function() {
                            $el.css({
                                position: originalState.position,
                                margin: originalState.margin
                            }).removeClass('aside-zoomed');
                        });
                    });
                    
                    const originalState = {
                        position: $element.css('position'),
                        top: $element.css('top'),
                        left: $element.css('left'),
                        margin: $element.css('margin'),
                        width: $element.width(),
                        fontSize: $element.css('font-size'),
                        offset: $element.offset()
                    };
                    
                    $element.data('original-state', originalState);
                    
                    $overlay.show().animate({ opacity: settings.overlayOpacity }, settings.duration / 2);
                    
                    const windowWidth = $(window).width();
                    const windowHeight = $(window).height();
                    
                    const $clone = $element.clone();
                    $clone.css({
                        fontSize: settings.fontSize,
                        position: 'absolute',
                        visibility: 'hidden'
                    });
                    $clone.appendTo('body');
                    const newOuterWidth = $clone.outerWidth();
                    const newOuterHeight = $clone.outerHeight();
                    $clone.remove();
                    
                    let targetTop, targetLeft;
                    
                    if (settings.position === 'center') {
                        targetTop = (windowHeight / 2) - (newOuterHeight / 2);
                        targetLeft = (windowWidth / 2) - (newOuterWidth / 2);
                    } else {
                        targetTop = 100;
                        targetLeft = (windowWidth / 2) - (newOuterWidth / 2);
                    }
                    
                    targetTop = Math.max(50, targetTop);
                    targetLeft = Math.max(20, Math.min(targetLeft, windowWidth - newOuterWidth - 20));
                    
                    const scrollTop = $(window).scrollTop();
                    const scrollLeft = $(window).scrollLeft();
                    
                    $element.css({
                        position: 'fixed',
                        margin: 0,
                        top: originalState.offset.top - scrollTop,
                        left: originalState.offset.left - scrollLeft,
                        width: originalState.width,
                        zIndex: 9999
                    });
                    
                    $element.animate({
                        top: targetTop,
                        left: targetLeft,
                        fontSize: settings.fontSize
                    }, settings.duration, function() {
                        $element.addClass('aside-zoomed');
                    });
                }
            });
        });
    };
})(jQuery);
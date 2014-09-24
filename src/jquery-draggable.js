(function() {
        var defaultOption = {
                handler: null,
                axis: false,
                ayis: false,
                container: null,
                onDrag: function() {},
                beforeDrag: function() {},
                afterDrag: function() {}
        };

        $.fn.draggable = function(option) {
                return this.each(function() {
                        var $this = $(this),
                            _option = $.extend({}, defaultOption, option || {}),
                            _h = $this.outerHeight(),
                            _w = $this.outerWidth(),
                            _handler = option.handler ? $(_option.handler) : $this;

                        if (_option.axis) {
                                var cursorStyle = 'e-resize';
                        } else if (_option.ayis) {
                                var cursorStyle = 'n-resize';
                        } else {
                                var cursorStyle = 'move';
                        }
                        _handler.css('cursor', cursorStyle);


                        _handler.on('mousedown', function(e) {
                                e.preventDefault();
                                var _y = $this.offset().top + _h - e.pageY,
                                        _x = $this.offset().left + _w - e.pageX,
                                        _oLeft = $this.offset().left,
                                        _oTop = $this.offset().top;

                                $(document).on('mousemove', function(e) {
                                        e.preventDefault();
                                        if (!_option.axis && !_option.ayis) {
                                                var _left = e.pageX + _x - _w,
                                                        _top = e.pageY + _y - _h;
                                        } else {
                                                if (_option.axis) {
                                                        var _left = e.pageX + _x - _w,
                                                                _top = _oTop;
                                                } else if (_option.ayis) {
                                                        var _left = _oLeft,
                                                                _top = e.pageY + _y - _h;
                                                }

                                        }

                                        if (!!_option.container) {
                                                var $_c = $(_option.container),
                                                        _c_o_h = $_c.outerHeight(),
                                                        _c_o_w = $_c.outerWidth(),
                                                        _c_l = $_c.offset().left,
                                                        _c_t = $_c.offset().top;


                                                if (_left < _c_l) {
                                                        _left = _c_l;
                                                } else if (_left > (_c_l + _c_o_w - _w)) {
                                                        _left = _c_l + _c_o_w - _w;
                                                }

                                                if (_top < _c_t) {
                                                        _top = _c_t;
                                                } else if (_top > (_c_t + _c_o_h - _h)) {
                                                        _top = _c_t + _c_o_h - _h;
                                                }
                                        }

                                        $this.offset({
                                                left: _left,
                                                top: _top
                                        });

                                        _option.onDrag.call(null);
                                });

                                $(document).on('mouseup', function() {

                                        $(document).off('mousemove mouseup');

                                        _option.afterDrag.call(null);

                                });

                                _option.beforeDrag.call(null);
                        });
                });
        };
})(jQuery);
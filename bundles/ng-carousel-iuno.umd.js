(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('rxjs/Subscription'), require('rxjs/add/operator/throttleTime'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define('ng-carousel-iuno', ['exports', '@angular/core', 'rxjs/Subject', 'rxjs/Subscription', 'rxjs/add/operator/throttleTime', '@angular/common'], factory) :
	(factory((global['ng-carousel-iuno'] = {}),global.ng.core,global.Rx,global.Rx,global.Rx.Observable.prototype,global.ng.common));
}(this, (function (exports,core,Subject,Subscription,throttleTime,common) { 'use strict';

var ZERO = 0.000000000001;
var SwiperDirective = /** @class */ (function () {
    function SwiperDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.isDown = false;
        this.initialPos = ZERO;
        this.lastPos = ZERO;
        this.swipeDistance = ZERO;
        this.firstSwipeDate = Date.now();
        this.onSwipeRight = new core.EventEmitter();
        this.onSwipeLeft = new core.EventEmitter();
        this.onSwipeStart = new core.EventEmitter();
        this.onSwipeEnd = new core.EventEmitter();
        this.swipeLeft = new core.EventEmitter();
        this.swipeRight = new core.EventEmitter();
    }
    SwiperDirective.prototype.ngOnInit = function () {
        this.onSwipeEnd.subscribe(function () {
        });
        this.swipeLeft.subscribe(function () {
            SwiperDirective.canISwipe = false;
            setTimeout(function () {
                SwiperDirective.canISwipe = true;
            }, 350);
        });
        this.swipeRight.subscribe(function () {
            SwiperDirective.canISwipe = false;
            setTimeout(function () {
                SwiperDirective.canISwipe = true;
            }, 350);
        });
    };
    SwiperDirective.prototype.onMouseDown = function (event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        this.firstSwipeDate = Date.now();
        this.isDown = true;
        this.initialPos = event.clientX;
        this.swipeDistance = 0;
        this.onSwipeStart.emit();
    };
    SwiperDirective.prototype.onMouseUp = function (__) {
        if (!this.isDown) {
            return;
        }
        this.initialPos = this.lastPos = ZERO;
        this.isDown = false;
        if (this.swipeDistance > 100) {
            this.swipeLeft.emit();
        }
        else if (this.swipeDistance < -100) {
            this.swipeRight.emit();
        }
        else {
            this.onSwipeEnd.emit();
        }
        this.swipeDistance = ZERO;
    };
    SwiperDirective.prototype.onMouseMove = function (event) {
        if (this.isDown) {
            var swipeFrameDistance = event.clientX - this.initialPos - this.lastPos;
            this.swipeDistance += swipeFrameDistance;
            this.lastPos = event.clientX - this.initialPos;
            if (swipeFrameDistance > 0) {
                this.onSwipeLeft.emit(swipeFrameDistance);
            }
            else {
                this.onSwipeRight.emit(swipeFrameDistance);
            }
        }
    };
    SwiperDirective.prototype.onTouchMove = function (event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        var touch = event.touches[0] || event.changedTouches[0];
        var swipeFrameDistance = touch.clientX - this.initialPos - this.lastPos;
        swipeFrameDistance = swipeFrameDistance < 30 ? swipeFrameDistance : 30;
        this.swipeDistance += swipeFrameDistance;
        this.lastPos = touch.clientX - this.initialPos;
        if (swipeFrameDistance > 0) {
            this.onSwipeLeft.emit(swipeFrameDistance);
        }
        else {
            this.onSwipeRight.emit(swipeFrameDistance);
        }
    };
    SwiperDirective.prototype.onTouchStart = function (event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        var touch = event.touches[0] || event.changedTouches[0];
        this.firstSwipeDate = Date.now();
        this.initialPos = touch.clientX;
        this.swipeDistance = ZERO;
        this.onSwipeStart.emit();
    };
    SwiperDirective.prototype.onTouchEnd = function (__) {
        this.initialPos = this.lastPos = ZERO;
        if (this.swipeDistance > 100) {
            this.swipeLeft.emit();
        }
        else if (this.swipeDistance < -100) {
            this.swipeRight.emit();
        }
        else {
            this.onSwipeEnd.emit();
        }
        this.swipeDistance = ZERO;
    };
    return SwiperDirective;
}());
SwiperDirective.canISwipe = true;
SwiperDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[swiper]',
                exportAs: 'swiper'
            },] },
];
SwiperDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
SwiperDirective.propDecorators = {
    "onSwipeRight": [{ type: core.Output },],
    "onSwipeLeft": [{ type: core.Output },],
    "onSwipeStart": [{ type: core.Output },],
    "onSwipeEnd": [{ type: core.Output },],
    "swipeLeft": [{ type: core.Output },],
    "swipeRight": [{ type: core.Output },],
    "onMouseDown": [{ type: core.HostListener, args: ['mousedown', ['$event'],] },],
    "onMouseUp": [{ type: core.HostListener, args: ['document:mouseup', ['$event'],] },],
    "onMouseMove": [{ type: core.HostListener, args: ['mousemove', ['$event'],] },],
    "onTouchMove": [{ type: core.HostListener, args: ['touchmove', ['$event'],] },],
    "onTouchStart": [{ type: core.HostListener, args: ['touchstart', ['$event'],] },],
    "onTouchEnd": [{ type: core.HostListener, args: ['touchend', ['$event'],] },],
};
var UILazyloadDirective = /** @class */ (function () {
    function UILazyloadDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    UILazyloadDirective.prototype.load = function () {
        var img = this.el.nativeElement;
        if (img.src) {
            return;
        }
        img.src = this.uiLazyLoad;
    };
    return UILazyloadDirective;
}());
UILazyloadDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[ui-lazy-load]' },] },
];
UILazyloadDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
UILazyloadDirective.propDecorators = {
    "uiLazyLoad": [{ type: core.Input, args: ['ui-lazy-load',] },],
};
var UICarouselItemComponent = /** @class */ (function () {
    function UICarouselItemComponent(renderer, ref) {
        this.renderer = renderer;
        this.ref = ref;
        this.currentPosition = 0;
        this.position = 0;
    }
    UICarouselItemComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(UICarouselItemComponent.prototype, "transition", {
        get: function () {
            return UICarouselItemComponent.transitionStyle;
        },
        set: function (transitionStyle) {
            UICarouselItemComponent.transitionStyle = transitionStyle;
        },
        enumerable: true,
        configurable: true
    });
    UICarouselItemComponent.prototype.moveTo = function (position) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-o-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transform', 'translate3d(' + position + 'px, 0px, 0px)');
    };
    UICarouselItemComponent.prototype.moveBy = function (distance) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-o-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
    };
    UICarouselItemComponent.prototype.setzIndex = function (zIndex) {
        this.renderer.setStyle(this.el.nativeElement, 'z-index', zIndex);
    };
    UICarouselItemComponent.prototype.disableTransition = function () {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-o-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transition', 'none');
    };
    UICarouselItemComponent.prototype.enableTransition = function () {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transition', 'transform');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transition', 'transform');
        this.renderer.setStyle(this.el.nativeElement, '-o-transition', 'transform');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transition', 'transform');
        this.renderer.setStyle(this.el.nativeElement, 'transition-duration', this.speed + 'ms');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transition-duration', this.speed + 'ms');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transition-duration', this.speed + 'ms');
        this.renderer.setStyle(this.el.nativeElement, '-o-transition-duration', this.speed + 'ms');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transition-duration', this.speed + 'ms');
    };
    UICarouselItemComponent.prototype.fadeOut = function (duration) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.renderer.setStyle(_this.el.nativeElement, 'opacity', '0');
            setTimeout(function () {
                _this.renderer.setStyle(_this.el.nativeElement, 'opacity', '1');
                resolve();
            }, duration);
        });
    };
    UICarouselItemComponent.prototype.fadeIn = function (duration) {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        setTimeout(function () {
            _this.renderer.setStyle(_this.el.nativeElement, 'transition', 'opacity ' + duration + 'ms');
            _this.renderer.setStyle(_this.el.nativeElement, 'opacity', '1');
        }, 0);
    };
    UICarouselItemComponent.prototype.lazyLoad = function () {
        this.lazyLoadedImages
            .forEach(function (img) {
            img.load();
        });
    };
    return UICarouselItemComponent;
}());
UICarouselItemComponent.transitionStyle = {};
UICarouselItemComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ui-carousel-item',
                template: "\n        <div #carouselItem class=\"ui-carousel-item fade\" [ngStyle]=\"transition\" swiper tabindex=\"-1\" style=\"outline: none\">\n        <ng-content></ng-content>\n        </div>\n   ",
                styles: ["\n        :host{\n            width: 100%;\n        }\n\n        .ui-carousel-item{\n            user-select: none;\n            -moz-user-select: none;\n            -khtml-user-select: none;\n            -webkit-user-select: none;\n            -o-user-select: none;\n            -ms-user-select: none;\n        }\n\n        .transition{\n            transition: transform;\n            -moz-transition: transform;\n            -webkit-transition: transform;\n            -o-transition: transform;\n            -ms-transition: transform;\n            transition-timing-function: ease;\n            -moz-transition-timing-function: ease;\n            -o-transition-timing-function: ease;\n            -ms-transition-timing-function: ease;\n        }\n\n        .ui-carousel-item{\n            height: 100%;\n            width: 100%;\n            background: transparent;\n            position: absolute;\n            overflow: hidden;\n            opacity: 0;\n        }\n\n        .fade{\n            opacity: 1;\n            -webkit-transition: opacity .5s ease-in;\n               -moz-transition: opacity .5s ease-in;\n                -ms-transition: opacity .5s ease-in;\n                 -o-transition: opacity .5s ease-in;\n                    transition: opacity .5s ease-in;\n        }\n\n        .fade-out{\n            opacity: 0;\n        }\n    "],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
UICarouselItemComponent.ctorParameters = function () { return [
    { type: core.Renderer2, },
    { type: core.ChangeDetectorRef, },
]; };
UICarouselItemComponent.propDecorators = {
    "el": [{ type: core.ViewChild, args: ['carouselItem',] },],
    "swiper": [{ type: core.ViewChild, args: [SwiperDirective,] },],
    "lazyLoadedImages": [{ type: core.ContentChildren, args: [UILazyloadDirective,] },],
};
var UICarouselComponent = /** @class */ (function () {
    function UICarouselComponent(el) {
        this.el = el;
        this.nextSubject = new Subject.Subject();
        this.prevSubject = new Subject.Subject();
        this.subscriptions = new Subscription.Subscription();
        this.onChange = new core.EventEmitter();
        this.height = '300px';
        this.width = '100%';
        this.autoPlay = true;
        this.infinite = true;
        this.fade = false;
        this.isDotsVisible = true;
        this.isArrowsVisible = true;
        this.currentItemIndex = 0;
    }
    UICarouselComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.speed = this.speed || 500;
        this.autoPlaySpeed = this.autoPlaySpeed || 1500;
        if (this.autoPlay) {
            this.autoPlayFunction(true);
        }
        this.subscriptions.add(this.nextSubject.throttleTime(this.speed).subscribe(function () {
            if (!_this.fade) {
                _this.slideLeft();
            }
            else {
                _this.fadeLeft();
            }
        }));
        this.subscriptions.add(this.prevSubject.throttleTime(this.speed).subscribe(function () {
            if (!_this.fade) {
                _this.slideRight();
            }
            else {
                _this.fadeRight();
            }
        }));
        this.subscriptions.add(this.onChange.subscribe(function (index) {
            var item = _this.getItemByIndex(index);
            item.lazyLoad();
        }));
    };
    UICarouselComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.el.nativeElement.style.height = this.height;
        this.el.nativeElement.style.width = this.width;
        if (this.items && this.items.length > 0) {
            this.onChange.emit(0);
            this._width = this.items.first.el.nativeElement.offsetWidth;
        }
        this.firstItemIndex = 0;
        this.lastItemIndex = this.items.length - 1;
        if (!this.fade) {
            this.items.forEach(function (item, itemIndex) {
                var totalDistanceSwiped = 0;
                item.speed = _this.speed;
                item.position = _this._width * itemIndex;
                item.currentPosition = item.position;
                item.disableTransition();
                item.moveTo(item.position);
                _this.subscriptions.add(item.swiper.onSwipeLeft.subscribe(function (distance) {
                    totalDistanceSwiped += Math.abs(distance);
                    var shortDistance = distance / Math.pow(totalDistanceSwiped, .4);
                    if (itemIndex === _this.firstItemIndex && _this.infinite) {
                        _this.rotateRight();
                    }
                    _this.items.forEach(function (itm) {
                        if ((itemIndex === _this.firstItemIndex || (itemIndex === _this.lastItemIndex && distance > 0))
                            && !_this.infinite) {
                            itm.currentPosition += shortDistance;
                        }
                        else {
                            itm.currentPosition += distance;
                        }
                        itm.moveTo(itm.currentPosition);
                    });
                }));
                _this.subscriptions.add(item.swiper.onSwipeRight.subscribe(function (distance) {
                    totalDistanceSwiped += Math.abs(distance);
                    var shortDistance = distance / Math.pow(totalDistanceSwiped, .4);
                    if (itemIndex === _this.lastItemIndex && _this.infinite) {
                        _this.rotateLeft();
                    }
                    _this.items.forEach(function (itm) {
                        if ((itemIndex === _this.lastItemIndex || (itemIndex === _this.firstItemIndex && distance < 0))
                            && !_this.infinite) {
                            itm.currentPosition += shortDistance;
                        }
                        else {
                            itm.currentPosition += distance;
                        }
                        itm.moveTo(itm.currentPosition);
                    });
                }));
                _this.subscriptions.add(item.swiper.swipeLeft.subscribe(function () {
                    totalDistanceSwiped = 0;
                    _this.slideLeft();
                }));
                _this.subscriptions.add(item.swiper.swipeRight.subscribe(function () {
                    totalDistanceSwiped = 0;
                    _this.slideRight();
                }));
                _this.subscriptions.add(item.swiper.onSwipeEnd.subscribe(function () {
                    totalDistanceSwiped = 0;
                    _this.enableTransition();
                    _this.slideToPrevPosition();
                }));
                _this.subscriptions.add(item.swiper.onSwipeStart.subscribe(function () {
                    totalDistanceSwiped = 0;
                    _this.disableTransition();
                }));
            });
        }
        else {
            this.items.forEach(function (item, index) {
                item.zIndex = _this.items.length - index;
                item.setzIndex(item.zIndex);
            });
        }
    };
    UICarouselComponent.prototype.next = function () {
        this.prevSubject.next();
    };
    UICarouselComponent.prototype.prev = function () {
        this.nextSubject.next();
    };
    UICarouselComponent.prototype.goTo = function (index) {
        if (!this.fade) {
            this.slideTo(index);
        }
        else {
            this.fadeTo(index);
        }
    };
    UICarouselComponent.prototype.rotateRightTo = function (index) {
        while (index !== this.lastItemIndex) {
            this.rotateRight();
        }
    };
    UICarouselComponent.prototype.rotateLeftTo = function (index) {
        while (index !== this.firstItemIndex) {
            this.rotateLeft();
        }
    };
    UICarouselComponent.prototype.slideTo = function (index) {
        var _this = this;
        this.onChange.emit((index + this.items.length) % this.items.length);
        var steps = this.currentItemIndex - index;
        if (this.infinite) {
            if (steps > 0) {
                this.rotateRightTo(this.currentItemIndex);
            }
            else if (steps < 0) {
                this.rotateLeftTo(this.currentItemIndex);
            }
        }
        setTimeout(function () {
            _this.enableTransition();
            _this.items.forEach(function (item) {
                item.position += _this._width * (steps);
                item.currentPosition = item.position;
                item.moveTo(item.position);
            });
            _this.currentItemIndex = (index + _this.items.length) % _this.items.length;
        }, 50);
    };
    UICarouselComponent.prototype.slideLeft = function () {
        if (!this.infinite) {
            if (this.currentItemIndex === 0) {
                this.slideToPrevPosition();
                return;
            }
        }
        this.slideTo(this.currentItemIndex - 1);
    };
    UICarouselComponent.prototype.slideRight = function () {
        if (!this.infinite) {
            if (this.currentItemIndex === this.items.length - 1) {
                this.slideToPrevPosition();
                return;
            }
        }
        this.slideTo(this.currentItemIndex + 1);
    };
    UICarouselComponent.prototype.slideToPrevPosition = function () {
        this.enableTransition();
        this.items.forEach(function (item) {
            item.currentPosition = item.position;
            item.moveTo(item.position);
        });
    };
    UICarouselComponent.prototype.disableTransition = function () {
        this.items.forEach(function (item) {
            item.disableTransition();
        });
    };
    UICarouselComponent.prototype.enableTransition = function () {
        this.items.forEach(function (item) {
            item.enableTransition();
        });
    };
    UICarouselComponent.prototype.getItemByIndex = function (targetIndex) {
        return this.items.find(function (__, index) {
            return index === targetIndex;
        });
    };
    UICarouselComponent.prototype.getIndexByItem = function (item) {
        return this.items.toArray().indexOf(item);
    };
    UICarouselComponent.prototype.rotateRightNTimes = function (n) {
        for (var i = 0; i < n; i++) {
            this.rotateRight();
        }
    };
    UICarouselComponent.prototype.rotateLeftNTimes = function (n) {
        for (var i = 0; i < n; i++) {
            this.rotateLeft();
        }
    };
    UICarouselComponent.prototype.rotateRight = function () {
        var firstItemRef = this.getItemByIndex(this.firstItemIndex);
        var lastItemRef = this.getItemByIndex(this.lastItemIndex);
        if (!this.fade) {
            lastItemRef.position = firstItemRef.position - this._width;
            lastItemRef.currentPosition = lastItemRef.position;
            lastItemRef.disableTransition();
            lastItemRef.moveTo(lastItemRef.position);
            this.firstItemIndex = this.lastItemIndex;
            this.lastItemIndex = (this.lastItemIndex - 1 + this.items.length) % this.items.length;
        }
    };
    UICarouselComponent.prototype.rotateLeft = function () {
        var firstItemRef = this.getItemByIndex(this.firstItemIndex);
        var lastItemRef = this.getItemByIndex(this.lastItemIndex);
        firstItemRef.position = lastItemRef.position + this._width;
        firstItemRef.currentPosition = firstItemRef.position;
        firstItemRef.disableTransition();
        firstItemRef.moveTo(firstItemRef.position);
        this.lastItemIndex = this.firstItemIndex;
        this.firstItemIndex = (this.lastItemIndex + 1) % this.items.length;
    };
    UICarouselComponent.prototype.fadeTo = function (index) {
        this.onChange.emit(index);
        var firstItem = this.getItemByIndex(this.currentItemIndex);
        var targetItem = this.getItemByIndex(index);
        targetItem.zIndex = firstItem.zIndex + 1;
        targetItem.setzIndex(targetItem.zIndex);
        targetItem.disableTransition();
        targetItem.fadeIn(this.speed);
        this.currentItemIndex = index;
    };
    UICarouselComponent.prototype.fadeRight = function () {
        var newIndex = (this.currentItemIndex + 1) % this.items.length;
        this.fadeTo(newIndex);
        this.currentItemIndex = newIndex;
    };
    UICarouselComponent.prototype.fadeLeft = function () {
        var newIndex = (this.currentItemIndex - 1 + this.items.length) % this.items.length;
        this.fadeTo(newIndex);
        this.currentItemIndex = newIndex;
    };
    UICarouselComponent.prototype.isItemFirst = function (index) {
        return this.firstItemIndex === index;
    };
    UICarouselComponent.prototype.isItemLast = function (index) {
        return this.lastItemIndex === index;
    };
    UICarouselComponent.prototype.onResize = function (__) {
        this.rePosition();
    };
    UICarouselComponent.prototype.rePosition = function () {
        if (this.items && this.items.length > 0) {
            this._width = this.items.first.el.nativeElement.offsetWidth;
        }
        var items = this.items.toArray();
        items.sort(function (item1, item2) {
            if (item1.position > item2.position) {
                return 1;
            }
            else if (item1.position < item2.position) {
                return -1;
            }
            else {
                return 0;
            }
        });
        var currentItem = this.getItemByIndex(this.currentItemIndex);
        var currentItemIndex = items.indexOf(currentItem);
        for (var i = currentItemIndex; i < items.length + currentItemIndex; i++) {
            var item = items[(i + items.length) % items.length];
            item.position = ((i + items.length) % items.length - currentItemIndex) * this._width;
            item.disableTransition();
            item.moveTo(item.position);
        }
    };
    UICarouselComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.unsubscribe();
        clearInterval(this.interval);
    };
    UICarouselComponent.prototype.autoPlayFunction = function (enable) {
        var _this = this;
        if (this.autoPlay) {
            if (enable) {
                this.interval = setInterval(function () {
                    _this.next();
                }, this.autoPlaySpeed);
            }
            else {
                clearInterval(this.interval);
            }
        }
    };
    return UICarouselComponent;
}());
UICarouselComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'ui-carousel',
                template: "\n        <div (mouseenter)=\"(autoPlay)?autoPlayFunction(false):null\" (mouseleave)=\"(autoPlay)?autoPlayFunction(true):null\">\n            <ng-content></ng-content>\n            <dots *ngIf=\"isDotsVisible\" [dots-count]=\"items.length\" position=\"middle\" [active-dot]=\"currentItemIndex\"\n                  (on-click)=\"goTo($event)\"></dots>\n            <arrow *ngIf=\"isArrowsVisible\" dir=\"left\" (on-click)=\"prev()\" [disabled]=\"false\"></arrow>\n            <arrow *ngIf=\"isArrowsVisible\" dir=\"right\" (on-click)=\"next()\" [disabled]=\"false\"></arrow>\n        </div>\n    ",
                styles: ["\n        :host {\n            display: block;\n            overflow: hidden;\n            position: relative;\n        }\n    "],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
UICarouselComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
UICarouselComponent.propDecorators = {
    "onChange": [{ type: core.Output },],
    "height": [{ type: core.Input },],
    "width": [{ type: core.Input },],
    "speed": [{ type: core.Input },],
    "autoPlay": [{ type: core.Input },],
    "autoPlaySpeed": [{ type: core.Input },],
    "infinite": [{ type: core.Input },],
    "fade": [{ type: core.Input },],
    "isDotsVisible": [{ type: core.Input, args: ['dots',] },],
    "isArrowsVisible": [{ type: core.Input, args: ['arrows',] },],
    "items": [{ type: core.ContentChildren, args: [UICarouselItemComponent,] },],
    "onResize": [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
};
var DotsComponent = /** @class */ (function () {
    function DotsComponent() {
        this.activeDot = 0;
        this.position = 'left';
        this.onClick = new core.EventEmitter();
    }
    DotsComponent.prototype.ngOnInit = function () {
        this.numbers = Array(this.dotsCount).fill(0).map(function (x, i) { return i; });
    };
    DotsComponent.prototype.click = function (index) {
        this.onClick.emit(index);
        this.activeDot = index;
    };
    return DotsComponent;
}());
DotsComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'dots',
                template: "\n    <div class=\"dot\" *ngFor=\"let index of numbers\" (click)=\"click(index)\" [class.active]=\"activeDot === index\"></div>\n    ",
                styles: ["\n        :host{\n            position: absolute;\n            display: inline-block;\n            z-index: 1000;\n        }\n\n        :host(.left){\n            bottom: 10px;\n            left: 10px;\n        }\n\n        :host(.right){\n            bottom: 10px;\n            right: 10px;\n        }\n\n        :host(.middle){\n            bottom: 20px;\n            left: 50%;\n            transform: translateX(-50%);\n            -webkit-transform: translateX(-50%);\n            -moz-transform: translateX(-50%);\n            -o-transform: translateX(-50%);\n            -ms-transform: translateX(-50%);\n        }\n\n        .dot{\n            height: 10px;\n            width: 10px;\n            border-radius: 5px;\n            background: white;\n            opacity: .6;\n            margin: 0 4px;\n            display: inline-block;\n        }\n\n        .dot:hover{\n            opacity: .8;\n            cursor: pointer;\n        }\n\n        .dot.active{\n            opacity: .8;\n        }\n    "]
            },] },
];
DotsComponent.ctorParameters = function () { return []; };
DotsComponent.propDecorators = {
    "activeDot": [{ type: core.Input, args: ['active-dot',] },],
    "dotsCount": [{ type: core.Input, args: ['dots-count',] },],
    "position": [{ type: core.HostBinding, args: ['class',] }, { type: core.Input },],
    "onClick": [{ type: core.Output, args: ['on-click',] },],
};
var ArrowComponent = /** @class */ (function () {
    function ArrowComponent() {
        this.disabled = true;
        this.click = new core.EventEmitter();
    }
    ArrowComponent.prototype.onClick = function () {
        if (!this.disabled) {
            this.click.emit();
        }
    };
    return ArrowComponent;
}());
ArrowComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'arrow',
                template: "\n        <div class=\"arrow\" (click)=\"onClick()\" \n        [ngClass]=\"{ left : dir === 'left', right : dir === 'right', disabled  : disabled}\"></div>\n    ",
                styles: ["\n        .arrow{\n            position: absolute;\n            height: 50px;\n            width: 30px;\n            opacity: .6;\n            user-select: none;\n            -moz-user-select: none;\n            -khtml-user-select: none;\n            -webkit-user-select: none;\n            -o-user-select: none;\n            z-index: 1000;\n        }\n        .arrow.right{\n            right: 5px;\n            top: 50%;\n            transform: scaleX(-1) translateY(-50%);\n            -moz-transform: scaleX(-1) translateY(-50%);\n            -o-transform: scaleX(-1) translateY(-50%);\n            -webkit-transform: scaleX(-1) translateY(-50%);\n            -ms-transform: scaleX(-1) translateY(-50%);\n            filter: FlipH;\n            -ms-filter: \"FlipH\";\n        }\n        .arrow.left{\n            left: 5px;\n            top: 50%;\n            transform: translateY(-50%);\n            -moz-transform: translateY(-50%);\n            -webkit-transform: translateY(-50%);\n            -o-transform: translateY(-50%);\n            -ms-transform: translateY(-50%);\n        }\n        .arrow:hover{\n            opacity: .8;\n            cursor: pointer;\n        }\n        .arrow:before{\n            content: \"\";\n            height: 3px;\n            width: 30px;\n            background: #fff;\n            display: block;\n            position: absolute;\n            top: 14px;\n            transform: rotate(-45deg);\n            -moz-transform: rotate(-45deg);\n            -webkit-transform: rotate(-45deg);\n            -o-transform: rotate(-45deg);\n            -ms-transform: rotate(-45deg);\n        }\n        .arrow:after{\n            content: \"\";\n            height: 3px;\n            width: 30px;\n            background: #fff;\n            display: block;\n            transform: rotate(45deg);\n            -moz-transform: rotate(45deg);\n            -webkit-transform: rotate(45deg);\n            -o-transform: rotate(45deg);\n            -ms-transform: rotate(45deg);\n            position: absolute;\n            bottom: 14px;\n        }\n        .arrow.disabled{\n            opacity: .4;\n        }\n        .arrow.disabled:hover{\n            opacity: .4;\n            cursor: pointer;\n        }\n    "],
                changeDetection: core.ChangeDetectionStrategy.OnPush
            },] },
];
ArrowComponent.ctorParameters = function () { return []; };
ArrowComponent.propDecorators = {
    "dir": [{ type: core.Input },],
    "disabled": [{ type: core.Input, args: ['disabled',] },],
    "click": [{ type: core.Output, args: ['on-click',] },],
};
var UICarouselModule = /** @class */ (function () {
    function UICarouselModule() {
    }
    return UICarouselModule;
}());
UICarouselModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule
                ],
                exports: [
                    UICarouselComponent,
                    UICarouselItemComponent,
                    UILazyloadDirective
                ],
                declarations: [
                    UICarouselComponent,
                    UICarouselItemComponent,
                    DotsComponent,
                    ArrowComponent,
                    SwiperDirective,
                    UILazyloadDirective
                ],
                providers: [],
            },] },
];

exports.UICarouselModule = UICarouselModule;
exports.ɵf = ArrowComponent;
exports.ɵc = SwiperDirective;
exports.ɵd = UILazyloadDirective;
exports.ɵe = DotsComponent;
exports.ɵb = UICarouselItemComponent;
exports.ɵa = UICarouselComponent;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-carousel-iuno.umd.js.map

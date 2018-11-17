import { Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter, Input, ChangeDetectionStrategy, Component, ViewChild, ContentChildren, ChangeDetectorRef, HostBinding, NgModule } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/throttleTime';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ZERO = 0.000000000001;
class SwiperDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.isDown = false;
        this.initialPos = ZERO;
        this.lastPos = ZERO;
        this.swipeDistance = ZERO;
        this.firstSwipeDate = Date.now();
        this.onSwipeRight = new EventEmitter();
        this.onSwipeLeft = new EventEmitter();
        this.onSwipeStart = new EventEmitter();
        this.onSwipeEnd = new EventEmitter();
        this.swipeLeft = new EventEmitter();
        this.swipeRight = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.onSwipeEnd.subscribe(() => {
        });
        this.swipeLeft.subscribe(() => {
            SwiperDirective.canISwipe = false;
            setTimeout(() => {
                SwiperDirective.canISwipe = true;
            }, 350);
        });
        this.swipeRight.subscribe(() => {
            SwiperDirective.canISwipe = false;
            setTimeout(() => {
                SwiperDirective.canISwipe = true;
            }, 350);
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseDown(event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        this.firstSwipeDate = Date.now();
        this.isDown = true;
        this.initialPos = event.clientX;
        this.swipeDistance = 0;
        this.onSwipeStart.emit();
    }
    /**
     * @param {?} __
     * @return {?}
     */
    onMouseUp(__) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseMove(event) {
        if (this.isDown) {
            const /** @type {?} */ swipeFrameDistance = event.clientX - this.initialPos - this.lastPos;
            this.swipeDistance += swipeFrameDistance;
            this.lastPos = event.clientX - this.initialPos;
            if (swipeFrameDistance > 0) {
                this.onSwipeLeft.emit(swipeFrameDistance);
            }
            else {
                this.onSwipeRight.emit(swipeFrameDistance);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchMove(event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        const /** @type {?} */ touch = event.touches[0] || event.changedTouches[0];
        let /** @type {?} */ swipeFrameDistance = touch.clientX - this.initialPos - this.lastPos;
        swipeFrameDistance = swipeFrameDistance < 30 ? swipeFrameDistance : 30;
        this.swipeDistance += swipeFrameDistance;
        this.lastPos = touch.clientX - this.initialPos;
        if (swipeFrameDistance > 0) {
            this.onSwipeLeft.emit(swipeFrameDistance);
        }
        else {
            this.onSwipeRight.emit(swipeFrameDistance);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onTouchStart(event) {
        if (!SwiperDirective.canISwipe) {
            return;
        }
        const /** @type {?} */ touch = event.touches[0] || event.changedTouches[0];
        this.firstSwipeDate = Date.now();
        this.initialPos = touch.clientX;
        this.swipeDistance = ZERO;
        this.onSwipeStart.emit();
    }
    /**
     * @param {?} __
     * @return {?}
     */
    onTouchEnd(__) {
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
    }
}
SwiperDirective.canISwipe = true;
SwiperDirective.decorators = [
    { type: Directive, args: [{
                selector: '[swiper]',
                exportAs: 'swiper'
            },] },
];
/** @nocollapse */
SwiperDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
SwiperDirective.propDecorators = {
    "onSwipeRight": [{ type: Output },],
    "onSwipeLeft": [{ type: Output },],
    "onSwipeStart": [{ type: Output },],
    "onSwipeEnd": [{ type: Output },],
    "swipeLeft": [{ type: Output },],
    "swipeRight": [{ type: Output },],
    "onMouseDown": [{ type: HostListener, args: ['mousedown', ['$event'],] },],
    "onMouseUp": [{ type: HostListener, args: ['document:mouseup', ['$event'],] },],
    "onMouseMove": [{ type: HostListener, args: ['mousemove', ['$event'],] },],
    "onTouchMove": [{ type: HostListener, args: ['touchmove', ['$event'],] },],
    "onTouchStart": [{ type: HostListener, args: ['touchstart', ['$event'],] },],
    "onTouchEnd": [{ type: HostListener, args: ['touchend', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UILazyloadDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    /**
     * @return {?}
     */
    load() {
        const /** @type {?} */ img = this.el.nativeElement;
        if (img.src) {
            return;
        }
        img.src = this.uiLazyLoad;
    }
}
UILazyloadDirective.decorators = [
    { type: Directive, args: [{ selector: '[ui-lazy-load]' },] },
];
/** @nocollapse */
UILazyloadDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
UILazyloadDirective.propDecorators = {
    "uiLazyLoad": [{ type: Input, args: ['ui-lazy-load',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UICarouselItemComponent {
    /**
     * @param {?} renderer
     * @param {?} ref
     */
    constructor(renderer, ref) {
        this.renderer = renderer;
        this.ref = ref;
        this.currentPosition = 0;
        this.position = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    get transition() {
        return UICarouselItemComponent.transitionStyle;
    }
    /**
     * @param {?} transitionStyle
     * @return {?}
     */
    set transition(transitionStyle) {
        UICarouselItemComponent.transitionStyle = transitionStyle;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    moveTo(position) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-o-transform', 'translate3d(' + position + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transform', 'translate3d(' + position + 'px, 0px, 0px)');
    }
    /**
     * @param {?} distance
     * @return {?}
     */
    moveBy(distance) {
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-o-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transform', 'translate3d(' + distance + 'px, 0px, 0px)');
    }
    /**
     * @param {?} zIndex
     * @return {?}
     */
    setzIndex(zIndex) {
        this.renderer.setStyle(this.el.nativeElement, 'z-index', zIndex);
    }
    /**
     * @return {?}
     */
    disableTransition() {
        this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-moz-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-webkit-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-o-transition', 'none');
        this.renderer.setStyle(this.el.nativeElement, '-ms-transition', 'none');
    }
    /**
     * @return {?}
     */
    enableTransition() {
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
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    fadeOut(duration) {
        return new Promise(resolve => {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
            setTimeout(() => {
                this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
                resolve();
            }, duration);
        });
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    fadeIn(duration) {
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
        setTimeout(() => {
            this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity ' + duration + 'ms');
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        }, 0);
    }
    /**
     * @return {?}
     */
    lazyLoad() {
        this.lazyLoadedImages
            .forEach((img) => {
            img.load();
        });
    }
}
UICarouselItemComponent.transitionStyle = {};
UICarouselItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-carousel-item',
                template: `
        <div #carouselItem class="ui-carousel-item fade" [ngStyle]="transition" swiper tabindex="-1" style="outline: none">
        <ng-content></ng-content>
        </div>
   `,
                styles: [`
        :host{
            width: 100%;
        }

        .ui-carousel-item{
            user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
            -ms-user-select: none;
        }

        .transition{
            transition: transform;
            -moz-transition: transform;
            -webkit-transition: transform;
            -o-transition: transform;
            -ms-transition: transform;
            transition-timing-function: ease;
            -moz-transition-timing-function: ease;
            -o-transition-timing-function: ease;
            -ms-transition-timing-function: ease;
        }

        .ui-carousel-item{
            height: 100%;
            width: 100%;
            background: transparent;
            position: absolute;
            overflow: hidden;
            opacity: 0;
        }

        .fade{
            opacity: 1;
            -webkit-transition: opacity .5s ease-in;
               -moz-transition: opacity .5s ease-in;
                -ms-transition: opacity .5s ease-in;
                 -o-transition: opacity .5s ease-in;
                    transition: opacity .5s ease-in;
        }

        .fade-out{
            opacity: 0;
        }
    `],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UICarouselItemComponent.ctorParameters = () => [
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
];
UICarouselItemComponent.propDecorators = {
    "el": [{ type: ViewChild, args: ['carouselItem',] },],
    "swiper": [{ type: ViewChild, args: [SwiperDirective,] },],
    "lazyLoadedImages": [{ type: ContentChildren, args: [UILazyloadDirective,] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UICarouselComponent {
    /**
     * @param {?} el
     */
    constructor(el) {
        this.el = el;
        this.nextSubject = new Subject();
        this.prevSubject = new Subject();
        this.subscriptions = new Subscription();
        this.onChange = new EventEmitter();
        this.height = '300px';
        this.width = '100%';
        this.autoPlay = true;
        this.infinite = true;
        this.fade = false;
        this.isDotsVisible = true;
        this.isArrowsVisible = true;
        this.currentItemIndex = 0;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.speed = this.speed || 500;
        this.autoPlaySpeed = this.autoPlaySpeed || 1500;
        if (this.autoPlay) {
            this.autoPlayFunction(true);
        }
        this.subscriptions.add(this.nextSubject.throttleTime(this.speed).subscribe(() => {
            if (!this.fade) {
                this.slideLeft();
            }
            else {
                this.fadeLeft();
            }
        }));
        this.subscriptions.add(this.prevSubject.throttleTime(this.speed).subscribe(() => {
            if (!this.fade) {
                this.slideRight();
            }
            else {
                this.fadeRight();
            }
        }));
        this.subscriptions.add(this.onChange.subscribe((index) => {
            const /** @type {?} */ item = this.getItemByIndex(index);
            item.lazyLoad();
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.el.nativeElement.style.height = this.height;
        this.el.nativeElement.style.width = this.width;
        if (this.items && this.items.length > 0) {
            this.onChange.emit(0);
            this._width = this.items.first.el.nativeElement.offsetWidth;
        }
        this.firstItemIndex = 0;
        this.lastItemIndex = this.items.length - 1;
        if (!this.fade) {
            this.items.forEach((item, itemIndex) => {
                let /** @type {?} */ totalDistanceSwiped = 0;
                item.speed = this.speed;
                item.position = this._width * itemIndex;
                item.currentPosition = item.position;
                item.disableTransition();
                item.moveTo(item.position);
                this.subscriptions.add(item.swiper.onSwipeLeft.subscribe((distance) => {
                    totalDistanceSwiped += Math.abs(distance);
                    const /** @type {?} */ shortDistance = distance / Math.pow(totalDistanceSwiped, .4);
                    if (itemIndex === this.firstItemIndex && this.infinite) {
                        this.rotateRight();
                    }
                    this.items.forEach((itm) => {
                        if ((itemIndex === this.firstItemIndex || (itemIndex === this.lastItemIndex && distance > 0))
                            && !this.infinite) {
                            itm.currentPosition += shortDistance;
                        }
                        else {
                            itm.currentPosition += distance;
                        }
                        itm.moveTo(itm.currentPosition);
                    });
                }));
                this.subscriptions.add(item.swiper.onSwipeRight.subscribe((distance) => {
                    totalDistanceSwiped += Math.abs(distance);
                    const /** @type {?} */ shortDistance = distance / Math.pow(totalDistanceSwiped, .4);
                    if (itemIndex === this.lastItemIndex && this.infinite) {
                        this.rotateLeft();
                    }
                    this.items.forEach((itm) => {
                        if ((itemIndex === this.lastItemIndex || (itemIndex === this.firstItemIndex && distance < 0))
                            && !this.infinite) {
                            itm.currentPosition += shortDistance;
                        }
                        else {
                            itm.currentPosition += distance;
                        }
                        itm.moveTo(itm.currentPosition);
                    });
                }));
                this.subscriptions.add(item.swiper.swipeLeft.subscribe(() => {
                    totalDistanceSwiped = 0;
                    this.slideLeft();
                }));
                this.subscriptions.add(item.swiper.swipeRight.subscribe(() => {
                    totalDistanceSwiped = 0;
                    this.slideRight();
                }));
                this.subscriptions.add(item.swiper.onSwipeEnd.subscribe(() => {
                    totalDistanceSwiped = 0;
                    this.enableTransition();
                    this.slideToPrevPosition();
                }));
                this.subscriptions.add(item.swiper.onSwipeStart.subscribe(() => {
                    totalDistanceSwiped = 0;
                    this.disableTransition();
                }));
            });
        }
        else {
            this.items.forEach((item, index) => {
                item.zIndex = this.items.length - index;
                item.setzIndex(item.zIndex);
            });
        }
    }
    /**
     * @return {?}
     */
    next() {
        this.prevSubject.next();
    }
    /**
     * @return {?}
     */
    prev() {
        this.nextSubject.next();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    goTo(index) {
        if (!this.fade) {
            this.slideTo(index);
        }
        else {
            this.fadeTo(index);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    rotateRightTo(index) {
        while (index !== this.lastItemIndex) {
            this.rotateRight();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    rotateLeftTo(index) {
        while (index !== this.firstItemIndex) {
            this.rotateLeft();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    slideTo(index) {
        this.onChange.emit((index + this.items.length) % this.items.length);
        const /** @type {?} */ steps = this.currentItemIndex - index;
        if (this.infinite) {
            if (steps > 0) {
                this.rotateRightTo(this.currentItemIndex);
            }
            else if (steps < 0) {
                this.rotateLeftTo(this.currentItemIndex);
            }
        }
        setTimeout(() => {
            this.enableTransition();
            this.items.forEach((item) => {
                item.position += this._width * (steps);
                item.currentPosition = item.position;
                item.moveTo(item.position);
            });
            this.currentItemIndex = (index + this.items.length) % this.items.length;
        }, 50);
    }
    /**
     * @return {?}
     */
    slideLeft() {
        if (!this.infinite) {
            if (this.currentItemIndex === 0) {
                this.slideToPrevPosition();
                return;
            }
        }
        this.slideTo(this.currentItemIndex - 1);
    }
    /**
     * @return {?}
     */
    slideRight() {
        if (!this.infinite) {
            if (this.currentItemIndex === this.items.length - 1) {
                this.slideToPrevPosition();
                return;
            }
        }
        this.slideTo(this.currentItemIndex + 1);
    }
    /**
     * @return {?}
     */
    slideToPrevPosition() {
        this.enableTransition();
        this.items.forEach((item) => {
            item.currentPosition = item.position;
            item.moveTo(item.position);
        });
    }
    /**
     * @return {?}
     */
    disableTransition() {
        this.items.forEach((item) => {
            item.disableTransition();
        });
    }
    /**
     * @return {?}
     */
    enableTransition() {
        this.items.forEach((item) => {
            item.enableTransition();
        });
    }
    /**
     * @param {?} targetIndex
     * @return {?}
     */
    getItemByIndex(targetIndex) {
        return this.items.find((__, index) => {
            return index === targetIndex;
        });
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getIndexByItem(item) {
        return this.items.toArray().indexOf(item);
    }
    /**
     * @param {?} n
     * @return {?}
     */
    rotateRightNTimes(n) {
        for (let /** @type {?} */ i = 0; i < n; i++) {
            this.rotateRight();
        }
    }
    /**
     * @param {?} n
     * @return {?}
     */
    rotateLeftNTimes(n) {
        for (let /** @type {?} */ i = 0; i < n; i++) {
            this.rotateLeft();
        }
    }
    /**
     * @return {?}
     */
    rotateRight() {
        const /** @type {?} */ firstItemRef = this.getItemByIndex(this.firstItemIndex);
        const /** @type {?} */ lastItemRef = this.getItemByIndex(this.lastItemIndex);
        if (!this.fade) {
            lastItemRef.position = firstItemRef.position - this._width;
            lastItemRef.currentPosition = lastItemRef.position;
            lastItemRef.disableTransition();
            lastItemRef.moveTo(lastItemRef.position);
            this.firstItemIndex = this.lastItemIndex;
            this.lastItemIndex = (this.lastItemIndex - 1 + this.items.length) % this.items.length;
        }
    }
    /**
     * @return {?}
     */
    rotateLeft() {
        const /** @type {?} */ firstItemRef = this.getItemByIndex(this.firstItemIndex);
        const /** @type {?} */ lastItemRef = this.getItemByIndex(this.lastItemIndex);
        firstItemRef.position = lastItemRef.position + this._width;
        firstItemRef.currentPosition = firstItemRef.position;
        firstItemRef.disableTransition();
        firstItemRef.moveTo(firstItemRef.position);
        this.lastItemIndex = this.firstItemIndex;
        this.firstItemIndex = (this.lastItemIndex + 1) % this.items.length;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    fadeTo(index) {
        this.onChange.emit(index);
        const /** @type {?} */ firstItem = this.getItemByIndex(this.currentItemIndex);
        const /** @type {?} */ targetItem = this.getItemByIndex(index);
        targetItem.zIndex = firstItem.zIndex + 1;
        targetItem.setzIndex(targetItem.zIndex);
        targetItem.disableTransition();
        targetItem.fadeIn(this.speed);
        this.currentItemIndex = index;
    }
    /**
     * @return {?}
     */
    fadeRight() {
        const /** @type {?} */ newIndex = (this.currentItemIndex + 1) % this.items.length;
        this.fadeTo(newIndex);
        this.currentItemIndex = newIndex;
    }
    /**
     * @return {?}
     */
    fadeLeft() {
        const /** @type {?} */ newIndex = (this.currentItemIndex - 1 + this.items.length) % this.items.length;
        this.fadeTo(newIndex);
        this.currentItemIndex = newIndex;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isItemFirst(index) {
        return this.firstItemIndex === index;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    isItemLast(index) {
        return this.lastItemIndex === index;
    }
    /**
     * @param {?} __
     * @return {?}
     */
    onResize(__) {
        this.rePosition();
    }
    /**
     * @return {?}
     */
    rePosition() {
        if (this.items && this.items.length > 0) {
            this._width = this.items.first.el.nativeElement.offsetWidth;
        }
        const /** @type {?} */ items = this.items.toArray();
        items.sort((item1, item2) => {
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
        const /** @type {?} */ currentItem = this.getItemByIndex(this.currentItemIndex);
        const /** @type {?} */ currentItemIndex = items.indexOf(currentItem);
        for (let /** @type {?} */ i = currentItemIndex; i < items.length + currentItemIndex; i++) {
            const /** @type {?} */ item = items[(i + items.length) % items.length];
            item.position = ((i + items.length) % items.length - currentItemIndex) * this._width;
            item.disableTransition();
            item.moveTo(item.position);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        clearInterval(this.interval);
    }
    /**
     * @param {?} enable
     * @return {?}
     */
    autoPlayFunction(enable) {
        if (this.autoPlay) {
            if (enable) {
                this.interval = setInterval(() => {
                    this.next();
                }, this.autoPlaySpeed);
            }
            else {
                clearInterval(this.interval);
            }
        }
    }
}
UICarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'ui-carousel',
                template: `
        <div (mouseenter)="(autoPlay)?autoPlayFunction(false):null" (mouseleave)="(autoPlay)?autoPlayFunction(true):null">
            <ng-content></ng-content>
            <dots *ngIf="isDotsVisible" [dots-count]="items.length" position="middle" [active-dot]="currentItemIndex"
                  (on-click)="goTo($event)"></dots>
            <arrow *ngIf="isArrowsVisible" dir="left" (on-click)="prev()" [disabled]="false"></arrow>
            <arrow *ngIf="isArrowsVisible" dir="right" (on-click)="next()" [disabled]="false"></arrow>
        </div>
    `,
                styles: [`
        :host {
            display: block;
            overflow: hidden;
            position: relative;
        }
    `],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
UICarouselComponent.ctorParameters = () => [
    { type: ElementRef, },
];
UICarouselComponent.propDecorators = {
    "onChange": [{ type: Output },],
    "height": [{ type: Input },],
    "width": [{ type: Input },],
    "speed": [{ type: Input },],
    "autoPlay": [{ type: Input },],
    "autoPlaySpeed": [{ type: Input },],
    "infinite": [{ type: Input },],
    "fade": [{ type: Input },],
    "isDotsVisible": [{ type: Input, args: ['dots',] },],
    "isArrowsVisible": [{ type: Input, args: ['arrows',] },],
    "items": [{ type: ContentChildren, args: [UICarouselItemComponent,] },],
    "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DotsComponent {
    constructor() {
        this.activeDot = 0;
        this.position = 'left';
        this.onClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.numbers = Array(this.dotsCount).fill(0).map((x, i) => i);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    click(index) {
        this.onClick.emit(index);
        this.activeDot = index;
    }
}
DotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'dots',
                template: `
    <div class="dot" *ngFor="let index of numbers" (click)="click(index)" [class.active]="activeDot === index"></div>
    `,
                styles: [`
        :host{
            position: absolute;
            display: inline-block;
            z-index: 1000;
        }

        :host(.left){
            bottom: 10px;
            left: 10px;
        }

        :host(.right){
            bottom: 10px;
            right: 10px;
        }

        :host(.middle){
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            -o-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
        }

        .dot{
            height: 10px;
            width: 10px;
            border-radius: 5px;
            background: white;
            opacity: .6;
            margin: 0 4px;
            display: inline-block;
        }

        .dot:hover{
            opacity: .8;
            cursor: pointer;
        }

        .dot.active{
            opacity: .8;
        }
    `]
            },] },
];
/** @nocollapse */
DotsComponent.ctorParameters = () => [];
DotsComponent.propDecorators = {
    "activeDot": [{ type: Input, args: ['active-dot',] },],
    "dotsCount": [{ type: Input, args: ['dots-count',] },],
    "position": [{ type: HostBinding, args: ['class',] }, { type: Input },],
    "onClick": [{ type: Output, args: ['on-click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ArrowComponent {
    constructor() {
        this.disabled = true;
        this.click = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.disabled) {
            this.click.emit();
        }
    }
}
ArrowComponent.decorators = [
    { type: Component, args: [{
                selector: 'arrow',
                template: `
        <div class="arrow" (click)="onClick()" 
        [ngClass]="{ left : dir === 'left', right : dir === 'right', disabled  : disabled}"></div>
    `,
                styles: [`
        .arrow{
            position: absolute;
            height: 50px;
            width: 30px;
            opacity: .6;
            user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -o-user-select: none;
            z-index: 1000;
        }
        .arrow.right{
            right: 5px;
            top: 50%;
            transform: scaleX(-1) translateY(-50%);
            -moz-transform: scaleX(-1) translateY(-50%);
            -o-transform: scaleX(-1) translateY(-50%);
            -webkit-transform: scaleX(-1) translateY(-50%);
            -ms-transform: scaleX(-1) translateY(-50%);
            filter: FlipH;
            -ms-filter: "FlipH";
        }
        .arrow.left{
            left: 5px;
            top: 50%;
            transform: translateY(-50%);
            -moz-transform: translateY(-50%);
            -webkit-transform: translateY(-50%);
            -o-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
        }
        .arrow:hover{
            opacity: .8;
            cursor: pointer;
        }
        .arrow:before{
            content: "";
            height: 3px;
            width: 30px;
            background: #fff;
            display: block;
            position: absolute;
            top: 14px;
            transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
        }
        .arrow:after{
            content: "";
            height: 3px;
            width: 30px;
            background: #fff;
            display: block;
            transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            position: absolute;
            bottom: 14px;
        }
        .arrow.disabled{
            opacity: .4;
        }
        .arrow.disabled:hover{
            opacity: .4;
            cursor: pointer;
        }
    `],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ArrowComponent.ctorParameters = () => [];
ArrowComponent.propDecorators = {
    "dir": [{ type: Input },],
    "disabled": [{ type: Input, args: ['disabled',] },],
    "click": [{ type: Output, args: ['on-click',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UICarouselModule {
}
UICarouselModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { UICarouselModule, ArrowComponent as ɵf, SwiperDirective as ɵc, UILazyloadDirective as ɵd, DotsComponent as ɵe, UICarouselItemComponent as ɵb, UICarouselComponent as ɵa };
//# sourceMappingURL=ng-carousel-iuno.js.map

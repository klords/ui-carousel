import { ElementRef, Renderer2, EventEmitter, OnInit } from '@angular/core';
export declare class SwiperDirective implements OnInit {
    private el;
    private renderer;
    static canISwipe: boolean;
    isDown: boolean;
    initialPos: number;
    lastPos: number;
    swipeDistance: number;
    firstSwipeDate: number;
    onSwipeRight: EventEmitter<any>;
    onSwipeLeft: EventEmitter<any>;
    onSwipeStart: EventEmitter<any>;
    onSwipeEnd: EventEmitter<any>;
    swipeLeft: EventEmitter<any>;
    swipeRight: EventEmitter<any>;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onMouseDown(event: any): void;
    onMouseUp(__: any): void;
    onMouseMove(event: any): void;
    onTouchMove(event: any): void;
    onTouchStart(event: any): void;
    onTouchEnd(__: any): void;
}

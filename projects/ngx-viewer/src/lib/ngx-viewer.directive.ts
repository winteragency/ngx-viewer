import { Directive, ElementRef, NgModule, OnDestroy, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import Viewer from 'viewerjs';

@Directive({
  selector: '[ngxViewer]'
})
export class NgxViewerDirective implements AfterViewInit, OnDestroy {
  @Input() viewerOptions: Viewer.Options = {};

  @Output() viewerReady: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerShow: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerShown: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerHide: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerHidden: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerView: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerViewed: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerZoom: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() viewerZoomed: EventEmitter<Event> = new EventEmitter<Event>();

  instance: Viewer;

  private nativeElement: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    this.initViewer();
  }

  private initViewer(): void {
    if (this.instance) {
      this.instance.destroy();
    }

    this.instance = new Viewer(this.nativeElement, {
      // Transitions currently break the Viewer when running optimizations during ng build (i.e in prod mode)
      // TODO: Find a fix for this so we don't have to force disable transitions
      transition: false,
      ...this.viewerOptions
    });

    this.nativeElement.addEventListener('ready', event => this.viewerReady.emit(event), false);
    this.nativeElement.addEventListener('show', event => this.viewerShow.emit(event), false);
    this.nativeElement.addEventListener('shown', event => this.viewerShown.emit(event), false);
    this.nativeElement.addEventListener('hide', event => this.viewerHide.emit(event), false);
    this.nativeElement.addEventListener('hidden', event => this.viewerHidden.emit(event), false);
    this.nativeElement.addEventListener('view', event => this.viewerView.emit(event), false);
    this.nativeElement.addEventListener('viewed', event => this.viewerViewed.emit(event), false);
    this.nativeElement.addEventListener('zoom', event => this.viewerZoom.emit(event), false);
    this.nativeElement.addEventListener('zoomed', event => this.viewerZoomed.emit(event), false);
  }

  public ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }
}

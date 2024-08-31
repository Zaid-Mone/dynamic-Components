import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[DropZone]',
  standalone: true
})
export class DropZoneDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    event.dataTransfer?.setData('text', (event.target as HTMLElement).id);
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();  // Necessary to allow a drop
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text');
    const dropTarget = this.el.nativeElement;

    if (data && dropTarget) {
      const draggedElement = document.getElementById(data);
      dropTarget.appendChild(draggedElement);
    }
  }
}

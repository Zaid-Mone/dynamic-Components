import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './d-paggination.component.html',
  styleUrl: './d-paggination.component.css'
})
export class DPagginationComponent {
  @Input() totalRecords: number = 0;
  @Input() pageSize: number = 5;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.pageChange.emit(page);
  }
  getDisplayedPages2(): number[] {
    debugger
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  getDisplayedPages6(): number[] {
    const pages: number[] = [];
    const totalPages = this.totalPages;
  
    if (totalPages <= 1) return pages; // No pages to display
  
    // Always show the first page
    pages.push(1);
    
    // Show previous page if applicable
    if (this.currentPage > 2) {
      pages.push(this.currentPage - 1);
    }
  
    // Always show the current page
    pages.push(this.currentPage);
    
    // Show next page if applicable
    if (this.currentPage < totalPages) {
      pages.push(this.currentPage + 1);
    }
  
    // Always show the last page if total pages is greater than 1
    if (this.currentPage < totalPages - 1) {
      pages.push(totalPages);
    }
  
    return Array.from(new Set(pages)); // Remove duplicates
  }
  
  getDisplayedPages(): number[] {
    if (this.totalPages <= 1) {
      return [this.currentPage]; // Return an array with the current page
    }
  
    const pages: number[] = [];
  
    // Always show the first page
    pages.push(1);
  
    // Show previous page if applicable
    if (this.currentPage > 2) {
      pages.push(this.currentPage - 1);
    }
  
    // Always show the current page
    pages.push(this.currentPage);
  
    // Show next page if applicable
    if (this.currentPage < this.totalPages) {
      pages.push(this.currentPage + 1);
    }
  
    // Always show the last page if total pages is greater than 1
    if (this.currentPage < this.totalPages - 1) {
      pages.push(this.totalPages);
    }
  
    return Array.from(new Set(pages)); // Remove duplicates
  }
  getDisplayedPages1(): number[] {
    debugger
    const pages: number[] = [];
    const totalPages = this.totalPages;
  
    if (totalPages <= 1) {
      return [this.currentPage]
   
  
    // // Always show the first page
    // pages.push(1);
    // return pages; // No pages to display
    }
    if (totalPages <= 1) return pages; // No pages to display
    // Show previous page if applicable
    if (this.currentPage > 2) {
      pages.push(this.currentPage - 1);
    }
  
    // Always show the current page
    pages.push(this.currentPage);
    
    // Show next page if applicable
    if (this.currentPage < totalPages) {
      pages.push(this.currentPage + 1);
    }
  
    // Always show the last page if total pages is greater than 1
    if (this.currentPage < totalPages - 1) {
      pages.push(totalPages);
    }
  
    return Array.from(new Set(pages)); // Remove duplicates
  }
  
}

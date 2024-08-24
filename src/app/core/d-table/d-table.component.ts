import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { TablePaginationConfig } from '../../models/TablePaginationConfig';
@Component({
  selector: 'd-table',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './d-table.component.html',
  styleUrl: './d-table.component.css'
})
export class DTableComponent implements OnChanges,AfterViewInit{

//#region inputs & outputs
@ViewChild('TABLE') table!: ElementRef; // for getting the specific table element
@Input() tableHead: TemplateRef<any> | null = null; // for display the table head columns
@Input() tableBody: TemplateRef<any> | null = null; // for display the table body data
@Input() data: any[] = []; // for the data 
@Input() totalRecords:number= 0; // for the total numbres of data records
@Input() tableClass:string=''; // for the table style for ex : ['table table-bordered']
@Input() columnFilters = ['']; // for the column that will be search in for ex : ['name']
@Input() pagination: boolean = false; // for display the paggination or not 
@Input() search: boolean = false; // for display the search or not 
@Input() showExports: boolean = false; // for display the Export DropDwon or not 
@Input() Size:number= 0; // for the size of records  per page
@Input() Limits:number[] = []; // for the limits that will be displayed for the user  for ex : [5,10,20,50]

@Output() onPageChnage = new EventEmitter<{ page: number, pageSize:number  }>();
@Output() onLimitChange = new EventEmitter<{ page: number, pageSize:number  }>();

//#endregion

//#region table config
tableConfig: TablePaginationConfig = {
  page: 1,
  pageSize: 5,//this.pageSize,
  totalPages: 0,
  totalRecord:this.totalRecords
};
//#endregion

//#region table variables
columnsNumber=0;
tableData: any[] = [];
searchTerm='';
//#endregion

//#region Hooks
constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.initialPagination();

  }

  ngAfterViewInit(): void {
    const columnCount = this.getColumnCount();
    this.columnsNumber = columnCount;
    this.cdr.detectChanges();
  }
//#endregion

//#region table functions
initialPagination(){
  this.tableConfig={
    ...this.tableConfig,
    totalPages : Math.floor(this.tableConfig.totalRecord / this.tableConfig.pageSize)
  }
  
  this.refreshTable();
}

refreshTable(){
  let data = this.data;
  this.tableConfig.totalPages = Math.floor(this.totalRecords / this.tableConfig.pageSize);
  this.tableData = data;
}

getColumnCount(): number {
  const tableElement = this.table.nativeElement;
  // Find the header row (assuming the first row contains headers)
  const headerRow = tableElement.querySelector('thead tr');
  if (headerRow) {
    return headerRow.children.length;
  }
  // Fallback to first row in tbody if thead is not present
  const firstRow = tableElement.querySelector('tbody tr');
  if (firstRow) {
    return firstRow.children.length;
  }
  return 0; 
}

matches(data: any) {
  let columns = Object.keys(data);
  for (let index = 0; index < columns.length; index++) {
    if (this.columnFilters.includes(columns[index])) {
      if (
        data[columns[index]]
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
  }
  return false;
}

onSearch(event:any){
  let data = this.data;
  const input = event.target as HTMLInputElement;
  if (input.value !== '') {
    data = this.data.filter((item) => this.matches(item));
    this.tableConfig.totalPages = Math.ceil(data.length / this.tableConfig.pageSize);
  }
  this.tableData = data;
  console.log('Search term:', input.value);
}

pageChange(page: number) {
  debugger;
  this.emptyTheInputValue();
  this.tableConfig = {
    ...this.tableConfig,
    page: page,
  };
console.log('the page change and you are in the page : ' + this.tableConfig.page);
console.log('the page Size is  : ' + this.tableConfig.pageSize);
this.onPageChnage.emit( {
  page:this.tableConfig.page,
  pageSize:this.tableConfig.pageSize
})
  this.refreshTable();
}

pageLimitChange(){
  debugger;
  this.emptyTheInputValue();
  this.tableConfig = {
    ...this.tableConfig,
    pageSize: Number(this.Size),
    page:1
  };
console.log('the page change and you are in the page : ' + this.tableConfig.page);
console.log('the page Size is  : ' + this.tableConfig.pageSize);
this.onLimitChange.emit( {
  page:1,
  pageSize:this.tableConfig.pageSize
})
  this.refreshTable();
}

getMin(a1:number,a2:number):number{
  return  Math.min(a1, a2)
}

Export(type:string){
  switch (type) {
    case 'PDF':
      this.exportToPDF();
      break;
      case 'EXCEL':
        this.exportToExcel();
      return ;
  }
}

// Export to Excel 
exportToExcel() {
  debugger;
  // more info => https://stackoverflow.com/questions/50398284/angular-material-data-table-export-to-excel
  // for remove the edit and update button or any buttons 
  const clonedTable = this.table.nativeElement.cloneNode(true) as HTMLTableElement;
  const buttons = clonedTable.querySelectorAll('button');
  buttons.forEach(button => button.remove());
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(clonedTable);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'table_data.xlsx');
}


// export to PDF
exportToPDF() {
  // more info => https://stackoverflow.com/questions/57606071/how-to-print-records-in-a-table-with-pagination-in-angular-6-all-the-records-no
  const clonedTable = this.table.nativeElement.cloneNode(true) as HTMLTableElement;
  const buttons = clonedTable.querySelectorAll('button');
  buttons.forEach(button => button.remove());
      const tempContainer = document.createElement('div');
      // tempContainer.style.position = 'absolute';
      // tempContainer.style.left = '10px';
      // tempContainer.style.left = '10px';

      document.body.appendChild(tempContainer);
      tempContainer.appendChild(clonedTable);

    this.cdr.detectChanges();
  setTimeout(() => {
    html2canvas(clonedTable, { useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.width;
      const pdfHeight = pdf.internal.pageSize.height;
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      const pdfRatio = pdfWidth / pdfHeight;
      let pdfImageWidth, pdfImageHeight;
      if (ratio > pdfRatio) {
        pdfImageWidth = pdfWidth;
        pdfImageHeight = pdfWidth / ratio;
      } else {
        pdfImageHeight = pdfHeight;
        pdfImageWidth = pdfHeight * ratio;
      }
      pdf.addImage(imgData, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
      pdf.save('table_data.pdf');
      document.body.removeChild(tempContainer);
    }).catch(error => {
      console.error('Error capturing the table as image:', error);
      document.body.removeChild(tempContainer);
    });
  }, 100); 

}


emptyTheInputValue(){
  this.searchTerm =''
}

//#endregion



}

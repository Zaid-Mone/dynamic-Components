import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Todo } from '../../models/Todo';
import { DTableComponent } from '../../core/d-table/d-table.component';
import { FormsModule } from '@angular/forms';
import { UploaderComponent } from '../uploader/uploader.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [DTableComponent, FormsModule, UploaderComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos:Todo[]=[]
  totalRecords=200;
  selectAll:boolean=false;
  selectedItems: any[] = [];
  constructor(private service:APIService) {}

  ngOnInit(): void {
    this.getToDo();
  }
  
  
  getToDo(page:number=1,pageSize:number=5){
    this.service.getTodos(page,pageSize).subscribe({
      next:(response)=>{
        this.todos = response;
        console.log('todos');
        console.log(this.todos);
      },
      error:(error)=>{
  
      }
    })
   }

   OnPageChage(event:any){
    this.getToDo(event.page,event.pageSize);
   }

   OnPageLimitChange(event:any){
    this.getToDo(event.page,event.pageSize);
   }

   toggleSelectAll(event: any): void {
    debugger;
    this.selectAll = (event.target as HTMLInputElement).checked;
  }
  toggleSelection(item: any, event: Event): void {
    debugger;
    item.selected = (event.target as HTMLInputElement).checked;
    if (item.selected) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
    }
    // this.selectAll = this.tableData.every(item => item.selected);
  }



  handleFilesDropped(files: File[]) {
    debugger;
    console.log('Files dropped:', files);
  }
  
}

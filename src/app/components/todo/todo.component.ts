import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { Todo } from '../../models/Todo';
import { DTableComponent } from '../../core/d-table/d-table.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [DTableComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{
  todos:Todo[]=[]
  totalRecords=200;
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
    console.log('emitter page changed');
    console.log('emitter page changed event page' + event.page + "PageSize"+ event.pageSize);
    this.getToDo(event.page,event.pageSize);
   }

   OnPageLimitChange(event:any){
    debugger
    console.log('emitter page changed');
    console.log('emitter page changed event page' + event.page + "PageSize"+ event.pageSize);
    this.getToDo(event.page,event.pageSize);
   }



}

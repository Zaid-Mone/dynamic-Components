import { Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { UploaderComponent } from './components/uploader/uploader.component';

export const routes: Routes = [

{ path: '',   redirectTo: 'todo', pathMatch: 'full' },

{path:'todo',component:TodoComponent} ,
{path:'upload',component:UploaderComponent} 
];

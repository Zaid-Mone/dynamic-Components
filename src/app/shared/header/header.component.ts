import { Component, effect, signal } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  lang = signal(this.commonService.getLang());
  user$= signal(this.commonService.getuser$)
  constructor(public commonService:CommonService) {
  }

  onLangChange(type:string){
  this.commonService.updateLanguage(type);
  this.lang =signal(this.commonService.getLang());
  }



}

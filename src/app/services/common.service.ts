import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { User } from '../models/User';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   private lang = signal<string>('');
   private user = signal<User | null>(null);
  constructor(private _http:HttpClient) { }

  getLang = computed(() => this.lang());
  getuser$ = computed(()=>{this.fetchUserProfile()})
  
  updateLanguage(type: string) {
    this.lang.set(type);
  }

  async fetchUserProfile(): Promise<void> {
    try {
      const response = await this._http.get<User>('https://jsonplaceholder.typicode.com/users/1').toPromise();
      if(response != null){
        this.user.set(response);
      } 
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  getUser(): User | null {
    return this.user();
  }
}

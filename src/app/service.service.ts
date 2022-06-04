import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
baseUrl:any = environment.apiUrl; 
  constructor(private http:HttpClient) { }
  
  getusr(){
  return this.http.get(this.baseUrl);
  }
  addUsr(data:any){
    return this.http.post(this.baseUrl, data);
  }
  deleteSingleUser(id: any) {
    return this.http.delete(this.baseUrl+'/'+id);
  }
  edituserChange(id:number, data:any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}

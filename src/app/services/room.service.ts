import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import {  Room} from '../models/room';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  votingSystemData: Room[]= [] ;
  roomSesion: Room [] = [] ; 
  url_api_room = 'http://localhost:8000/api/room' ;
  url_api_room_occupied = 'http://localhost:8000/api/room/occupied' ;
  constructor(private http: HttpClient) { }

  createRoom(room: Room){
    //return this.http.post(this.url_api , user , {responseType: 'text'}); 
    return this.http.post<Room []>(this.url_api_room , room ); 
  }

  getRoom(room: string | any  ){
    return this.http.get<Room>(this.url_api_room + `/${room}`) ;
  }
  
  getRoomOccupied( ){
    return this.http.get(this.url_api_room_occupied) ;
  }

}

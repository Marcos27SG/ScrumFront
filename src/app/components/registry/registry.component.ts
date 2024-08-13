import { Component, NgModule, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RoomService } from 'src/app/services/room.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserComponent } from '../user/user.component';
@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})

export class RegistryComponent implements OnInit {
  creatorName = '';
  createRoomName = '';
  userName = '';
  joinRoomName = '';
  votingSystemSelected = 'Fibonacci';
  errorHandlingCreateRoom = '';
  errorHandlingJoinRoom = '';
  roomsOcuppied: any | number = [];
  userSesion: User = {
    name: "",
    room: "",
    votation: false,
    score: 0,
  };

  constructor(public userService: UserService, public roomService: RoomService
    , private router: Router) { }

  ngOnInit(): void {
    // console.log(this.nameValue);
    this.getTheVotingSystens();
    console.log(this.userService.votingSystemData);
    this.getRoomsOccupied();
    console.log(this.roomsOcuppied);


  }
  selectChangeHandler(event: any) {
    this.votingSystemSelected = event.target.value;
  }
  onKey(event: any) { // without type info
    this.creatorName = event.target.value;
  }
  onKey2(event: any) { // without type info
    this.createRoomName = event.target.value;
  }
  onKey3(event: any) { // without type info
    this.userName = event.target.value;
  }
  onKey4(event: any) { // without type info
    this.joinRoomName = event.target.value;
  }
  createNewUser() {
    this.roomService.getRoomOccupied().subscribe(

      (res) => {
        this.roomsOcuppied = res
        this.createUser(this.roomsOcuppied)
      }
    )
  }
  joinRoomUser() {
    this.roomService.getRoomOccupied().subscribe(

      (res) => {
        this.roomsOcuppied = res
        this.joinRoom(this.roomsOcuppied)
      }
    )
  }
  createUser(rooomie: any | number[]) {
    this.errorHandlingCreateRoom = '';
    let createUser = {
      name: this.creatorName,
      room: this.createRoomName,
      votation: false,
      score: 0,

    }
    if (this.creatorName === '') {
      this.errorHandlingCreateRoom = "por favor ingrese un nombre"
    } else if (this.createRoomName === '') {
      this.errorHandlingCreateRoom = "por favor establezca un codigo de sala"
    } else if (rooomie.includes(parseInt(this.createRoomName))) {
      this.errorHandlingCreateRoom = "Ya existe ese codigo intente con otro"
    } else {
      this.userService.createUser(createUser).subscribe(
       
        (res) => {
          this.userSesion = res
          this.createNewRoom(this.userSesion)
         
        });
    }
  }
  getRoomsOccupied() {
    this.roomService.getRoomOccupied().subscribe(

      res => this.roomsOcuppied = res
      ,
      err => console.error(err)


    )
  }


  createNewRoom(myUser: User) {
    this.getRoomsOccupied();
    let createRoom = {
      codeRoom: this.createRoomName,
      userAdmin: this.creatorName,
      typeOfRoom: this.votingSystemSelected,
      active: true,
    }

    this.roomService.createRoom(createRoom).subscribe(
      res => {
        this.roomService.roomSesion = res,
          console.log(myUser);
        this.router.navigate(['/room/' + this.createRoomName + '/' + myUser._id]);
      },

      err => console.error(err)
    )
  }

  joinRoom(roomie: any | number[]) {
    console.log(this.roomsOcuppied);
    this.getRoomsOccupied();
    console.log(this.roomsOcuppied);
    this.errorHandlingJoinRoom = ' ';

    let createUser = {
      name: this.userName,
      room: this.joinRoomName,
      votation: false,
      score: 0,

    }
    if (this.userName === '') {
      this.errorHandlingJoinRoom = "por favor ingrese un nombre"
    } else if (this.joinRoomName === '') {
      this.errorHandlingJoinRoom = "por favor ingrese un codigo de sala"
    } else if (!roomie.includes(parseInt(this.joinRoomName))) {
      this.errorHandlingJoinRoom = "No Existe es sala, por favor intente otra sala"
    } else {
      this.userService.createUser(createUser).subscribe(
        (res) => {
          this.userSesion = res
          this.router.navigate(['/room/' + this.joinRoomName + '/' + this.userSesion._id]);
        });
    }
  }

  getTheVotingSystens() {
    this.userService.getVotingSystems().subscribe(
      res => {
        this.userService.votingSystemData = res;
      },
      err => console.error(err)
    )
  }


}

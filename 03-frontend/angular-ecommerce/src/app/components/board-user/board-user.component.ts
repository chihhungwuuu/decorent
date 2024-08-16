import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit{

  content?:string;
  currentUser: any;
  errorMessage = '';

  form: any = {
    username: null,
    email: null,
    cellphone: null
  };

  constructor(
    private userService: UserService,
    private storageService: StorageService){}

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if(err.error){
          try{
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch{
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        }else{
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.currentUser = this.storageService.getUser();
    console.log("username: "+ this.currentUser.username)
  }

  onSubmit():void{
    const {username,email,cellphone} = this.form;
    const userid = this.storageService.getUser().id;

    this.userService.updateUserDetail(userid,username,email,cellphone).subscribe({
      next: data => {
        this.content = data;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }


}

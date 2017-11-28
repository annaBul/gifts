import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import { Router} from '@angular/router';

const CLOUDYNARY_URL = 'https://api.cloudinary.com/v1_1/dyzdll94h/image/upload';
const CLOUDYNARY_UPLOAD_PRESET = 'xmqxl2si';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser;
  user = {
    username: "",
    email: "",
    password: "",
  imageUrl: ""};
  message = "";

  constructor(private userService:UserService,
    private router: Router) {      
    
   }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    

    this.userService.getUserSettings(this.currentUser.id)
    .subscribe(res => {
      if(!res.error){
        if(res.user){
          this.user = res.user;
        }
      }
      else{
        this.router.navigate(['/']);
      }
    })
   }else{
    this.router.navigate(['/']);
   }
  }

  saveChanges($event): void{
    event.preventDefault();
    this.userService.saveSettingChanges(this.user)
      .subscribe(res => {
        if(!res.error){          
          localStorage.setItem('currentUser', JSON.stringify({ token: this.currentUser.token, username: this.user.username, id: this.currentUser.id })); 
          //don't want change username in navbar 
          this.message = "Your account was updated successfully.";     
          //location.reload(); 
          this.router.navigate(['/user/'+this.currentUser.id+'/settings']);        
        }
        else{
          this.message = "Sorry! Some error."; 
        }
    });
  }

  public uploadFile(event: any) { 
    
    const file = event.target.files[0]; 
    const xhr = new XMLHttpRequest(); 
    const fd = new FormData(); 
    
    //fd.append('upload_preset', 'xmqxl2si');
    xhr.open('POST', CLOUDYNARY_URL, true); 
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
    
    xhr.onreadystatechange = (e) => { 
      if (xhr.readyState === 4 && xhr.status === 200) { 
        console.log(JSON.parse(xhr.responseText)); 
        const response = JSON.parse(xhr.responseText); 
        const imgs = document.getElementsByTagName('img'); 
        for (let i = 0; i < imgs.length; i++) { 
          const img = imgs[i]; 
          if (img.id === 'user-image') { 
            this.user.imageUrl = response.secure_url; 
            img.src = response.secure_url; 
            img.alt = response.public_id; 
          } 
        } 
      } 
    };
    fd.append('upload_preset', CLOUDYNARY_UPLOAD_PRESET ); 
    fd.append('file', file); 
    xhr.send(fd);  
  }
    

}

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdateProfileService } from '../fetch-api-data.service';
import { DeleteUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile-form',
  templateUrl: './update-profile-form.component.html',
  styleUrls: ['./update-profile-form.component.scss']
})
export class UpdateProfileFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor( 
    public fetchApiData: UpdateProfileService,
    public fetchDeleteData: DeleteUserService,
    public dialogRef: MatDialogRef<UpdateProfileFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }
  

  ngOnInit(): void {
  }

  /** 
   * This sends updated profile information to database and refreshed the page
   */ 
  updateUser(): void{
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here!
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.setItem('user', response.Username);
      console.log(response);
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
    setTimeout(function() {
      window.location.reload();
    }, 1000);
  }
}
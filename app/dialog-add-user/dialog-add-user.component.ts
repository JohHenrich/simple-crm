import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/models/user.class';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);


    this.firestore
      .collection('users')
      .add(this.user.toJSON())
      .then((result: any) => {
        console.log('Adding user finished', result);
        this.loading = false;
        this.dialogRef.close();
      });
   
  }

}



import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
    selector: 'sandbox',
    /*template: `<h1> Hello world </h1>
                <div class="container">
                    <form novalidate #f="ngForm" (ngSubmit)="onSubmit(f)">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" [(ngModel)]="user.name" 
                                name="name" class="form-control"
                                #userName="ngModel" minlength="2" required >
                                <div *ngIf="userName.errors?.required && userName.touched" class="alert alert-danger">Name is required</div>
                                <div *ngIf="userName.errors?.minlength && userName.touched" class="alert alert-danger">Name should be atleast two characters </div>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" [(ngModel)]="user.email" 
                                name="email" class="form-control"
                                #userEmail="ngModel" required >
                                <div *ngIf="userEmail.errors?.required && userEmail.touched" class="alert alert-danger">Email is required</div>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" [(ngModel)]="user.phone" 
                                name="phone" class="form-control"
                                #userPhone="ngModel" minlength="10"  >
                                <div *ngIf="userPhone.errors?.minlength && userPhone.touched" class="alert alert-danger">Phone number should be atleast 10 numbers</div>
                             </div>
                            <input type="submit" value="submit" class="btn btn-success">
                    </form>
                  
               <div>
    `*/
    /* template: `
             <ul class="list-group">
                 <li class="list-group-item" *ngFor="let user of users"> {{ user }} </li>
             </ul>
     `*/
    /*
    template: `
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let d of data"> {{ d }}</li>
        </ul>
    `
    */
    template: `
        <form (submit)="onSubmit(isEdit)">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" [(ngModel)]="user.name"
                 name="name">
            </div>
            <div class="form-group">
                 <label>Email</label>
              <input type="text" class="form-control" [(ngModel)]="user.email"
             name="email">
        </div>
        <div class="form-group">
        <label>Phone</label>
        <input type="text" class="form-control" [(ngModel)]="user.phone"
         name="phone">
    </div>
    <input type="submit" value="submit" class="btn btn-success">

        </form>
        <br>
        <div *ngFor="let user of users">
            <div class="well">
                <ul class="list-group">
                    <li class="list-group-item">Name: {{ user.name }} </li>
                    <li class="list-group-item">Email: {{ user.email }} </li>
                    <li class="list-group-item">Phone: {{ user.phone }} </li>
                    
                </ul>
                <br>
                <button class="btn btn-danger btn-sm" (click)="onDelete(user.id)">Delete</button>
                <button class="btn btn-primary btn-sm" (click)="onEdit(user)">Edit</button>
            </div>
        </div>
    `
})

/*export class SandboxComponent {
   user= {
       name: '',
       age: 0,
       phone: '',   
   }
   

   onSubmit({value, valid}) {
       if(valid){
            console.log(value);
       } else { 
            console.log('form is invalid ');
       }
   }
}*/

/*export class SandboxComponent {
    users:string[];

    constructor(public dataService: DataService) {
        console.log(this.dataService.getUsers());
        this.users = this.dataService.getUsers();
    }
}*/

/*export class SandboxComponent {
        data: any[] = [];
        constructor (public dataService: DataService) {
            this.dataService.getData().subscribe(data =>  {
                //console.log(data);
                this.data.push(data);
            });
        }

} */

export class SandboxComponent {
    users: any[];

    user = {
        name: '',
        email: '',
        phone: '',
        id: ''
    }

    isEdit: boolean = false;

    constructor(public dataService: DataService) {
        this.dataService.getUsers().subscribe(users => {
            //console.log(users);
            this.users = users;
        });
    }

    onSubmit(isEdit) {
        if (isEdit) {
            this.dataService.updateUser(this.user).subscribe(user => {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].id == this.user.id) {
                        this.users.splice(i, 1);
                    }
                }
                this.users.unshift(this.user);
            });

        } else {
            this.dataService.addUser(this.user).subscribe(user => {
                console.log(user);
                this.users.unshift(user);
            });
        }

    }

    onDelete(id) {
        //console.log(id);
        this.dataService.deleteUser(id).subscribe(res => {
            //console.log(res);
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id == id) {
                    this.users.splice(i, 1);
                }
            }
        })
    }

    onEdit(user) {
        this.isEdit = true;
        this.user = user;

    }
}

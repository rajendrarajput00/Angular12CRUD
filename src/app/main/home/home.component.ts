import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EdituserComponent} from '../edituser/edituser.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable)
  table!: MatTable<any>;

  displayedColumns: string[] = ['sr_no', 'EMpName', 'Gender', 'Country','EmpBasicSal','EmpPf','TotalSalCredit','EmpType','Detail','action'];
  dataSource: any;
  currentUser_name: any;
  temp2: any;
  Users: any;
  loggedinuser: any;
  loggedinUser: any;
  currentusername: any;
  loggedinUser2: any;
  currentuseremail: any;


  constructor(private userservice: ServiceService, private router: Router,public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    let temp = localStorage.getItem('loggedinUser');
    this.loggedinUser2 = temp;
    console.log(this.loggedinUser2);

    this.loggedinUser = JSON.parse(this.loggedinUser2)
    this.getUserListData();
    this.userservice.getusr().subscribe((data: any) => {
      this.Users = data;
      console.log(this.Users);
      this.Users.forEach((item: any) => {
        console.log(item.password);
        if (item.email === this.loggedinUser) {
          // console.log("user is valid")
          this.currentusername = item.firstName;
          this.currentuseremail = item.email;
          console.log("currentusername", this.currentusername);

        }

      });
    })


  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getUserListData() {
    this.userservice.getusr().subscribe((data: any) => {
      this.Users = data;
      const ELEMENT_DATA: PeriodicElement[] = this.Users;
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;

      console.log(this.Users);

    })
  }
  logout() {
    this.router.navigate(['/main/login']);
    localStorage.clear();

  }
  editUserOpen(element:any): void {
    const dialogRef = this.dialog.open(EdituserComponent, {
      width: 'auto',
      data: element
    });
   
    dialogRef.afterClosed().subscribe(result => {
    
      if(result=="YesSubmit"){
        this.getUserListData();
        window.location.reload();

      }
    });
}

  deleteSingleUser(id: any) {
    console.log("id:", id);
    if (confirm("are you sure")) {


      this.userservice.deleteSingleUser(id).subscribe(
        (res: any) => {

          this.getUserListData();


        })
    }


  }

}

export interface PeriodicElement {
  sr_no: number;
  firstName: string;
  email: string;
  action: string;

}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Student } from '../../app/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students: Student[];

  constructor(public navCtrl: NavController, private http: HttpClient) {
    this.http.get<Student[]>("https://localhost:5001/api/Student/List")
      .subscribe(data => {
        this.students = data;
      });
  }

}

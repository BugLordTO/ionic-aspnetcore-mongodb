import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GlobalVarible, Student } from '../../app/models';

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  student: Student;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.student = new Student();
  }

  Create() {
    this.http.post(GlobalVarible.host + "/api/Student/Create", JSON.stringify(this.student), GlobalVarible.httpOptions)
      .subscribe(data => {
        this.navCtrl.popToRoot();
      });
  }
}

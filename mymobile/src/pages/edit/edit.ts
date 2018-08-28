import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Student, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  student: Student;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.http.get<Student>(GlobalVarible.host + "/api/Student/Get/" + this.navParams.data.id)
      .subscribe(data => {
        this.student = data;
      });
  }

  Edit() {
    this.http.post(GlobalVarible.host + "/api/Student/Edit", JSON.stringify(this.student), GlobalVarible.httpOptions)
      .subscribe(data => {
        this.navCtrl.pop();
      });
  }
}

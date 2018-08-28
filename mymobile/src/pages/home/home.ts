import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Student, GlobalVarible } from '../../app/models';
import { DetailPage } from '../detail/detail';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students: Student[];

  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  Create() {
    this.navCtrl.push(CreatePage);
  }

  Detail(id: string) {
    this.navCtrl.push(DetailPage, { id: id });
  }

  ionViewDidEnter() {
    this.http.get<Student[]>(GlobalVarible.host + "/api/Student/List")
      .subscribe(data => {
        this.students = data;
      });
  }
}

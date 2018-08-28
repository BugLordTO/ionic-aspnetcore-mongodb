import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Student, GlobalVarible } from '../../app/models';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { EditPage } from '../edit/edit';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  student: Student;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public alertCtrl: AlertController) {
  }

  Edit() {
    this.navCtrl.push(EditPage, { id: this.student.id })
  }

  Delete() {
    const confirm = this.alertCtrl.create({
      title: "Delete '" + this.student.name + "' ?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.http.post(GlobalVarible.host + "/api/Student/Delete/" + this.student.id, {}, GlobalVarible.httpOptions)
              .subscribe(data => {
                this.navCtrl.popToRoot();
              });
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewDidEnter() {
    this.http.get<Student>(GlobalVarible.host + "/api/Student/Get/" + this.navParams.data.id)
      .subscribe(data => {
        this.student = data;
      });
  }
}

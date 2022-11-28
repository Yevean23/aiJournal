import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.scss'],
})
export class CreateHabitComponent implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onBookPlace() {
    if(!this.form.valid){
      return;
    }

    this.modalController.dismiss(
      { bookingData: {
        habitName: this.form.value['habit-name'],
        habitValue: this.form.value['habit-value'],
      }},
      'confirm'
    );
  }

  onCancel() {
    this.modalController.dismiss(null, 'cancel');
  }

}

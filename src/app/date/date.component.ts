import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,
  FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  incidentDate: moment.Moment;
  dateForm: FormGroup;
  test: string[];

  constructor(private builder: FormBuilder) {
    this.dateForm = this.builder.group({
      birthDate: moment().startOf('day'),
      time: ['00:00']
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.dateForm.value.birthDate);
    console.log(this.dateForm.value.time);
    this.test = this.dateForm.value.time.split(':');
    console.log(this.test);
    this.incidentDate = this.dateForm.value.birthDate.add(this.test[0], 'hours').add(this.test[1], 'minutes');
    console.log(this.incidentDate);
  }

}

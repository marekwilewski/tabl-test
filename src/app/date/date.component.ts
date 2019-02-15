import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl,
  FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  dateForm: FormGroup;

  constructor(private builder: FormBuilder) {
    this.dateForm = this.builder.group({
      birthDate: new Date(),
      time: new Date()
    });
   }

  ngOnInit() {
  }

}

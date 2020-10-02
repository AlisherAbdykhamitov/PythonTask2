import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {QuesService} from '../ques.service';
import { timer } from 'rxjs';




@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  duration = 600;
  correctAnswer = 0;
  answers = [];
  qns = [];
  qId: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  answer: number;
  timeLeft: number = 300;
  interval ;
  timeEllapsed = '00:00';
  startTime: Date;
  timer: any = null;
  questionForm = new FormGroup({

});

  constructor(public quesService: QuesService) { }

  ngOnInit(): void {
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.startTime = new Date();
    this.timeEllapsed = '00:00';
  }


startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


  changeQuestion(event){
    this.answers.push(event.target.value);
  }


  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  starTimer() {
    this.quesService.timer = setInterval(() => {
      this.quesService.seconds++;
      localStorage.setItem('seconds', this.quesService.seconds.toString());
    }, 1000);
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.duration) {
      this.submit();
    }
    this.timeEllapsed = this.parseTime(diff);
  }
  submit(){}
}

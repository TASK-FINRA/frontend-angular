import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  backendUrl = 'http://localhost:8080/getAlNumPhoneNumbers';
  title = 'demo-project';

  constructor(private http: HttpClient) {}
  result: any;
  results: any;
  phoneNumber: any;
  totalResults: any;
  count: number;
  // make a request to backend by appending the phoneNumber entered by the user and display first page list with size 10
  // tslint:disable-next-line:typedef
  getAlNumNumbers(phoneNumber) {

    this.http.get(this.backendUrl.concat('/').concat(phoneNumber).concat('/totalResults')).subscribe(data => {
      this.totalResults = data;
    });
    this.count = 0;
    this.http.get(this.backendUrl.concat('/').concat(phoneNumber).concat('?page=0&size=10')).subscribe(data => {
      this.results = data.toString().split(',');
      this.result = '';
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.results.length; i++){
        this.result = this.result.concat(this.results[i]);
        this.result = this.result.concat('\n');
      }
    });
  }

  // make a request to backend evertime when user hits next button and diplay the next page list with size 10
  // tslint:disable-next-line:typedef
  getNextSet(phoneNumber) {
    this.count = this.count + 1;
    this.http.get(this.backendUrl.concat('/').concat(phoneNumber).concat('?page=').concat(String(this.count)).concat('&size=10')).subscribe(data => {
      this.results = data.toString().split(',');
      console.log(this.results);
      this.result = '';
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.results.length; i++){
        this.result = this.result.concat(this.results[i]);
        this.result = this.result.concat('\n');
      }
    });

  }
}

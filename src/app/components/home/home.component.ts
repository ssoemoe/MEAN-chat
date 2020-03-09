import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  room: string;
  constructor(private _router: Router) {
    this.username = "";
    this.room = "";
  }

  ngOnInit(): void {

  }

  goToChatRoom() {
    this._router.navigate(["/chat", this.username, this.room]);
  }

}

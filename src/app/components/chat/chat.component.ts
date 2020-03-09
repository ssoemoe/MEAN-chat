import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ChatServiceService } from "../../services/chat-service.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  username: string = "";
  room: string = "";
  chats: Array<{ user: string, message: string }> = [];
  messageText: string;
  constructor(private _chatService: ChatServiceService, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      this.username = <string>params['username'];
      this.room = <string>params['room'];
    });

    this._chatService.joinRoom({ user: this.username, room: this.room });

    this._chatService.newUserJoined()
      .subscribe(data => this.chats.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.chats.push(data));
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.username, room: this.room, message: this.messageText });
    this.messageText = '';
  }

}

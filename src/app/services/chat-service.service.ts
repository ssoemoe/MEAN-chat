import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private _socket = io(environment.socketUrl);

  joinRoom(data) {
    this._socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this._socket.on('new-user', (data) => {
        observer.next(data);
      });
      return () => { this._socket.disconnect(); }
    });

    return observable;
  }

  sendMessage(data) {
    this._socket.emit('message', data);
  }

  newMessageReceived() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this._socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this._socket.disconnect(); }
    });

    return observable;
  }
}

import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
// import {Observable} from 'rxjs';
// import * as RX from 'rxjs';
import * as Rx from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
// private socket;
  constructor() {
  }
private subject: Rx.Subject<MessageEvent>;
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('sucsess connect:' + url );
    }
    return this.subject;
  }
  private create(url): Rx.Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer <MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
      }
     }
    };
    return Rx.Subject.create(observer, observable);
  }







  /*disconnect() {
    this.socket = io('ws://localhost:3000');
  }
  connect(): RX.Subject<MessageEvent> {
    this.socket = io('ws://localhost:3000');


    const observable = new Observable((obs) => {
      this.socket('message', (data) => {
        console.log(data);
        obs.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    const observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };
    return RX.Subject.create(observer, observable);
  }*/
}

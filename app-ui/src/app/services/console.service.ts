import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ConsoleService {
  private messages = new BehaviorSubject(["Console has been initialized"]);

  constructor() {}

  emitMessage(message: string) {
    const messages = this.messages.getValue();
    const updatedMessages = [...messages, message];
    this.messages.next(updatedMessages);
  }

  getMessages() {
    return this.messages.asObservable();
  }
}

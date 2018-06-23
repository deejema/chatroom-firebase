import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';
import { ChatLine } from '../chatline';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

	username: string;
	chatWindow: Observable<any>;
	
	constructor(private chatService: ChatService) { }

	ngOnInit() {
		this.getUsername();
		this.getChatWindow();
	}
	
	getChatWindow() : void {
		this.chatWindow = this.chatService.getChatLog();
		this.chatWindow.subscribe(console.log); // For debug purposes, displays JSON object from server
	}
	addMessage(message:string) : void {
		if(!this.username || !message) {return;}
		this.chatService.pushMessage(this.username, message);
	}
	clearMessages() : void {
		this.chatService.clearAllMessages();
	}
	/** Logs username to client; does not affect servers, only local client */
	getUsername(): void {
		this.username = this.chatService.getUsername();
	}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatServiceService } from "../../services/chat-service.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ChatServiceService
  ]
})
export class ChatModule { }

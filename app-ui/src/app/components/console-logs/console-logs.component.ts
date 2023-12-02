import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ConsoleService } from "src/app/services/console.service";
@Component({
  selector: "app-console-logs",
  templateUrl: "./console-logs.component.html",
  styleUrls: ["./console-logs.component.scss"],
})
export class ConsoleLogsComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport:
    | CdkVirtualScrollViewport
    | undefined;
  messages: Observable<string[]> | undefined;
  messagesSubscription: Subscription | undefined;

  constructor(private consoleService: ConsoleService) {}

  ngOnInit(): void {
    this.messages = this.consoleService.getMessages();
    this.messagesSubscription = this.messages.subscribe(() => {
      this.viewport?.scrollTo({ bottom: 0, behavior: "smooth" });
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ConsoleLogsComponent } from "./components/console-logs/console-logs.component";

import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { HttpClientModule } from "@angular/common/http";
import { LeftPanelComponent } from "./components/left-panel/left-panel.component";
import { RightPanelComponent } from "./components/right-panel/right-panel.component";
import { CanvasComponent } from "./components/canvas/canvas.component";
import { MatButtonModule } from "@angular/material/button";
import { SocketIoModule } from "ngx-socket-io";
import { environment } from "src/environments/environment";
import { BidItemComponent } from "./components/canvas/bid-item/bid-item.component";
import { ListedCarItemComponent } from "./components/right-panel/listed-car-item/listed-car-item.component";
import { NewBidDialogComponent } from "./components/dialogs/new-bid-dialog/new-bid-dialog.component";
import { NewCarDialogComponent } from "./components/dialogs/new-car-dialog/new-car-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsoleLogsComponent,
    LeftPanelComponent,
    RightPanelComponent,
    CanvasComponent,
    BidItemComponent,
    ListedCarItemComponent,
    NewBidDialogComponent,
    NewCarDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AppRoutingModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    ScrollingModule,
    HttpClientModule,
    SocketIoModule.forRoot({ url: `${environment.api}/bids` }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewBidDialogComponent, NewCarDialogComponent],
})
export class AppModule {}

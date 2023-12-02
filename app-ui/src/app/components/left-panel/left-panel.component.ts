import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { NewBidDialogComponent } from "../dialogs/new-bid-dialog/new-bid-dialog.component";
import { NewCarDialogComponent } from "../dialogs/new-car-dialog/new-car-dialog.component";

@Component({
  selector: "app-left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {
  isAuthenticated: Observable<boolean> | undefined;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  openNewBidDialog() {
    this.dialog.open(NewBidDialogComponent);
  }

  openNewCarDialog() {
    this.dialog.open(NewCarDialogComponent);
  }
}

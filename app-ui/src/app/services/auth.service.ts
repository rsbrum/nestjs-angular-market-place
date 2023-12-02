import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "../interfaces/user.interface";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs";
import { ConsoleService } from "./console.service";
import { API_ROUTES } from "../consts/routes.enum";
import { MESSAGES } from "../consts/messages.enum";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user = localStorage.getItem("user");
  private isAuthenticated = new BehaviorSubject<boolean>(!!this.user);
  private fakeUser = {
    username: "Fake Jhon",
    password: "123",
  };

  constructor(
    private httpClient: HttpClient,
    private consoleService: ConsoleService
  ) {}

  // hardcoded user for simplicity
  login() {
    this.httpClient
      .post<User>(`${environment.api}${API_ROUTES.AUTH_LOGIN}`, this.fakeUser)
      .pipe(
        map((res) => {
          localStorage.setItem("user", JSON.stringify(res));
          this.isAuthenticated.next(true);
          this.consoleService.emitMessage(MESSAGES.AUTH_LOGIN);
        })
      )
      .subscribe();
  }

  logout() {
    localStorage.removeItem("user");
    this.isAuthenticated.next(false);
    this.consoleService.emitMessage(MESSAGES.AUTH_LOGOUT);
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }

  getUser() {
    const user = localStorage.getItem("user") || "";
    if (user) return JSON.parse(user);
  }
}

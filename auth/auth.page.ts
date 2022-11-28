import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  login=true;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin(){
    this.authService.login();
    this.router.navigateByUrl('/tabs/journals');

  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    this.login = event.detail.value==='login';
  }
}

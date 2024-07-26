import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Role } from '../role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inner',
  templateUrl: './inner.component.html',
  styleUrl: './inner.component.scss'
})
export class InnerComponent {
  title = 'lms';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= false;
  isCollapsed = false;
  user: User | null = null;

  nav = [{name:"Home",path:"/home",icon:"account_balance"},{name:"Student",path:"/student",icon:"account_box"},
    {name:"Course",path:"/course",icon:"book"},{name:"Admin",path:"/admin",icon:"account_circle"},{name:"Enrollment",path:"/enrollment",icon:"card_membership"}]

  constructor(private observer: BreakpointObserver,
    public loadingService: LoadingService,
    public authService: AuthService,private router : Router
  ) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      this.isCollapsed = this.isMobile;
    });
    this.authService.getUser().subscribe(
      (res) => {
        // Successful login
        this.user = res;
      },
      (error) => {
        this.authService.logout();
      }
    );
    if(this.user?.role == Role.ROLE_ADMIN){
      this.nav = [{name:"Student",path:"/student",icon:"account_box"},
        {name:"Course",path:"/course",icon:"book"},{name:"Admin",path:"/admin",icon:"account_circle"},{name:"Enrollment",path:"/enrollment",icon:"card_membership"}]
      this.router.navigate(['/student']);

    }else if (this.user?.role == Role.ROLE_STUDENT){
      this.nav = [{name:"Home",path:"/home",icon:"account_balance"}]
      this.router.navigate(['/home']);

    }
  }

  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
    } else {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }


  closeSidenav() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }
}

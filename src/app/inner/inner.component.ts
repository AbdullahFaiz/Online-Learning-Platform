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

  nav = [{name:"Home",path:"/app/home",icon:"account_balance"},{name:"Student",path:"/app/student",icon:"account_box"},
    {name:"Course",path:"/app/course",icon:"book"},{name:"Admin",path:"/app/admin",icon:"account_circle"},{name:"Enrollment",path:"/app/enrollment",icon:"card_membership"}]

  constructor(private observer: BreakpointObserver,
    public loadingService: LoadingService,
    public authService: AuthService,private router : Router
  ) {}

  ngOnInit() {
    console.log("LMS")
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
      this.isCollapsed = this.isMobile;
    });
    this.authService.getUser().subscribe(
      (res) => {
        // Successful login
        this.user = res;
        console.log(this.user);
        if(this.user?.role === Role.ROLE_ADMIN){
          this.nav = [{name:"Student",path:"app/student",icon:"account_box"},
            {name:"Course",path:"/app/course",icon:"book"},{name:"Admin",path:"/app/admin",icon:"account_circle"},]
          this.router.navigate(['/app/student']);

        }else if (this.user?.role == Role.ROLE_STUDENT){
          this.nav = [{name:"Enrollment",path:"/app/enrollment",icon:"card_membership"}]
          this.router.navigate(['/app/enrollment']);

        }
      },
      (error) => {
        this.authService.logout();
      }
    );
    console.log(this.user);
    console.log(this.user?.role);
    console.log(this.user?.role === Role.ROLE_ADMIN);

  }

  logout(){
    this.authService.logout();
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

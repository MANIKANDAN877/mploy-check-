import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../core/services/user.service';
import { User, Record } from '../core/models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
    currentUser$: Observable<User | null>;
    records$: Observable<Record[]>;

    constructor(private userService: UserService, private router: Router) {
        this.currentUser$ = this.userService.currentUser$;
        this.records$ = this.userService.getRecords();
    }

    ngOnInit(): void {
        // Redirect if not logged in (basic guard simulation)
        // In a real app, use a CanActivate Guard
        this.currentUser$.subscribe(user => {
            if (!user) {
                this.router.navigate(['/']);
            }
        });
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}

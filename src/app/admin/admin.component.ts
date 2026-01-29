import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin.html',
    styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {
    users: User[] = [];
    isLoading = false;
    processingUserId: string | null = null;

    // Parameter to showcase delay mechanism
    delayMs = 1500;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.refreshUsers();
    }

    refreshUsers() {
        this.isLoading = true;
        this.userService.getUsers(1000).pipe(
            finalize(() => this.isLoading = false)
        ).subscribe(users => {
            this.users = users;
        });
    }

    deleteUser(userId: string) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.processingUserId = userId; // Show spinner for this action

            this.userService.deleteUser(userId, this.delayMs).pipe(
                finalize(() => this.processingUserId = null)
            ).subscribe(() => {
                this.users = this.users.filter(u => u.id !== userId);
                // Optionally show success message
            });
        }
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/']);
    }
}
// users = [];
// isLoading = true;

// ngOnInit() {
//   setTimeout(() => {
//     this.users = [
//       { username: 'admin', role: 'Admin' },
//       { username: 'user1', role: 'General User' },
//       { username: 'user2', role: 'General User' }
//     ];
//     this.isLoading = false;
//   }, 1500);
// }

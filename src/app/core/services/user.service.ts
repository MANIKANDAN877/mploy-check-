import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User, Role, Record, LoginRequest } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _currentUser = new BehaviorSubject<User | null>(null);
    currentUser$ = this._currentUser.asObservable();

    // Dummy Users
    private users: User[] = [
        { id: '1', username: 'admin', name: 'Super Admin', role: 'Admin', email: 'admin@nsqtech.com', avatar: 'https://i.pravatar.cc/150?u=admin' },
        { id: '2', username: 'user', name: 'John Doe', role: 'General User', email: 'user@nsqtech.com', avatar: 'https://i.pravatar.cc/150?u=user' },
        { id: '3', username: 'alice', name: 'Alice Smith', role: 'General User', email: 'alice@nsqtech.com', avatar: 'https://i.pravatar.cc/150?u=alice' },
        { id: '4', username: 'manikandan k s', name: 'Manikandan', role: 'Admin', email: 'mani@nsqtech.com', avatar: 'https://i.pravatar.cc/150?u=mani' },
        { id: '5', username: 'manikandan k s', name: 'Manikandan', role: 'General User', email: 'mani@nsqtech.com', avatar: 'https://i.pravatar.cc/150?u=mani' }
    ];

    // Dummy Records
    private records: Record[] = [
        { id: '101', title: 'Project Alpha', description: 'Initial Phase', status: 'Active', date: new Date(), accessLevel: 'General User' },
        { id: '102', title: 'System Upgrade', description: 'Server maintenance', status: 'Pending', date: new Date(), accessLevel: 'Admin' },
        { id: '103', title: 'Client Meeting', description: 'Requirements gathering', status: 'Completed', date: new Date(), accessLevel: 'General User' },
        { id: '104', title: 'Security Audit', description: 'Annual review', status: 'Active', date: new Date(), accessLevel: 'Admin' },
    ];

    constructor() {
        // Check local storage for persisted user (optional for this demo but good practice)
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this._currentUser.next(JSON.parse(storedUser));
        }
    }

    // Simulate Logic: ID + Password + Role
    login(request: LoginRequest): Observable<User> {
        // Simulate delay
        return of(true).pipe(
            delay(1000), // 1s delay for realism
            map(() => {
                const user = this.users.find(u => u.username === request.username && u.role === request.role); // Simple auth check

                if (user) {
                    // Specific check for manikandan k s
                    if (user.username === 'manikandan k s' && request.password !== 'Manikolapan877@') {
                        throw new Error('Invalid Password');
                    }

                    this._currentUser.next(user);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                } else {
                    throw new Error('Invalid Credentials or Role Mismatch');
                }
            })
        );
    }

    logout() {
        this._currentUser.next(null);
        localStorage.removeItem('currentUser');
    }

    // For General User Dashboard
    getRecords(): Observable<Record[]> {
        return of(this.records).pipe(delay(800));
    }

    // For Admin: Get All Users
    getUsers(delayMs: number = 1000): Observable<User[]> {
        return of(this.users).pipe(delay(delayMs));
    }

    // For Admin: Delete User
    deleteUser(userId: string, delayMs: number = 1500): Observable<boolean> {
        return of(true).pipe(
            delay(delayMs),
            tap(() => {
                this.users = this.users.filter(u => u.id !== userId);
            })
        );
    }
}

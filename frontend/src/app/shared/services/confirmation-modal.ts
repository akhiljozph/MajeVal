// src/app/shared/services/confirmation-modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ConfirmationConfig {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmationModalService {
    private configSubject = new BehaviorSubject<ConfirmationConfig | null>(null);
    config$ = this.configSubject.asObservable();

    private resultSubject = new Subject<boolean>();

    open(config: ConfirmationConfig): Observable<boolean> {
        this.configSubject.next({
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            type: 'info',
            ...config
        });
        this.resultSubject = new Subject<boolean>();
        return this.resultSubject.asObservable();
    }

    confirm(): void {
        this.configSubject.next(null);
        this.resultSubject.next(true);
        this.resultSubject.complete();
    }

    cancel(): void {
        this.configSubject.next(null);
        this.resultSubject.next(false);
        this.resultSubject.complete();
    }
}
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NotificationType } from '../models/constants';

@Injectable({
    providedIn: 'root'
})
export class SystemService {
    public stateStorage: string = "cookie";
    public notificationType = new NotificationType();
    public subscriptions = new Subscription();
    public kycStatus = new BehaviorSubject<boolean | null>(null);
    //Get current year for copyright label
    currentYear = new Date().getFullYear();

    constructor(public Translator: TranslateService, private messageService: MessageService,
        private http: HttpClient, private router: Router, private datePipe: DatePipe) { }

    showError(message:any) {
        this.messageService.clear();
        this.messageService.add({ severity: this.notificationType.error, summary: this.Translator.instant('lblError'), detail: this.Translator.instant(message) });
    }
    showWarning(message:any) {
        this.messageService.clear();
        this.messageService.add({ severity: this.notificationType.warn, summary: this.Translator.instant('lblWarn'), detail: this.Translator.instant(message) });
    }
    showSuccess(message:any) {
        this.messageService.clear();
        this.messageService.add({ severity: this.notificationType.success, summary: this.Translator.instant('lblSuccess'), detail: this.Translator.instant(message) });
    }

    convertDateforSubmition(date:any){
        if(date !=''){
            return this.datePipe.transform(date, 'MM/dd/yyyy');
        }
        else{
            return '';
        }
    }

}

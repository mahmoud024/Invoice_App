import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent {
    constructor(private as: AuthService, private router: Router, public translate: TranslateService) {
        this.currentLang = localStorage.getItem('currentLang') || 'en';
        this.translate.use(this.currentLang)
  }

  logoutt() {
    this.as.logout().then(() => {
        console.log("out");
        this.router.navigate(['/login'])
      }
    )
  }

    mood = true;

    DarkMood() {
        return this.mood = !this.mood;
    }

    currentLang: string;

    changeCurrrentLang(lang: string) {
        this.translate.use(lang);
        localStorage.setItem('currentLang', lang);
    }

    toggleLanguage() {
        // Get the current language
        const currentLang = this.translate.currentLang;

        // Toggle between English and Arabic
        const newLang = currentLang === 'en' ? 'ar' : 'en';

        // Use the new language
        this.changeCurrrentLang(newLang);
    }

}

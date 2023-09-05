import { Component } from '@angular/core';
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [
        trigger('router', [
                transition('0 => 1', [
                    group([
                        query(':enter', [
                            style({
                                transform: 'translateX(-100%)'
                            }),
                            animate(5500, style({
                                transform: 'translateX(0)'
                            }))
                        ]),
                        query(':leave', [
                            style({
                                transform: 'translateX(0)'
                            }),
                            animate(5500, style({
                                transform: 'translateX(-100%)'
                            }))
                        ])
                    ])

                ]),

            ],
        )
    ]
})
export class AppComponent {

}

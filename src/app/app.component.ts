import { Component, OnInit } from '@angular/core';
import { GamestateService } from './services/gamestate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  result : string = '';

  constructor(private gameService : GamestateService){}

  ngOnInit(): void {
      this.gameService.endGame$.subscribe({
        next: (value) => {
          if(value){
            this.result = value;
          }
        },
        error: () => {
          console.error('error');
        }
      })

      this.gameService.resetGame$.subscribe((reset) => {
        if(reset){
          this.result = '';
        }
      })
   }

}

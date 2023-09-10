import { Component, OnInit } from '@angular/core';
import { GamestateService } from 'src/app/services/gamestate.service';

@Component({
  selector: 'app-gamebar',
  templateUrl: './gamebar.component.html',
  styleUrls: ['./gamebar.component.scss']
})
export class GamebarComponent implements OnInit {
  title : string = 'tic tac toe'
  currentPlayer : string = ''

  constructor(private gameState : GamestateService) { }

  ngOnInit(): void {
    this.gameState.selectedPlayer$.subscribe(player => this.currentPlayer = player)
  }

  resetGame() {
    this.gameState.setResetGame(true)
  }
}

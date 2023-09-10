import { Component, OnInit } from '@angular/core';
import { SquareState } from '../square/square.component';
import { GamestateService } from 'src/app/services/gamestate.service';

export interface BoardItem {
  id: number;
  state: SquareState
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardItems : BoardItem[] = []; 
  constructor(private gameService: GamestateService){
    
  }

  ngOnInit() : void {
    this.initGame()

    this.gameService.currentNumberOfElements$.subscribe({
      next: (count) => {
        if(count < 5 )return;
        const winner = this.checkWinner();
        if(winner){
          this.gameService.setEndGameString(`Player ${winner} has won!`)
        }
        if(!winner && count === 9){
          this.gameService.setEndGameString(`This is a draw!`)
        }
      },
      error: (err) => {
        console.error(err);
      },
    });

    this.gameService.resetGame$.subscribe(reset => reset && this.initGame());
  }

  initGame () {
    this.boardItems = Array(9).fill(null).map((_,i)=>({
      id : i,
      state : null
    }));
    this.gameService.setResetGame(false)
    this.gameService.resetCurrentPlayer();
    this.gameService.resetElementsOnBoard();
  }

  checkWinner() : SquareState | boolean{
    return this.checkColumns() || this.checkRows() || this.checkDiagonals();
  }

  checkRows() : SquareState | boolean{
    for(let i = 0; i <6; i+=3){
      if(this.boardItems[i].state === null) continue;
      if(this.boardItems[i].state === this.boardItems[i+1].state 
        && this.boardItems[i+1].state === this.boardItems[i+2].state){
        return this.boardItems[i].state;
      }
    }
    return false;
  }

  checkColumns() : SquareState | boolean{
    for(let i = 0; i <3; i++){
      if(this.boardItems[i].state === null) continue;
      if(this.boardItems[i].state === this.boardItems[i+3].state 
        && this.boardItems[i+3].state === this.boardItems[i+6].state){
        return this.boardItems[i].state;
      }
    }
    return false;
  }

  checkDiagonals() : SquareState | boolean{
    if(this.boardItems[0].state === this.boardItems[4].state 
      && this.boardItems[4].state === this.boardItems[8].state 
      && this.boardItems[0].state !== null){
      return this.boardItems[0].state;
    }

    if(this.boardItems[2].state === this.boardItems[4].state 
      && this.boardItems[4].state === this.boardItems[6].state
      && this.boardItems[2].state!== null){
      return this.boardItems[2].state;
    }
    return false;
  }

  handleChange(squareState : BoardItem) : void{
    const index = this.boardItems.findIndex(item => item.id === squareState.id)
    this.boardItems[index].state = squareState.state;
    this.gameService.addElementOnBoard()
    console.log(squareState);
  }
}

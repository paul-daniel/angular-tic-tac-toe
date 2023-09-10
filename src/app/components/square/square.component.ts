import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GamestateService } from 'src/app/services/gamestate.service';
import { BoardItem } from '../board/board.component';

export type SquareState = '🌕' | '⚔️' | null;

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  @Input() squareState : SquareState = null;
  @Input() id : number = -1;
  @Output() squareStateChange = new EventEmitter<BoardItem>()

  endgame : string = "";

  constructor(private gameService: GamestateService){
  }

  ngOnInit() : void{
    this.gameService.endGame$.subscribe(value =>{
      if(value){
        this.endgame = value;
        console.log("value", value)
      }
    });
  }

  handleClick(){
    if(this.squareState !== null || this.endgame !== "") return;
    this.squareState = this.gameService.getCurrentPlayer();
    this.gameService.switchPlayers();
    this.squareStateChange.emit({
      id : this.id,
      state : this.squareState
    });
  }
}

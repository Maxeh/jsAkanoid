import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {
  @Output() startGame = new EventEmitter();

  onStartGameClick() {
    this.startGame.emit();
  }
}

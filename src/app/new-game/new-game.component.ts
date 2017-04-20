import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html'
})
export class NewGameComponent {
  @Output() startGame = new EventEmitter();
  music: boolean = true;

  onStartGameClick() {
    this.startGame.emit(this.music);
  }
}

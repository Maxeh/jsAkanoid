import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-up',
  templateUrl: './level-up.component.html'
})
export class LevelUpComponent {
  @Output() continueGame = new EventEmitter();
  @Input() music;
  @Input() level;
  @Input() maxLevel;

  onContinueGameClick() {
    this.continueGame.emit(this.music);
  }

  onPlayAgainClick() {
    window.location.reload();
  }
}

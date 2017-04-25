export class Settings {
  public static CANVAS_WIDTH: number = 940;
  public static CANVAS_HEIGHT: number = 550;
  public static BRICK_WIDTH: number = 47;
  public static BRICK_HEIGHT: number = 30;
  public static BALL_RADIUS: number = 8;

  // each entry defines a level
  private static gameField = [
    [
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,2,0,1,1,0,0,3,3,3,0,0,0,0,1,1,1,0,0,0],
      [1,1,1,1,1,0,0,0,0,2,2,0,0,0,1,1,1,1,1,1],
      [1,2,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1]
    ],
    [
      [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
      [1,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
      [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    [
      [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
      [1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
  ];

  public static getNumberOfLevels() {
    return Settings.gameField.length;
  }

  public static getGameField(level: number) {
    level--; // for array
    if (level < Settings.gameField.length)
      return Settings.gameField[level];
    else return null;
  }
}

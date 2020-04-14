import { IDrawable } from '../types/gameobjects.js'
import { Canvas } from './canvas.js'

export class Board {

    public static bg_color: string = "#000A1F"
    public static grid_color: string = "#001F5C"

    public static block_size = 8
    public static height = 0
    public static width = 0

    public static grid: IDrawable[][]

    public static remove_enemy_parts_at(position: Position) {
        Board.grid[position.X][position.Y] = null
    }

    public static init() {

        Board.height = Canvas.height / Board.block_size
        Board.width = Canvas.width / Board.block_size

        Board.grid = new Array(Board.width)
        for (var i = 0, ii = Board.width; i != ii; ++i) {

            Board.grid[i] = new Array(Board.height)
        }
    }

    public static draw() {

        Canvas.fill(Board.bg_color)

        for (var cx = 0; cx < Board.width; cx++) {

            for (var cy = 0; cy < Board.height; cy++) {

                if (Board.grid[cx][cy]) { Board.grid[cx][cy].draw() }
            }
        }
    }
}

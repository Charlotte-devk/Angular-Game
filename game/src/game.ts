import { ClockTick, Timer} from './types/index.js'
import { Player, Enemy } from './objects/index.js'
import { Board, Canvas, Console, Controls, GUI } from './ux/index.js'

export class Game {

    static clock: Timer
    static player: Player
    static is_running: boolean = false

    static init() {

        Canvas.init(<HTMLCanvasElement>document.querySelector("canvas"))

        let body: HTMLBodyElement = document.querySelector("body")
        body.onkeyup = Controls.on_key_up

        Game.ready()
    }

    static ready() {

        Console.init()
        Board.init()
        Board.draw()
        GUI.init()
        GUI.draw()

        Game.player = new Player({ name:"Steve" })
        Game.clock = new Timer(GameDifficulty.DIFFICULT, 0, Game.on_clock_tick)
    }

    static start() {

        if (Game.is_running) { return }
        if (Game.clock.is_paused) { return Game.pause() }

        Game.is_running = true
        Game.clock.start()
    }

    static pause() {

        if (Game.clock.is_paused) {
            Game.is_running = true
            return Game.clock.resume()
        }

        Game.clock.pause()
        Game.is_running = false
        GUI.draw()
    }

    static reset() {

        Game.clock && Game.clock.stop()
        Game.is_running = false
        Game.ready()
    }

    static on_clock_tick() {

        Game.player.process_turn()

        if (Game.clock.tick == ClockTick.EVEN) {

            // TODO: Move this to item randomizer class
            Game.coinCounter += 1
            if (Game.coinCounter >= 2) {

                Game.coinCounter = 0

                if (!Math.floor(Math.random() + .5)) {

                    var probability = (Coin.coins_active + .5) / 5
                    if (!Math.floor(Math.random() + probability)) {

                        if (!Math.floor(Math.random() + .8)) {
                            var coin = Coin.create_random()
                            Board.place_at_random(coin)
                        }
                        else {

                            if (!Math.floor(Math.random() + .5)) {
                                var slowPlayer = new SlowPlayer()
                                Board.place_at_random(slowPlayer)
                            }
                            else {
                                var fastPlayer = new FastPlayer()
                                Board.place_at_random(fastPlayer)
                            }
                        }
                    }
                }
            }
        }

        Board.draw()
        GUI.draw()
    }
}

Game.init()

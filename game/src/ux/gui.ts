import { Game } from '../game.js'

export abstract class GUI {

    static header: HTMLElement
    static monster_hp: HTMLElement
    static hp: HTMLElement
    static mp: HTMLElement

    static init() {

        GUI.header = <HTMLElement>document.querySelector("header")
        GUI.monster_hp = <HTMLElement>document.querySelector("#monster_hp")
        GUI.hp = <HTMLElement>document.querySelector("#player-hp")
        GUI.mp = <HTMLElement>document.querySelector("#player-mp")
    }

    static draw() {

        GUI.monster_hp.innerText = Game.is_running
            ? "BOSS HP: " + Game.monster.hp
            : ""

        GUI.hp.innerText = Game.is_running
            ? "Score: " + Game.player.hp
            : ""
    }
}

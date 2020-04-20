import { IPlayerObject, IEnemyObject , Position } from '../types/index.js'
import { Board } from '../ux/index.js'
import { Game } from '../game.js'
import { IDrawable } from '../types/gameobjects.js';

export class Enemy implements IEnemyObject {
  public name: string = "Balrok"
  public monster_hp: number = 500;
  public monster_atk: number = 10;
  public is_alive: boolean = false;
  public body: Array<Position>;

  public constructor(){
    this.is_alive = true;
  }

  public attack(): number{
    return this.monster_atk;
  }

  public get_hit(damage:number){
      hp -= damage;
  }
  public die(){
    if(hp <= 0){
      is_alive = false;
    }
    else{
      is_alive = true;
    }
  }
}

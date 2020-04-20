import { IPlayerObject, IEnemyObject } from '../types/index.js'
import { Board } from '../ux/index.js'
import { Game } from '../game.js'
import { IDrawable } from '../types/gameobjects.js';

export class Player implements IPlayerObject {

public class Player {
  public name: string = "";
  public hp: number = 100;
  public mp: number = 100;
  public atk: number = 25;
  public is_alive: boolean = false;
  public is_attacking: boolean = false;
  public is_defending: boolean = false;
  public hit_detected: boolean = false;

  constructor(name: string){
    this.name = name;
    this.is_alive = true;
  }

  public attack(): number{
    return atk;
  }
  public defend(){
    is_defending = true;
  }

  public get_hit(damage:number){
    if(is_defending){
      hp -= damage/2;
      is_defending = false;
    }
    else{
      hp -= damage;
    }
  }
  public die(){
    if(hp <= 0){
      is_alive = false;
    }
    else{
      is_alive = true;
    }
  }
  public process_turn() {

		// Don't process if dead
		if (!this.is_alive) { return }

		this.hit_detected = false

		if (is_attacking) {
      var enemy: IEnemyObject = <IEnemyObject>Board

			if (Board.grid[pos.X][pos.Y]) {
				var object: IGameObject = <IGameObject>Board.grid[pos.X][pos.Y]
				object.handle_collision(this)
			}
		}

		if (!this.is_alive) { this.destroy() }
		else if (!this.hit_detected) { this.update_board(pos) }
	}

	private update_board(pos: Position) {

		let lastPosition = Position.copy(this.position)
		for (var i = 0, ii = this.segments.length; i != ii; i++) {

			let segment = this.segments[i]
			let newPosition = (i == 0)
				? pos
				: lastPosition

			lastPosition = segment.position
			Board.move_object(segment, newPosition)
		}

		if (this.segments.length <= this.max_length) {

			let newSegment = new SnakeSegment(lastPosition)
			this.segments.push(newSegment)

			Board.place_object(newSegment, lastPosition)
		}
	}

	private destroy() {

		for (var i = 0, ii = this.segments.length; i != ii; i++) {
			Board.remove_object_at(this.segments[i].position)
		}

		this.segments = [this]
		this.max_length = Snake.default_length
	}
}

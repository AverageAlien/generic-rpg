import { Injectable } from '@angular/core';
import { Vector } from '../core/geometryObjects';
import { GameObject, Entity } from '../core/gameplayObjects';
import { BoxCollider } from '../core/physicsObjects';
import { Rectangle } from '../core/drawableObjects';
import { PlayerController } from '../core/controllerObjects';

@Injectable({
  providedIn: 'root'
})
export class EntitySpawnerService {
  public CreateStaticBlock(
    position: Vector,
    size: Vector = new Vector(10, 10),
    color: string = 'gray',
    outlineColor: string = null,
    outlineSize: number = 0
  ): GameObject {
    const gameObject = new GameObject(position);
    gameObject.collider = new BoxCollider(true, true, gameObject, size);
    gameObject.texture = new Rectangle(gameObject, color, size, outlineColor, outlineSize);

    return gameObject;
  }

  public CreatePlayer(playerName: string, controller: PlayerController): Entity {
    const entity = new Entity(playerName, 100, 50, 1, new Vector(150, 150));
    const playerSize = new Vector(20, 20);
    entity.collider = new BoxCollider(false, true, entity, playerSize);
    entity.texture = new Rectangle(entity, 'red', playerSize);

    console.log(controller);
    entity.controller = controller;

    return entity;
  }
}

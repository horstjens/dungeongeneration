/**
 * Open System constructor
 *
 * @class Roguelike.Systems.Open
 * @classdesc The renderer draws entities onto the screen
 *
 * @param {int} game - Reference to the currently running game
 */
Roguelike.Systems.Open = function(game) {

	/**
	 * @property {string} name - The name of this system. This field is always required!
	 */
	this.name = 'open';

	/**
	 * @property {Roguelike.Game} game - Reference to the current game object
	 */
	this.game = game;

};

Roguelike.Systems.Open.prototype = {

	/**
	 * Function that gets called when the game continues one tick
	 * @protected
	 */
	update: function() {

		//Then loop through all keyboardControl Entities and check the user input, and handle accordingly
		var entities = this.game.map.entities.getEntities("canOpen", "sprite", "position", "collide");

		//Loop through all matching entities
		for(var i = 0; i < entities.length; i++){

			//Get the components from the current entity and store them temporarily in a variable
			var canOpenComponent = entities[i].getComponent("canOpen");
			var spriteComponent = entities[i].getComponent("sprite");
			var positionComponent = entities[i].getComponent("position");
			var collideComponent = entities[i].getComponent("collide");

			//Check if any actions need to be performed on this openable entity
			if(canOpenComponent.actions.length !== 0){

				//Loop through the actions
				for(var a = canOpenComponent.actions.length; a >= 0; a--){

					//Pop the action from the "stack"
					var currentAction = canOpenComponent.actions.pop();

					//Action to open the door
					if(currentAction === "open"){

						//Change the door's state to open
						canOpenComponent.state = "open";

						//Change the sprite to open
						spriteComponent.color = "#ccc";

						//Make sure the collide component doesn't say it collides anymore
						collideComponent.collide = false;

						//Make sure the tile that this openable entity is on doesn't block light anymore
						this.game.map.tiles[positionComponent.y][positionComponent.x].blockLight = false;

					}

				}

			}

		}

	}

};
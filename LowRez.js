var construct = function(game, parent){
	Phaser.Plugin.call(this, game, parent);
	this._options = {
		scale:2,
		texture: null
	};
	this.game = game;
	this._context = null;
	this._canvas = null;
	this._width = 0;
	this._height = 0;
	this._texture = null;
}

var p = construct.prototype = Object.create(Phaser.Plugin.prototype);
p.constructor = construct;

p.init = function(options){
	this._options = Phaser.Utils.extend(false, this._options, options);
    
    this.game.canvas.style['display'] = 'none';

    this._canvas = Phaser.Canvas.create({},this.game.width * this._options.scale, this.game.height * this._options.scale);
    this._context = this._canvas.getContext('2d');
    Phaser.Canvas.addToDOM(this._canvas,this.game.canvas.parentNode);
    Phaser.Canvas.setSmoothingEnabled(this._context, false);
    this._width = this._canvas.width;
    this._height = this._canvas.height;

    this.setTexture(this._options.texture);

}

p.setTexture = function(texture){
	if(texture){
    	this._texture = Phaser.Canvas.create({},this._width, this._height);
    	var ctx = this._texture.getContext('2d');
    	var pattern = ctx.createPattern(texture,"repeat");
    	ctx.globalAlpha = 0.1;
    	ctx.fillStyle = pattern;
  		ctx.fillRect(0,0,this._width, this._height);

    }else{
    	this._texture = null;
    }
}

p.postRender = function(){
	this._context.globalCompositeOperation = "source-over";
	this._context.drawImage(this.game.canvas, 0, 0, this.game.width, this.game.height, 0, 0, this._width, this._height);
	if(this._texture){
		this._context.globalCompositeOperation = "screen";
		this._context.drawImage(this._texture, 0, 0, this._texture.width, this._texture.height, 0, 0, this._width, this._height);
	}
}

module.exports = construct;
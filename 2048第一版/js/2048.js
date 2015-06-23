function game2048(container){
	this.container = container;
	this.tiles = new Array(16);
}

game2048.prototype = {
	init: function(){
		document.getElementById('start').style.display = "none";
		for(var i = 0, len = this.tiles.length; i < len; i++){
			this.tiles[i] = document.createElement('div');
			this.tiles[i].setAttribute('val', 0);//设置属性值
			this.tiles[i].className = 'tile tile0';
			this.container.appendChild(this.tiles[i]);
		}
		this.randomTile();
		this.randomTile();
	},
	setTileVal: function(tile, val){
		tile.className = 'tile tile' + val;
		tile.setAttribute('val', val);
		tile.innerHTML = val > 0 ? val : '';
	},
	randomTile: function(){
		var random = [];
		for(var i = 0, len = this.tiles.length; i < len; i++){
			if(this.tiles[i].getAttribute('val') == 0){
				random.push(this.tiles[i]);
			}
		}
		var rTile = random[Math.floor(Math.random() * random.length)];
		rTile.className = 'tile tile' + 2;
		rTile.setAttribute('val', Math.random() < 0.8 ? 2 : 4);
		var val = Math.random() < 0.8 ? 2 : 4;
		rTile.innerHTML = val > 0 ? val : '';
	},
	move: function(keychar){
		var j;
		switch(keychar){
			case 'W':
				for(var i = 4; i < this.tiles.length; i++){
					j = i;
					while( j >= 4){
						this.merge(this.tiles[j - 4], this.tiles[j]);
						j -= 4;
					}
				}
				break;
			case 'S':
				for(var i = 11; i >= 0 ; i--){
					j = i;
					while( j <= 11){
						this.merge(this.tiles[j + 4], this.tiles[j]);
						j += 4;
					}
				}
				break;
			case 'A':
				for(var i = 1; i < this.tiles.length; i++){
					j = i;
					while( j % 4 != 0){
						this.merge(this.tiles[j - 1], this.tiles[j]);
						j -= 1;
					}
				}
				break;
			case 'D':
				for(var i = 14; i >= 0; i--){
					j = i;
					while( j % 4 != 3){
						this.merge(this.tiles[j + 1], this.tiles[j]);
						j += 1;
					}
				}
				break;
		}
		this.randomTile();
	},
	merge: function(prevTile, currTile){
		var prevVal = prevTile.getAttribute('val');
		var currVal = currTile.getAttribute('val');
		if( currVal != 0 ){
			if( prevVal == 0){
				this.setTileVal(prevTile, currVal);
				this.setTileVal(currTile, 0);
			}else if(prevVal == currVal){
				this.setTileVal(prevTile, prevVal * 2);
				this.setTileVal(currTile, 0);
			}
		}
		if(game2048.isOver()){
			game2048.finish();
		}else{
			game2048.score();
		}
	},
	isEqual: function(tile1, tile2){
		return tile1.getAttribute('val') == tile2.getAttribute('val');
	},
	isMax: function(){
		for(var i = 0; i < this.tiles.length; i++){
			if(this.tiles[i].getAttribute('val') == 2048){
				return true;
			}
		}
	},
	isOver: function(){
		for(var i = 0, len = this.tiles.length; i < len; i++){
			if(this.tiles[i].getAttribute('val') == 0) return false;
			if(i % 4 != 3){
				if(this.isEqual(this.tiles[i], this.tiles[i + 1])){
					return false;
				}
			}
			if(i <= 11){
				if(this.isEqual(this.tiles[i], this.tiles[i + 4])){
					return false;
				}
			}
		}
		return true;
	},
	finish: function(){
		if(confirm("GAME OVER,try again?")){
			var startBtn = document.getElementById("start");
			startBtn.style.display = 'block';
			for(var i = 0, len = this.tiles.length; i < len; i++){
				this.container.removeChild(this.tiles[i]);
			}
		}else{
			var finishBtn = document.getElementById('start');
			finishBtn.innerHTML = 'GAME OVER';
			finishBtn.style.display = 'block';
		}
	},
	score: function(){
		var score = [];
		for(var i =0; i < this.tiles.length; i++){
			if(this.tiles[i].getAttribute('val') != 0){
				score.push(this.tiles[i].getAttribute('val'));
			}
		}
		var getScore = document.getElementById('score');
		score = score.sort(function(a,b){
			return a - b;
		}).reverse();
		console.log(score);
		getScore.innerHTML = score[0];
	}
}

var game, startBtn, newgamebutton;

window.onload = function(){
	startBtn = document.getElementById('start'); 
	startBtn.onclick = function(){
		this.style.display = 'none';
		game2048.init();
	}
}

window.onkeydown =  function(e){
	var e = window.e || event;
	var currkey = e.keyCode || e.which || e.charCode;
	var keychar = String.fromCharCode(currkey);
	if(['W', 'S', 'A', 'D'].indexOf(keychar) > -1){
		e.preventDefault();
		game2048.move(keychar);
	}
}
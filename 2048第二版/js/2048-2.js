var game = function(container, grids){
	this.container = container;
	var sqrt = Math.sqrt(grids);
	if(sqrt != parseInt(sqrt)){
		alert("参数不合法，请输入一个能开平方的数字!");
		this.grid = parseInt(sqrt);
	}else{
		this.grid = sqrt;
	}
	this.tiles  = [];
	this.score = 0;
	this.init();
}
game.prototype = {
	init: function(){
		container.innerHTML = '';
		for(var i = 0; i < this.grid; i++){
			for(var j = 0; j < this.grid; j++){
				if(!this.tiles[i]){
					this.tiles[i] = [];
				}
				this.tiles[i][j] = document.createElement('div');
				this.tiles[i][j].className = 'grid-cell';
				this.tiles[i][j].id = 'grid-cell-' + i + '-' + j;
				this.tiles[i][j].style.top = i * 120 + 20 + 'px';
				this.tiles[i][j].style.left = j * 120 + 20 + 'px'; 
				this.container.appendChild(this.tiles[i][j]);
			}
		}
	},
	startGame: function(){
		this.init();
		this.randomTile();
		this.randomTile();
		this.move();
	},
	randomTile: function(){
		var randomArr = [];
		for(var i = 0; i < this.grid; i++){
			for(var j = 0; j < this.grid; j++){
				if(!this.tiles[i][j].innerHTML){
					randomArr.push(this.tiles[i][j]);
				}
			}
		}
		if(randomArr[0]){
			var tile = randomArr[Math.floor(Math.random() * randomArr.length)];
			var val = Math.random() < 0.6 ? 2 : 4;
			tile.innerHTML = val;
			tile.className  += ' tile' + val;
		}else{
			return false;
		}
	},
	move: function(){
		var self = this;
		window.onkeydown =  function(e){
			var e = e || window.event;
			var currkey = e.keyCode || e.which || e.charCode;
			if([37, 38, 39, 40].indexOf(currkey) > -1){
				e.preventDefault();
				switch(currkey){
					case 37:
						self.merge('left');
						break;
					case 38:
						self.merge('up');
						break;
					case 39:
						self.merge('right');
						break;
					case 40:
						self.merge('down');
						break;
					default:
						break;
				}
			}
		}
	},
	merge: function(direction){
		switch(direction){
			case 'left':
				for(var row = 0; row < this.grid; row++){
					var list = [];
					for(var cell = 0;cell < this.grid;cell++){
						if(!!this.tiles[row][cell].innerHTML){
							list.push(this.tiles[row][cell].innerHTML);
							this.tiles[row][cell].innerHTML = '';
							this.tiles[row][cell].className = 'grid-cell';
						}
					}
					if(list[0]){
						for(var i = list.length - 1;i >= 0;i--){
							if(!!list[i + 1] && list[i] === list[i + 1]){
								this.score += list[i] - 0;
								list[i] = list[i] * 2 +''; 
								list.splice(i+1,1);
								break;
							}
						}
						for(var i = 0, len = list.length;i < len;i++){
							this.tiles[row][i].innerHTML = list[i];
							this.tiles[row][i].className = "grid-cell tile" + list[i];
						}
					}
				}
				break;
			case 'right':
				for(var row = 0; row < this.grid; row++){
					var listRight = [];
					for(var cell = 0; cell < this.grid; cell++){
						if(!!this.tiles[row][cell].innerHTML){
							listRight.push(this.tiles[row][cell].innerHTML);
							this.tiles[row][cell].innerHTML = '';
							this.tiles[row][cell].className = "grid-cell";
						}
					}
					if(listRight[0]){
						for(var k = 0; k < listRight.length; k++){
							if(!!listRight[k + 1] && listRight[k] === listRight[k + 1]){
								this.score += listRight[k + 1] - 0;
								listRight[k + 1] = listRight[k + 1] * 2 + '';
								listRight.splice(k ,1);
								break;
 							}
						}
						for(var r = listRight.length - 1,j = this.grid - 1; r >= 0; r--, j--){
							this.tiles[row][j].innerHTML = listRight[r];
							this.tiles[row][j].className = "grid-cell  tile" + listRight[r]; 
						}
					}
				}
				break;
			case 'up':
				for(var cell = 0; cell < this.grid; cell++){
					var listUp = [];
					for(var row = 0; row < this.grid; row++){
						if(!!this.tiles[row][cell].innerHTML){
							listUp.push(this.tiles[row][cell].innerHTML);
							this.tiles[row][cell].innerHTML = '';
							this.tiles[row][cell].className = 'grid-cell';
						}
					}
					if(listUp[0]){
						for(var k = listUp.length - 1; k >= 0; k--){
							if(!!listUp[k - 1] && listUp[k - 1] === listUp[k]){
								this.score += listUp[k - 1] - 0;
								listUp[k - 1] = listUp[k - 1] * 2 + '';
								listUp.splice(k , 1);
								break;
							}
						}
						for(var j = 0,len = listUp.length; j < len; j++){
							this.tiles[j][cell].innerHTML = listUp[j];
							this.tiles[j][cell].className = 'grid-cell tile' + listUp[j];
						}
					}
				}
				break;
			case 'down' :
				for(var cell = 0; cell < this.grid; cell++){
					listDown = [];
					for(var row = 0; row < this.grid; row++){
						if(!!this.tiles[row][cell].innerHTML){
							listDown.push(this.tiles[row][cell].innerHTML);
							this.tiles[row][cell].innerHTML = '';
							this.tiles[row][cell].className = 'grid-cell';
						}
					}
					if(listDown[0]){
						for(var k = 0; k < listDown.length; k++){
							if(!!listDown[k + 1] && listDown[k + 1] === listDown[k]){
								this.score += listDown[k + 1] - 0;
								listDown[k + 1] = listDown[k + 1] * 2 + '';
								listDown.splice(k, 1);
								break;
							}
						}
						for(var j = listDown.length - 1, l = this.grid - 1; j >= 0; j--, l--){
							this.tiles[l][cell].innerHTML = listDown[j];
							this.tiles[l][cell].className = 'grid-cell tile' + listDown[j];
						}
					}
				}
				break;	
		}
		this.setScore();
		if(!this.isOver()){
			this.randomTile();
		}else{
			alert('game over!');
			this.init();
		}	
	},
	setScore : function(){
		document.getElementById('score').innerHTML = this.score;
	}, 
	isOver: function(){
		for(var i = 0; i < this.grid; i++){
			for(var j = 0; j < this.grid; j++){
				if(!this.tiles[i][j].innerHTML){
					return false;
				}else if(i + 1 < this.grid){
					if(this.tiles[i][j].innerHTML == this.tiles[i + 1][j].innerHTML){
						return false;
					}
				}else if(j + 1 < this.grid){
					if(this.tiles[i][j].innerHTML == this.tiles[i][j + 1].innerHTML){
						return false;
					}
				}
			}
		}
		return true;
	}
}
































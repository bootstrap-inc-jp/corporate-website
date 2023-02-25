/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/,
 *    Hiroshi Kawada https://bootstrap-inc.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
    var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
   
    // The base Class implementation (does nothing)
    this.Class = function(){};
   
    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
      var _super = this.prototype;
     
      // Instantiate a base class (but only create the instance,
      // don't run the init constructor)
      initializing = true;
      var prototype = new this();
      initializing = false;
     
      // Copy the properties over onto the new prototype
      for (var name in prop) {
        // Check if we're overwriting an existing function
        prototype[name] = typeof prop[name] == "function" &&
          typeof _super[name] == "function" && fnTest.test(prop[name]) ?
          (function(name, fn){
            return function() {
              var tmp = this._super;
             
              // Add a new ._super() method that is the same method
              // but on the super-class
              this._super = _super[name];
             
              // The method only need to be bound temporarily, so we
              // remove it when we're done executing
              var ret = fn.apply(this, arguments);        
              this._super = tmp;
             
              return ret;
            };
          })(name, prop[name]) :
          prop[name];
      }
     
      // The dummy class constructor
      function Class() {
        // All construction is actually done in the init method
        if ( !initializing && this.init )
          this.init.apply(this, arguments);
      }
     
      // Populate our constructed prototype object
      Class.prototype = prototype;
     
      // Enforce the constructor to be what we expect
      Class.prototype.constructor = Class;
   
      // And make this class extendable
      Class.extend = arguments.callee;
     
      return Class;
    };
  })();
  
  
  // ###################################################################
  // shims
  //
  // ###################################################################
  (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  (function() {
    if (!window.performance.now) {
      window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } : 
        function() { return Date.now(); }
    }
  })();
  
  // ###################################################################
  // Constants
  //
  // ###################################################################
  var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var CANVAS_WIDTH = 640;
  var CANVAS_HEIGHT = 640;
  var SPRITE_SHEET_SRC = 'data:image/png;base64,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';
  var LEFT_KEY = 37;
  var RIGHT_KEY = 39;
  var SHOOT_KEY = 32;
  var TEXT_BLINK_FREQ = 500;
  var PLAYER_CLIP_RECT = { x: 0, y: 204, w: 62, h: 32 };
  var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 51, h: 34 }, { x: 0, y: 102, w: 51, h: 34 }];
  var ALIEN_MIDDLE_ROW = [ { x: 0, y: 137, w: 50, h: 33 }, { x: 0, y: 170, w: 50, h: 34 }];
  var ALIEN_TOP_ROW = [ { x: 0, y: 68, w: 50, h: 32 }, { x: 0, y: 34, w: 50, h: 32 }];
  var ALIEN_X_MARGIN = 40;
  var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;
  
  
  
  // ###################################################################
  // Utility functions & classes
  //
  // ###################################################################
  function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
  }
  
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  
  function valueInRange(value, min, max) {
    return (value <= max) && (value >= min);
  }
   
  function checkRectCollision(A, B) {
    var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
    valueInRange(B.x, A.x, A.x + A.w);
   
    var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
    valueInRange(B.y, A.y, A.y + A.h); 
    return xOverlap && yOverlap;
  }
  
  var Point2D = Class.extend({
    init: function(x, y) {
      this.x = (typeof x === 'undefined') ? 0 : x;
      this.y = (typeof y === 'undefined') ? 0 : y;
    },
    
    set: function(x, y) {
      this.x = x;
      this.y = y;
    }
  });
  
  var Rect = Class.extend({
    init: function(x, y, w, h) {
      this.x = (typeof x === 'undefined') ? 0 : x;
      this.y = (typeof y === 'undefined') ? 0 : y;
      this.w = (typeof w === 'undefined') ? 0 : w;
      this.h = (typeof h === 'undefined') ? 0 : h;
    },
    
    set: function(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
    }
  });
  
  
  
  // ###################################################################
  // Globals
  //
  // ###################################################################
  var canvas = null;
  var ctx = null;
  var spriteSheetImg = null;
  var bulletImg = null;
  var keyStates = null;
  var prevKeyStates = null;
  var lastTime = 0;
  var player = null;
  var aliens = [];
  var particleManager = null;
  var updateAlienLogic = false;
  var alienDirection = -1;
  var alienYDown = 0;
  var alienCount = 0;
  var wave = 1;
  var hasGameStarted = false;
  var hasGameEnded = false;
  var clickToStart = false;
  var pressLeft  = false;
  var pressRight = false;
  var pressShoot = false;
  var coporateName = 'HOGE INC.';
  var successMessage = 'WE ARE HIRING!';
  var email = 'foo@bar.com';
  
  
  // ###################################################################
  // Entities
  //
  // ###################################################################
  var BaseSprite = Class.extend({
    init: function(img, x, y) {
      this.img = img;
      this.position = new Point2D(x, y);
      this.scale = new Point2D(1, 1);
      this.bounds = new Rect(x, y, this.img.width, this.img.height);
      this.doLogic = true;
    },
                             
    update: function(dt) { },
    
    _updateBounds: function() {
       this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
    },
    
    _drawImage: function() {
      ctx.drawImage(this.img, this.position.x, this.position.y);
    },
    
    draw: function(resized) {
      this._updateBounds();
      
      this._drawImage();
    }
  });
  
  var SheetSprite = BaseSprite.extend({
    init: function(sheetImg, clipRect, x, y) {
      this._super(sheetImg, x, y);
      this.clipRect = clipRect;
      this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
    },
    
    update: function(dt) {},
    
    _updateBounds: function() {
      var w = ~~(0.5 + this.clipRect.w * this.scale.x);
      var h = ~~(0.5 + this.clipRect.h * this.scale.y);
      this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
    },
    
    _drawImage: function() {
      ctx.save();
      ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
      ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
      ctx.restore();
  
    },
    
    draw: function(resized) {
      this._super(resized);
    }
  });
  
  var Player = SheetSprite.extend({
    init: function() {
      this._super(spriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
      this.scale.set(0.85, 0.85);
      this.lives = 3;
      this.xVel = 0;
      this.bullets = [];
      this.bulletDelayAccumulator = 0;
      this.score = 0;
    },
    
    reset: function() {
      this.lives = 3;
      this.score = 0;
      this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    },
    
    shoot: function() {
      var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
      this.bullets.push(bullet);
    },
    
    handleInput: function() {
      if (isKeyDown(LEFT_KEY) || pressLeft) {
        this.xVel = -175;
      } else if (isKeyDown(RIGHT_KEY) || pressRight) {
        this.xVel = 175;
      } else this.xVel = 0;
      
      if (wasKeyPressed(SHOOT_KEY) || pressShoot) {
        if (this.bulletDelayAccumulator > 0.5) {
          this.shoot(); 
          this.bulletDelayAccumulator = 0;
        }
      }
    },
    
    updateBullets: function(dt) {
      for (var i = this.bullets.length - 1; i >= 0; i--) {
        var bullet = this.bullets[i];
        if (bullet.alive) {
          bullet.update(dt);
        } else {
          this.bullets.splice(i, 1);
          bullet = null;
        }
      }
    },
    
    update: function(dt) {
      // update time passed between shots
      this.bulletDelayAccumulator += dt;
      
      // apply x vel
      this.position.x += this.xVel * dt;
      
      // cap player position in screen bounds
      this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
      this.updateBullets(dt);
    },
    
    draw: function(resized) {
      this._super(resized);
  
      // draw bullets
      for (var i = 0, len = this.bullets.length; i < len; i++) {
        var bullet = this.bullets[i];
        if (bullet.alive) {
          bullet.draw(resized);
        }
      }
    }
  });
  
  var Bullet = BaseSprite.extend({
    init: function(x, y, direction, speed) {
      this._super(bulletImg, x, y);
      this.direction = direction;
      this.speed = speed;
      this.alive = true;
    },
    
    update: function(dt) {
      this.position.y -= (this.speed * this.direction) * dt;
      
      if (this.position.y < 0) {
        this.alive = false;
      }
    },
    
    draw: function(resized) {
      this._super(resized);
    }
  });
  
  var Enemy = SheetSprite.extend({
    init: function(clipRects, x, y) {
      this._super(spriteSheetImg, clipRects[0], x, y);
      this.clipRects = clipRects;
      this.scale.set(0.5, 0.5);
      this.alive = true;
      this.onFirstState = true;
      this.stepDelay = 1; // try 2 secs to start with...
      this.stepAccumulator = 0;
      this.doShoot - false;
      this.bullet = null;
    },
    
    toggleFrame: function() {
      this.onFirstState = !this.onFirstState;
      this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
    },
    
    shoot: function() {
      this.bullet = new Bullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
    },
    
    update: function(dt) {
      this.stepAccumulator += dt;
      
      if (this.stepAccumulator >= this.stepDelay) {
        if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
        updateAlienLogic = true;
      } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
        updateAlienLogic = true;
      }
        if (this.position.y > CANVAS_WIDTH - 50) {
          reset();
        }
        
        var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
        if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
          this.doShoot = true;
        }
        this.position.x += 10 * alienDirection;
        this.toggleFrame();
        this.stepAccumulator = 0;
      }
      this.position.y += alienYDown;
      
      if (this.bullet !== null && this.bullet.alive) {
        this.bullet.update(dt);  
      } else {
        this.bullet = null;
      }
    },
    
    draw: function(resized) {
      this._super(resized);
      if (this.bullet !== null && this.bullet.alive) {
        this.bullet.draw(resized);
      }
    }
  });
  
  var ParticleExplosion = Class.extend({
    init: function() {
      this.particlePool = [];
      this.particles = [];
    },
    
    draw: function() {
      for (var i = this.particles.length - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.moves++;
          particle.x += particle.xunits;
            particle.y += particle.yunits + (particle.gravity * particle.moves);
              particle.life--;
              
              if (particle.life <= 0 ) {
                  if (this.particlePool.length < 100) {
                      this.particlePool.push(this.particles.splice(i,1));
                  } else {
                      this.particles.splice(i,1);
                  }
              } else {
                  ctx.globalAlpha = (particle.life)/(particle.maxLife);
                  ctx.fillStyle = particle.color;
                  ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
                  ctx.globalAlpha = 1;
              }
      }
    },
    
    createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
    for (var i =0;i < number;i++) {
              var angle = Math.floor(Math.random()*360);
              var speed = Math.floor(Math.random()*spd/2) + spd;	
              var life = Math.floor(Math.random()*lif)+lif/2;
              var radians = angle * Math.PI/ 180;
              var xunits = Math.cos(radians) * speed;
              var yunits = Math.sin(radians) * speed;
                  
              if (this.particlePool.length > 0) {
                  var tempParticle = this.particlePool.pop();
                  tempParticle.x = x;
                  tempParticle.y = y;
                  tempParticle.xunits = xunits;
                  tempParticle.yunits = yunits;
                  tempParticle.life = life;
                  tempParticle.color = color;
                  tempParticle.width = width;
                  tempParticle.height = height;
                  tempParticle.gravity = grav;
                  tempParticle.moves = 0;
                  tempParticle.alpha = 1;
                  tempParticle.maxLife = life;
                  this.particles.push(tempParticle);
              } else {
                  this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
              }	
      
          }
    }
  });
  
  
  
  // ###################################################################
  // Initialization functions
  //
  // ###################################################################
  function initCanvas() {
    // create our canvas and context
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // turn off image smoothing
    setImageSmoothing(false);
    
    // create our main sprite sheet img
    spriteSheetImg = new Image();
    spriteSheetImg.src = SPRITE_SHEET_SRC;  
    preDrawImages();
  
    // add event listeners and initially resize
    window.addEventListener('resize', resize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
  }
  
  function preDrawImages() {
    var canvas = drawIntoCanvas(2, 8, function(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      });
      bulletImg = new Image();
      bulletImg.src = canvas.toDataURL();
  }
  
  function setImageSmoothing(value) {
    this.ctx['imageSmoothingEnabled'] = value;
    this.ctx['mozImageSmoothingEnabled'] = value;
    this.ctx['oImageSmoothingEnabled'] = value;
    this.ctx['webkitImageSmoothingEnabled'] = value;
    this.ctx['msImageSmoothingEnabled'] = value;
  }
  
  function initGame() {
    dirtyRects = [];
    aliens = [];
    player = new Player();
    particleManager = new ParticleExplosion();
    setupAlienFormation();  
    drawBottomHud();
  }

  function endGame() {
    aliens = [];
  }
  
  function setupAlienFormation() {
    alienCount = 0;
    for (var i = 0, len = 5 * 11; i < len; i++) {
      var gridX = (i % 11);
      var gridY = Math.floor(i / 11);
      var clipRects;
      switch (gridY) {
        case 0: 
        case 1: clipRects = ALIEN_BOTTOM_ROW; break;
        case 2: 
        case 3: clipRects = ALIEN_MIDDLE_ROW; break;
        case 4: clipRects = ALIEN_TOP_ROW; break;
      }
      aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
      alienCount++;
    }
  }
  
  function reset() {
    aliens = [];
    setupAlienFormation();
    player.reset();
  }
  
  function init() {
    initCanvas();
    keyStates = [];
    prevKeyStates = [];
    resize();
  }
  
  
  
  // ###################################################################
  // Helpful input functions
  //
  // ###################################################################
  function isKeyDown(key) {
    return keyStates[key];
  }
  
  function wasKeyPressed(key) {
    return !prevKeyStates[key] && keyStates[key];
  }
  
  
  // ###################################################################
  // Drawing & Update functions
  //
  // ###################################################################
  function updateAliens(dt) {
    if (updateAlienLogic) {
      updateAlienLogic = false;
      alienDirection = -alienDirection;
      alienYDown = 25;
    }
    
    for (var i = aliens.length - 1; i >= 0; i--) {
      var alien = aliens[i];
      if (!alien.alive) {
        aliens.splice(i, 1);
        alien = null;
        alienCount--;
        if (alienCount < 1) {
          wave++;
          setupAlienFormation();
        }
        return;
      }
      
      alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
      if (alien.stepDelay <= 0.05) {
        alien.stepDelay = 0.05;
      }
      alien.update(dt);
      
      if (alien.doShoot) {
        alien.doShoot = false;
        alien.shoot();
      }
    }
    alienYDown = 0;
  }
  
  function resolveBulletEnemyCollisions() {
    var bullets = player.bullets;
    
    for (var i = 0, len = bullets.length; i < len; i++) {
      var bullet = bullets[i];
      for (var j = 0, alen = aliens.length; j < alen; j++) {
        var alien = aliens[j];
        if (checkRectCollision(bullet.bounds, alien.bounds)) {
          alien.alive = bullet.alive = false;
          particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 30, 5,5,3,.15,10);
          player.score += 10;
        }
      }
    }
  }
  
  function resolveBulletPlayerCollisions() {
    for (var i = 0, len = aliens.length; i < len; i++) {
      var alien = aliens[i];
      if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
        if (player.lives === 0) {
          // hasGameStarted = false;
          hasGameEnded = true;
        } else {
         alien.bullet.alive = false;
         particleManager.createExplosion(player.position.x, player.position.y, 'green', 100, 8,8,6,0.001,10);
         player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
         player.lives--;
          break;
        }
  
      }
    }
  }
  
  function resolveCollisions() {
    resolveBulletEnemyCollisions();
    resolveBulletPlayerCollisions();
  }
  
  function updateGame(dt) {
    player.handleInput();
    prevKeyStates = keyStates.slice();
    player.update(dt);
    updateAliens(dt);
    resolveCollisions();
  }
  
  function drawIntoCanvas(width, height, drawFunc) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    drawFunc(ctx);
    return canvas;
  }
  
  function fillText(text, x, y, color, fontSize) {
    if (typeof color !== 'undefined') ctx.fillStyle = color;
    if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px topFont';
    ctx.fillText(text, x, y);
  }
  
  function fillCenteredText(text, x, y, color, fontSize) {
    var metrics = ctx.measureText(text);
    fillText(text, x - metrics.width/2, y, color, fontSize);
  }
  
  function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
    if (~~(0.5 + Date.now() / blinkFreq) % 2) {
      fillCenteredText(text, x, y, color, fontSize);
    }
  }
  
  function drawBottomHud() {
    ctx.fillStyle = '#02ff12';
    ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
    // fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
    for( let i=0 ; i<player.lives ; i++ ) {
      ctx.drawImage(spriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w, 
        player.clipRect.h, 45 * i, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
        player.clipRect.h * 0.5);
    }
    fillText(coporateName, CANVAS_WIDTH - 160, CANVAS_HEIGHT - 7.5, 'white', 20);
    fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH/2, 20);
  }
  
  function drawAliens(resized) {
    for (var i = 0; i < aliens.length; i++) {
      var alien = aliens[i];
      alien.draw(resized);
    }
  }
  
  function drawGame(resized) {
    player.draw(resized);  
    drawAliens(resized);
    particleManager.draw();
    drawBottomHud();
  }
  
  function drawStartScreen() {
    fillCenteredText("Space Invaders", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
    fillBlinkingText("Press enter to play!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
  }
  
  function animate() {
    var now = window.performance.now();
    var dt = now - lastTime;
    if (dt > 100) dt = 100;
    if( hasGameEnded ) {
      endGame();
    } else if (/* wasKeyPressed(13) && */ clickToStart && !hasGameStarted) {
      initGame();
      hasGameStarted = true;
    } else if (hasGameStarted) {
       updateGame(dt / 1000);  
    }
  
   
    ctx.fillStyle = '#2E2E2E';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if( hasGameEnded ) {
      fillCenteredText("YOUR SCORE : " + player.score    , CANVAS_WIDTH/2, CANVAS_HEIGHT/3.75, '#FFFFFF', 36);
      if( player.score >= 2000 ) {
        fillCenteredText(successMessage                  , CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
        fillCenteredText(email                           , CANVAS_WIDTH/2, CANVAS_HEIGHT/2.25, '#FFFFFF', 36);
      } else {
        fillCenteredText("GAME OVER"                     , CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
      }
    } else if (hasGameStarted) {
      drawGame(false);
    } else {
      drawStartScreen();
    }
    lastTime = now;
    requestAnimationFrame(animate);
  }
  
  
  
  // ###################################################################
  // Event Listener functions
  //
  // ###################################################################
  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
  
      // calculate the scale factor to keep a correct aspect ratio
    var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
    
    if (IS_CHROME) {
      canvas.width = CANVAS_WIDTH * scaleFactor;
      canvas.height = CANVAS_HEIGHT * scaleFactor;
      setImageSmoothing(false);
      ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
    } else {
      // resize the canvas css properties
      canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
      canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
    }
  }
  
  function onKeyDown(e) {
    e.preventDefault();
    keyStates[e.keyCode] = true;
  }
  
  function onKeyUp(e) {
    e.preventDefault();
    keyStates[e.keyCode] = false;
  }
  
  
  // ###################################################################
  // Start game!
  //
  // ###################################################################
  window.onload = function() {
    init();
    animate();
  };
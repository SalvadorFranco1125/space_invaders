const BackgroundMusic = function() {
  this.sound = null;
  this.isMuted = false;
  this.isLoaded = false;
};

BackgroundMusic.prototype.initSound = function() {
  if (this.sound) return; // Ya inicializado
  
  const Howl = window.Howl;
  if (!Howl) {
    alert('Howl.js no está disponible');
    return;
  }
  
  this.sound = new Howl({
    src: ['/sounds/fondo_sonoro.mp3'],
    loop: true,
    volume: 0.7,
    autoplay: false,
    html5: true,
    onload: () => {
      this.isLoaded = true;
      console.log('[BackgroundMusic] Audio cargado');
    },
    onloaderror: (id, error) => {
      console.error('[BackgroundMusic] Error al cargar:', error);
    },
    onplayerror: (id, error) => {
      console.error('[BackgroundMusic] Error al reproducir:', error);
    }
  });
};

BackgroundMusic.prototype.play = function() {
  console.log('[BackgroundMusic.play] Reproduciendo...');
  this.initSound();
  if (this.sound && !this.isMuted) {
    this.sound.play();
  }
};

BackgroundMusic.prototype.pause = function() {
  console.log('[BackgroundMusic.pause] Pausa');
  if (this.sound) {
    this.sound.pause();
  }
};

BackgroundMusic.prototype.resume = function() {
  console.log('[BackgroundMusic.resume] Reanudando...');
  this.initSound();
  if (this.sound && !this.isMuted) {
    this.sound.play();
  }
};

BackgroundMusic.prototype.stop = function() {
  console.log('[BackgroundMusic.stop] Deteniendo...');
  if (this.sound) {
    this.sound.stop();
  }
};

BackgroundMusic.prototype.setMuted = function(isMuted) {
  this.isMuted = isMuted;
  console.log('[BackgroundMusic.setMuted] Mute =', isMuted);
  
  if (this.sound) {
    if (isMuted) {
      this.sound.mute(true);
    } else {
      this.sound.mute(false);
    }
  }
};

module.exports = BackgroundMusic;

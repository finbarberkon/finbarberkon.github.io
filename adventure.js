// Make a ghost move around a screen and shoot fireballs
// Written by Finbar Berkon
// July 2019

'use strict';

const SPRINT = 60;
const WALK = 30;

const WIDTH = 75;
const HEIGHT = 64;

const MIN_X = 0;
const MAX_X = window.innerWidth - WIDTH;
const MIN_Y = 0;
const MAX_Y = window.innerHeight - HEIGHT;

let speed = WALK;

const player = document.getElementById('player');
player.style.left = "50px";
player.style.top = (MAX_Y / 2) + "px";

const instructions = document.getElementById("instructions");
instructions.style.top = (MAX_Y + 15) + "px";
instructions.style.left = (20) + "px";

window.onload = () => {
   setInterval(() => {
      shoot();
      move();
   }, 100);
}

// Map key presses on keydown and remove them on keyup so that the ghost can
// move in diagonal directions
let key = {};

document.addEventListener('keydown', (event) => {
   event.preventDefault(); // prevent arrow keys scrolling page
   key[event.key] = true;
   toggle_sprint();
})

document.addEventListener('keyup', (event) => {
   key[event.key] = false;
   toggle_sprint();
})

document.addEventListener('scroll', (event) => {
   event.preventDefault();
})

function move() {
   if (key.ArrowLeft || key.h) {
      let new_position = (parseInt(player.style.left) - speed);
      (new_position < MIN_X) && (new_position = MIN_X);
      player.style.left = new_position + "px";
   }

   if (key.ArrowRight || key.l) {
      let new_position = (parseInt(player.style.left) + speed);
      (new_position > MAX_X) && (new_position = MAX_X);
      player.style.left = new_position + "px";
   }

   if (key.ArrowUp || key.k) {
      let new_position = (parseInt(player.style.top) - speed);
      (new_position < MIN_Y) && (new_position = MIN_Y);
      player.style.top = new_position + "px";
   }

   if (key.ArrowDown || key.j) {
      let new_position = (parseInt(player.style.top) + speed);
      (new_position > MAX_Y) && (new_position = MAX_Y);
      player.style.top = new_position + "px";
   }
}

function shoot() {
   if (key.x) {
      const fireball = document.createElement('fireball');
      fireball.id = "fireball";
      fireball.style.left = (parseInt(player.style.left) + 40) + "px";
      fireball.style.top = (parseInt(player.style.top) + 20) + "px";

      document.body.appendChild(fireball);
      setTimeout(() => { document.body.removeChild(fireball); }, 2000);
   }
}

function toggle_sprint() {
   if (key.z) {
      speed = SPRINT;
   } else if (!key.z) {
      speed = WALK;
   }
}

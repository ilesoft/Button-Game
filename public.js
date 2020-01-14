"use strict";

new Vue({
  el: "#app",
  data: {
    points: 0, // default value doesn't matter
    message: "",
    buttonLabel: "CLICK ME!",
    buttonDisabled: false,
    newGameDisplay: {display: "none"},
  },
  template:
`<div>
  <div id=game>
    <div id=pointsDiv>
      <p>Your points:</p>
      <span id=pointsBox>{{points}}</span>
    </div>
    <div>
      <button id=button
              v-bind:disabled=buttonDisabled
              v-on:click=decrease>
        {{buttonLabel}}
      </button>
    </div>
  </div>
  <p>{{message}}</p>
  <div>
    <button id=newGame
            v-bind:style=newGameDisplay
            v-on:click=newGame>
      Start a new game
    </button>
  </div>
</div>`,
  methods: {
    decrease: function() {
      this.points--;
      const pointsWon = ajax();
      if (pointsWon !== 0) {
        this.message = `You just won ${pointsWon} points. 10 clicks to next prize.`;
      } else {
        this.message = "";
      }
      this.points += pointsWon;
      document.cookie = `points=${this.points}; max-age=31536000; samesite=strict; secure`;
      // In case of lose
      if (this.points <= 0) {
        this.lose();
      }
    },
    newGame: function() {
      this.points = 20;
      document.cookie = "points=20; max-age=31536000; samesite=strict; secure";
      this.message = "";
      this.newGameDisplay.display = "none";
      this.buttonDisabled = false;
    },
    lose: function() {
      this.message = "You lose";
      this.buttonDisabled = true;
      this.newGameDisplay.display = "inline";
    },
  },
  mounted: function() {
    // parse existing cookie, an ugly way
    // No existing cookie  => back to start
    let string = document.cookie;
    string = string.slice(string.indexOf("points=")+7, string.length +1);
    string = string.slice(0,
      string.indexOf(";") === -1 ? string.length : string.indexOf(";"));
    const cookie = Number(string);

    // Set right value to game and cookie
    if (Number.isInteger(cookie) && cookie >= 0 && string !== "") {
      this.points = cookie;
      if (cookie === 0) {
        this.lose();
      }
    } else {
      this.newGame();
    }
  },
});


/**
 * ajax - performs request to API
 *
 * @return {int}  Points user won.
 */
function ajax() { // TODO: Async this
  const req = new XMLHttpRequest();
  req.open("POST", "https://" + document.domain + "/increase.php", false);
  req.send();
  if (req.status === 200) {
    return JSON.parse(req.responseText)["points"];
  } else {
    // TODO:
  }
}

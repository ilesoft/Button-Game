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
      /**
       *  Performs a "turn" in game.
       */
      this.points--;
      const pointsWon = this.ajax();
      if (Number.isNaN(pointsWon)) {
        this.message = "There was a problem. Starting a new game...";
        this.points = "😒"; // Non-ASCII character, I'm sorry
        return;
      } else if (pointsWon !== 0) {
        this.message = `You just won ${pointsWon} points.
                        10 clicks to next prize.`;
      } else {
        this.message = "";
      }
      this.points += pointsWon;
      document.cookie = `points=${this.points};
                         max-age=31536000;
                         samesite=strict;
                         secure`;
      // In case of lose
      if (this.points <= 0) {
        this.lose();
      }
    },
    newGame: function() {
      /**
       *  Starts a new game and sets initial values.
       */
      this.points = 20;
      document.cookie = "points=20; max-age=31536000; samesite=strict; secure";
      this.message = "";
      this.newGameDisplay.display = "none";
      this.buttonDisabled = false;
    },
    lose: function() {
      /**
       *  Shows user she/he lost.
       */
      this.message = "You lose";
      this.buttonDisabled = true;
      this.newGameDisplay.display = "block";
    },
    ajax: function() {
      /**
       * Performs request to API. Synchronous XMLHttpRequest generatess some
       * warning. This time this is intentional.
       * @return {int}  Points user has won.
       */
      const req = new XMLHttpRequest();
      req.open("POST", "https://" + document.domain + "/increase.php", false);
      req.send();
      if (req.status === 200) {
        return JSON.parse(req.responseText)["points"];
      } else {
        setInterval(()=>{
          this.newGame();
        }, 40000);
        return NaN;
      }
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

"use strict";

new Vue({
  el: "#app",
  data: {
    points: 20,
    message: "",
  },
  template:
`<div>
    <button  v-on:click=decrease>CLICK ME!</button>
    <p>{{points}}</p>
    <p>{{message}}</p>
</div>`,
  methods: {
    decrease: function() {
      this.points--;
      alert(document.URL);
    },
  },
});

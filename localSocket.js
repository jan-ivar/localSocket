function localSocket() {
  localStorage.a = localStorage.b = JSON.stringify([]);
  this.index = 0;
  this.interval = setInterval(() => {
    if (!this.in) {
      if (!JSON.parse(localStorage.a).length) return;
      this.in = "a"; this.out = "b";
    }
    var arr = JSON.parse(localStorage[this.in]);
    if (arr.length <= this.index) return;
    if (this.onmessage) this.onmessage({ data: arr[this.index] });
    this.index++;
  }, 200);
  setTimeout(() => this.onopen && this.onopen({}));
}
localSocket.prototype = {
  send: function(msg) {
    if (!this.out) {
      this.out = "a"; this.in = "b";
    }
    var arr = JSON.parse(localStorage[this.out]);
    arr.push(msg);
    localStorage[this.out] = JSON.stringify(arr);
  },
  close: function() {
    clearInterval(this.interval);
  }
};

(function (b, a) {
    typeof exports === "object" && typeof module !== "undefined"
      ? a(exports)
      : typeof define === "function" && define.amd
      ? define(["exports"], a)
      : a((b.exportToCSV = {}));
  })(this, function (a) {
    a.exportToCSV = function (f, e, i) {
      if (!Array.isArray(f) && !Array.isArray(e) && !f.length && !e.length) {
        console.error(
          "\u5bfc\u51fa\u6570\u636e\u548c\u8868\u5934\u4e0d\u4e3a\u7a7a"
        );
        return this;
      }
      var h = this.browser();
      if (h.ie < 9) {
        return this;
      }
      var g = "",
        b = [],
        d,
        c;
      e.forEach(function (j) {
        b.push(j.title || j.key);
      });
      g = g + b.join(",") + "\r\n";
      f.forEach(function (j) {
        b = [];
        c = "";
        e.forEach(function (k) {
          d = k.key;
          if (typeof j[d] == "string" || typeof j[d] === "number") {
            c = typeof k.formatter === "function" ? k.formatter(j, k, d) : j[d];
            c = typeof c === "function" ? "" : c + "";
            if(c.includes(',')||c.includes('"')) c=`"${c.replace(/"/g, '""')}"`;
          }
          b.push(c);
        });
        g = g + b.join(",") + "\r\n";
      });
      var i = i || "userExportToCSV";
      this.SaveAs(i, g);
    };
    a.browser = function () {
      var b = {};
      var c = navigator.userAgent.toLowerCase();
      var d;
      (d =
        c.indexOf("edge") !== -1
          ? (b.edge = "edge")
          : c.match(/rv:([\d.]+)\) like gecko/))
        ? (b.ie = d[1])
        : (d = c.match(/msie ([\d.]+)/))
        ? (b.ie = d[1])
        : (d = c.match(/firefox\/([\d.]+)/))
        ? (b.firefox = d[1])
        : (d = c.match(/chrome\/([\d.]+)/))
        ? (b.chrome = d[1])
        : (d = c.match(/opera.([\d.]+)/))
        ? (b.opera = d[1])
        : (d = c.match(/version\/([\d.]+).*safari/))
        ? (b.safari = d[1])
        : 0;
      return b;
    };
    a.SaveAs = function (i, h) {
      var g = this.browser();
      if (!g.edge || !g.ie) {
        var d = document.createElement("a");
        d.id = "linkDwnldLink";
        d.href = this.getDownloadUrl(h);
        document.body.appendChild(d);
        var f = document.getElementById("linkDwnldLink");
        f.setAttribute("download", i);
        f.click();
        document.body.removeChild(f);
      } else {
        if (g.ie >= 10 || g.edge == "edge") {
          var c = "\uFEFF";
          var e = new Blob([c + h], { type: "text/csv" });
          navigator.msSaveBlob(e, i);
        } else {
          var b = window.top.open("about:blank", "_blank");
          b.document.write("sep=,\r\n" + h);
          b.document.close();
          b.document.execCommand("SaveAs", true, i);
          b.close();
        }
      }
    };
    a.getDownloadUrl = function (c) {
      var b = "\uFEFF";
      if (window.Blob && window.URL && window.URL.createObjectURL) {
        var c = new Blob([b + c], { type: "text/csv" });
        return URL.createObjectURL(c);
      }
    };
  });
  
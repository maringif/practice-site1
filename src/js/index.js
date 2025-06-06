// Header
fetch("header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    // header.html の内容が挿入された後にmain.jsを読み込む
    import("./main.js").then(module => {
      module.initProductPage();
    });
  });
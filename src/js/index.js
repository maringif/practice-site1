console.log("index.js loaded");
fetch("../../header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    import("./main.js").then(module => {
      module.initAllSliders();
      module.initFavoriteButtons();
      module.initCartButtons();
      module.initQuantityButtons();
      module.startMidnightCountdown();
    });
  });
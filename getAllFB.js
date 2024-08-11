let completedChecker = new Promise((resolve) => {
  let loadInt = setInterval(() => {
    const findHeader = document.querySelector("div.m-b-2");
    if (findHeader != null) {
      clearInterval(loadInt);
      resolve(findHeader);
    }
  }, 1000);
});
completedChecker.then((findHeader) => {
  let buttonWrapper = document.createElement("button");
  buttonWrapper.classList.add("buttonWrapper");
  buttonWrapper.textContent = "Check Completed";

  let beforeBtn = findHeader.querySelector("div.toggle-buttons-wrapper");
  findHeader.insertBefore(buttonWrapper, beforeBtn);

  buttonWrapper.addEventListener("click", getAllFB);

  function getAllFB() {
    let findBody = document.querySelector("tbody");
    let findFB = findBody.children;
    let fbArr = [];
    for (let el of findFB) {
      let FB = Number(el.children[1].textContent);
      fbArr.push(FB);
    }
    localStorage.setItem("delivered", JSON.stringify(fbArr));
    let resultBlock = document.createElement("div");
    resultBlock.classList.add("resultBlock");
    resultBlock.textContent = "FB collected";
    findHeader.insertBefore(resultBlock, buttonWrapper);
    //console.log();
  }
});

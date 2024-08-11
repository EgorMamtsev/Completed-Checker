let leedsLoad = new Promise((resolve) => {
  let leedsInt = setInterval(() => {
    const findInputField = document.querySelector("span.RadInput_Office2007");
    if (findInputField != null) {
      clearInterval(leedsInt);
      resolve();
    }
  }, 1000);
});
leedsLoad.then(() => {
  let checkBtnAddField = document.querySelector("div.data");
  let checkBtn = document.createElement("button");
  checkBtn.classList.add("checkBtn");
  checkBtn.textContent = "Check Completed";
  checkBtn.addEventListener("click", startChecking);
  checkBtnAddField.append(checkBtn);

  let insertDataBtn = document.createElement("button");
  insertDataBtn.classList.add("insertDataBtn");
  insertDataBtn.textContent = "Insert Data";
  checkBtnAddField.append(insertDataBtn);
  insertDataBtn.addEventListener("click", insertData);

  let inputData = document.createElement("input");
  inputData.classList.add("inputData");
  inputData.type = "text";
  checkBtnAddField.append(inputData);

  function insertData() {
    let input = document.querySelector(".inputData");
    let dataArray = input.value.split(",").map(Number);
    localStorage.setItem("needToCheck", JSON.stringify(dataArray));
  }
  function checkIndex() {
    let index = localStorage.getItem("index");
    if (index == null) {
      return;
    } else {
      startChecking();
    }
  }
  checkIndex();
  //==================
  function startChecking() {
    let index = localStorage.getItem("index");
    index = JSON.parse(index);

    if (index == null) {
      index = 0;
      index = localStorage.setItem("index", JSON.stringify(index));
    }
    let checkingPromise = new Promise((resolve) => {
      let leedsInt = setInterval(() => {
        const findInputField = document.querySelector(
          "span.RadInput_Office2007"
        );
        if (findInputField != null) {
          clearInterval(leedsInt);
          resolve();
        }
      }, 1000);
    });
    checkingPromise.then(() => {
      let completed = localStorage.getItem("completed");
      if (completed == null) {
        completed = [];
        localStorage.setItem("completed", JSON.stringify(completed));
      } else {
        completed = JSON.parse(completed);
      }
      let currentFB = localStorage.getItem("needToCheck");
      currentFB = JSON.parse(currentFB);

      for (let i = 0; i <= currentFB.length; i += 1) {
        if (i == index) {
          checkStatus(i);
        }
      }
      function checkStatus(i) {
        let findStatus = document.getElementById(
          "ctl00_ctl00_SiteMasterContent_PageContent_dgFreightBills_ctl00__0"
        );
        if (findStatus == null) {
          checkNextLoad(i);
        }
        let status = findStatus.children[17].textContent;
        if (status == "COMPLETED" || status == "READY TO PRINT") {
          saveCompleted(i);
          checkNextLoad(i);
        } else {
          checkNextLoad(i);
        }
      }
      function saveCompleted(i) {
        let completed = localStorage.getItem("completed");
        completed = JSON.parse(completed);
        completed.push(currentFB[i - 1]);
        localStorage.setItem("completed", JSON.stringify(completed));
      }
      function checkNextLoad(i) {
        const findInputField = document.querySelector("input.riTextBox");
        findInputField.value = currentFB[i];
        index += 1;
        index = localStorage.setItem("index", JSON.stringify(index));

        let findBtn = document.getElementById(
          "ctl00_ctl00_SiteMasterContent_PageContent_btnFBNum"
        );
        findBtn.click();
      }
    });
  }
});

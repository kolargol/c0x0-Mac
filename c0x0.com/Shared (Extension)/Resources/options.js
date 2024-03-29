async function checkJWT(e) {
  e.preventDefault();
  let response = await fetch('https://api.c0x0.com/xpi/hc', {
    method: "GET",
    headers: {
      Authorization: "Bearer " + document.querySelector("#jwt").value
    }
  });
  
  if (response.status == 200) {
    document.getElementById("status").innerHTML = "<span class=\"text-success\">Access Token is Correct</span><br><strong>Settings Saved</strong>";
    saveOptions();
  } else {
    document.getElementById("status").innerHTML = "Invalid Access Token!";
    console.log("Trying to save invalid JWT Token");
  }
}

function saveOptions() {
  browser.storage.sync.set({
      jwt: document.querySelector("#jwt").value
    });
  console.log("Settings Saved");
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#jwt").value = result.jwt || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("jwt");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", checkJWT);

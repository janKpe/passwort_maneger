const passwords = [];


function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function generatePassword() {
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const beleidigung = choose(["idiot", "mast", "sau"]);
  const password = Math.random().toString(36).slice(-10);

  document.getElementById("password").value = password + beleidigung;

  const passwordObject = {
    website: website,
    username: username,
    password: password
  };

  passwords.push(passwordObject);

  document.getElementById("passwordlList").innerHTML +="<div class='passwordItem'>"+ 
  "<img src='assets/delete.svg' class='deleteIcon' >" +

"  <div class='passwordRow'>" +
"    <img src='assets/website.svg'>" +
`    <p id='website'><a href="${website}">${website}</a></p>`+
  "</div>"+
    "<div class='passwordRow'>"+
      "<img src='assets/user.svg' >"+
      `<p id='username' onclick='copyToClipboard("${username}")'>${username}</p>`+
    "</div>"+
    "<div class='passwordRow'>"+
      "<img src='assets/password.svg'>"+
      `<p id='password' onclick='copyToClipboard("${password}")'>${password}</p>`+
    "</div>"+
"</div>"

  
}


function copyToClipboard(textToCopy) {

  navigator.clipboard.writeText(textToCopy)
    .then(function() {
      console.log('Text erfolgreich in die Zwischenablage kopiert');
    })
    .catch(function(err) {
      console.error('Fehler beim Kopieren in die Zwischenablage: ', err);
    });
}


function savePassword() {
    const passwordString = JSON.stringify(passwords);
  
    const blob = new Blob([passwordString], { type: "application/json" });
    const link = document.createElement("a");
    link.download = "passwords.json";
    link.href = URL.createObjectURL(blob);
    link.click();
  }
  



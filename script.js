let passwords = localStorage.getItem("passwords");

if (!passwords) {
  localStorage.setItem("passwords", JSON.stringify({"passwordList": []}))
  passwords = {"passwordList": []}
} else {
  passwords = JSON.parse(passwords)
  renderPasswords()
}



function generatePassword() {
  const password = Math.random().toString(36).slice(-10);

  document.getElementById("password").value = password;

  
}

function renderPasswords() {
  document.getElementById("passwordlList").innerHTML = ""
  passwords.passwordList.forEach(element => {
    document.getElementById("passwordlList").innerHTML +="<div class='passwordItem'>"+ 
    `<img src='assets/delete.svg' class='deleteIcon' onclick="deletePassword('${element.id}')">` +
  
  "  <div class='passwordRow'>" +
  "    <img src='assets/website.svg'>" +
  `    <p id='website'><a target="_blank" href="${element.website}">${element.website}</a></p>`+
    "</div>"+
      "<div class='passwordRow'>"+
        "<img src='assets/user.svg' >"+
        `<p id='username' onclick='copyToClipboard("${element.username}")'>${element.username}</p>`+
      "</div>"+
      "<div class='passwordRow'>"+
        "<img src='assets/password.svg'>"+
        `<p id='password' onclick='copyToClipboard("${element.password}")'>${element.password}</p>`+
      "</div>"+
  "</div>"
  });
}
function savePassword() {
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!password) {
    password = Math.random().toString(36).slice(-10);
  }

  if (website && username) {
    const id = Math.random().toString(36).slice(-10); 
    const passwordObject = {
      "website": website,
      "username": username,
      "password": password,
      "id": id
    };

    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";



    passwords["passwords"] = passwords["passwordList"].push(passwordObject);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    renderPasswords()
  }
 

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



function deletePassword(id) {
  passwords.passwordList.forEach(element => {
    if (element.id === id) {
      var index = passwords.passwordList.indexOf(element);
      passwords.passwordList.splice(index, 1);
      localStorage.setItem("passwords", JSON.stringify(passwords))
      renderPasswords()
    }
  })
}
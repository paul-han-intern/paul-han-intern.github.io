document.addEventListener("DOMContentLoaded", () => {
  var personas = [
    {
      name: "Fred",
      accounts: 500,
      contacts: 1000
    },
    {
      name: "Penny",
      accounts: 400,
      contacts: 1100
    },
    {
      name: "Pippen",
      accounts: 700,
      contacts: 900
    },
    {
      name: "Sue",
      accounts: 200,
      contacts: 300
    }
  ];
  var frame = document.createElement("div");
  var top3 = [];

  personas.sort((a, b) => {
      return b.accounts - a.accounts;
  });
  
  personas.forEach((persona) => {
    thumbnailSource = "";
    switch(persona.name) {
      case "Fred":
        thumbnailSource = "persona-diagram/images/Fred.png";
        break;
      case "Penny":
        thumbnailSource = "persona-diagram/images/Penny.png";
        break;
      case "Pippen":
        thumbnailSource = "persona-diagram/images/Pippen.png";
        break;
      case "Sue":
        thumbnailSource = "persona-diagram/images/Sue.png";
    }
    var thumbnail = document.createElement("img");
    thumbnail.src = thumbnailSource;
    thumbnail.className = "persona-thumbnail";
    var name = document.createElement("p");
    name.innerHTML = persona.name;
    name.className = "persona-name";
    var accounts = document.createElement("p");
    accounts.innerHTML = '<b class="persona-value-label">Activity Score</b>' + persona.accounts;
    accounts.className = "persona-value";
    var contacts = document.createElement("p");
    contacts.innerHTML = '<b class="persona-value-label">Contacts</b>' + persona.contacts;
    contacts.className = "persona-value";
    var container = document.createElement("div");
    container.appendChild(thumbnail);
    container.appendChild(name);
    container.appendChild(accounts);
    container.appendChild(contacts);
    container.className = "persona-item";
    top3.push(container);
  });

  for (var i=0; i<3; i++) {
    frame.appendChild(top3[i]);
  }

  document.getElementById("persona-diagram").appendChild(frame);
});
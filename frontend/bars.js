document.addEventListener("DOMContentLoaded", function() {

  // Afficher le formulaire de création ou de modification de Bar
  window.showCreateForm = function() {
      document.getElementById("createBarForm").style.display = "block";
      document.getElementById('barForm').reset();
      document.getElementById('barForm').onsubmit = createBar; 
  }

  // Récupérer et afficher la liste des bars
  function getBars() {
      fetch('/bars')  
          .then(response => response.json())
          .then(bars => {
              const tableBody = document.querySelector('#barsTable tbody');
              tableBody.innerHTML = '';

              bars.forEach(bar => {
                  const row = document.createElement('tr');
                  row.innerHTML = `
                    <td>${bar.id}</td>
                    <td>${bar.name}</td>
                    <td>${bar.adresse}</td>
                    <td>${bar.tel}</td>
                    <td>${bar.email}</td>
                    <td>${bar.description}</td>
                    <td>
                      <button onclick="editBar(${bar.id})">Modifier</button>
                      <button onclick="deleteBar(${bar.id})">Supprimer</button>
                    </td>
                  `;
                  tableBody.appendChild(row);
              });
          });
  }

  // Ajouter un nouveau Bar
  function createBar(e) {
      e.preventDefault();
      
      const newBar = {
          name: document.getElementById('name').value,
          adresse: document.getElementById('adresse').value,
          tel: document.getElementById('tel').value,
          email: document.getElementById('email').value,
          description: document.getElementById('description').value
      };

      fetch('/bars', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBar)
      })
      .then(response => response.json())
      .then(() => {
          getBars();  
          document.getElementById('barForm').reset(); 
          document.getElementById("createBarForm").style.display = "none";
      });
  }

  // Modifier un bar
  editBar = function(id) {
      fetch(`/bars/${id}`)
          .then(response => response.json())
          .then(bar => {
              // Pré-remplir le formulaire avec les données existantes
              document.getElementById('name').value = bar.name;
              document.getElementById('adresse').value = bar.adresse;
              document.getElementById('tel').value = bar.tel;
              document.getElementById('email').value = bar.email;
              document.getElementById('description').value = bar.description;

              document.getElementById("createBarForm").style.display = "block";


              document.getElementById('barForm').onsubmit = function (e) {
                  e.preventDefault();
                  
                  const updatedBar = {
                      name: document.getElementById('name').value,
                      adresse: document.getElementById('adresse').value,
                      tel: document.getElementById('tel').value,
                      email: document.getElementById('email').value,
                      description: document.getElementById('description').value
                  };

                  fetch(`/bars/${id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(updatedBar)
                  })
                  .then(response => response.json())
                  .then(() => {
                      getBars(); 
                      document.getElementById('barForm').reset(); 
                      document.getElementById("createBarForm").style.display = "none";
                  });
              };
          });
  }

  // Supprimer un bar
  window.deleteBar = function(id) {
      fetch(`/bars/${id}`, { method: 'DELETE' })
          .then(() => getBars()); 
  }

  // Charger la liste des bars au chargement de la page
  window.onload = getBars;

});

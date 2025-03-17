document.addEventListener("DOMContentLoaded", () => {
    fetchCommandes();

    document.getElementById("addCommandeForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        await addOrUpdateCommande();
    });
});

async function fetchCommandes() {
    try {
        const response = await fetch("http://localhost:3000/commandes");
        if (!response.ok) throw new Error("Erreur lors de la récupération des commandes");

        const commandes = await response.json();
        const commandesList = document.getElementById("commandesList");
        commandesList.innerHTML = "";

        commandes.forEach(commande => {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${commande.name}</strong> - ${commande.prix}€ - Bar ID: ${commande.bars_id} - ${commande.date} - ${commande.status}
                <button onclick="editCommande(${commande.id}, '${commande.name}', ${commande.prix}, ${commande.bars_id}, '${commande.date}', '${commande.status}')">Modifier</button>
                <button onclick="deleteCommande(${commande.id})">Supprimer</button>
                <button onclick="viewCommande(${commande.id})">Détails</button>
            `;
            commandesList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

async function addOrUpdateCommande() {
    const id = document.getElementById("commandeId").value;
    const name = document.getElementById("name").value;
    const prix = document.getElementById("prix").value;
    const bars_id = document.getElementById("bars_id").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    const method = id ? "PUT" : "POST";
    const url = id ? `http://localhost:3000/commandes/${id}` : `http://localhost:3000/bars/${bars_id}/commandes`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, prix, bars_id, date, status }),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout ou de la modification de la commande");

        document.getElementById("addCommandeForm").reset();
        document.getElementById("createCommandeForm").style.display = "none";
        fetchCommandes();
    } catch (error) {
        console.error(error);
    }
}

function editCommande(id, name, prix, bars_id, date, status) {
    document.getElementById("commandeId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("prix").value = prix;
    document.getElementById("bars_id").value = bars_id;
    document.getElementById("date").value = date;
    document.getElementById("status").value = status;

    document.getElementById("createCommandeForm").style.display = "block";
}

async function deleteCommande(id) {
    if (!confirm("Voulez-vous vraiment supprimer cette commande ?")) return;

    try {
        const response = await fetch(`http://localhost:3000/commandes/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Erreur lors de la suppression de la commande");

        fetchCommandes();
    } catch (error) {
        console.error(error);
    }
}

async function viewCommande(id) {
    try {
        const response = await fetch(`http://localhost:3000/commandes/${id}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération des détails de la commande");

        const commande = await response.json();

        // Vérifier si la commande existe
        if (!commande || !commande.id) {
            throw new Error("Commande non trouvée ou donnée corrompue");
        }

        // Affichage des détails dans la section en bas
        document.getElementById("detailName").textContent = commande.name;
        document.getElementById("detailPrix").textContent = commande.prix;
        document.getElementById("detailBarsId").textContent = commande.bars_id;
        document.getElementById("detailDate").textContent = commande.date;
        document.getElementById("detailStatus").textContent = commande.status;

        // Afficher les bières liées à la commande
        const bièresContainer = document.getElementById("commandeBieresList");
        bièresContainer.innerHTML = "";

        if (commande.Bieres && commande.Bieres.length > 0) {
            commande.Bieres.forEach(biere => {
                const biereDiv = document.createElement("div");
                biereDiv.innerHTML = `
                    <p><strong>${biere.name}</strong> - ${biere.prix}€</p>
                    <button onclick="removeBiereFromCommande(${commande.id}, ${biere.id})">Enlever cette Bière</button>
                `;
                bièresContainer.appendChild(biereDiv);
            });
        } else {
            bièresContainer.innerHTML = "<p>Aucune bière associée à cette commande.</p>";
        }

        // Afficher la section bières
        document.getElementById("commandeBieresSection").style.display = "block";
        document.getElementById("commandeDetails").style.display = "block";

        // Stocker l'ID de la commande dans le champ caché pour l'ajout de bière
        document.getElementById("commandeIdForBiere").value = commande.id;

    } catch (error) {
        console.error(error.message);
    }
}

// Afficher le champ de saisie et les boutons pour ajouter une bière
function showAddBiereForm() {
    const addBiereForm = document.getElementById('addBiereForm');
    
    // Vérifie si l'élément existe avant de tenter de manipuler son style
    if (addBiereForm) {
        addBiereForm.style.display = 'block';
    } else {
        console.error('L\'élément #addBiereForm n\'a pas été trouvé.');
    }
}


// Annuler l'ajout de la bière 
function cancelAddBiere() {
    document.getElementById("biereInputSection").style.display = "none";
}

// Ajouter la bière à la commande
async function addBiereToCommande() {
    const commandeId = document.getElementById("commandeIdForBiere").value;
    const biereId = document.getElementById("biereId").value;

    if (!commandeId || !biereId) {
        alert("Veuillez entrer un ID de bière et sélectionner une commande.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/commandes/${commandeId}/biere/${biereId}`, {
            method: "POST",
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de la bière");

        alert("Bière ajoutée à la commande!");
        viewCommande(commandeId);
        document.getElementById("addBiereForm").style.display = "none";

    } catch (error) {
        console.error(error);
    }
}

async function removeBiereFromCommande(commandeId, biereId) {
    try {
        const response = await fetch(`http://localhost:3000/commandes/${commandeId}/biere/${biereId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Erreur lors de la suppression de la bière");

        alert("Bière supprimée de la commande!");
        viewCommande(commandeId);

    } catch (error) {
        console.error(error);
    }
}

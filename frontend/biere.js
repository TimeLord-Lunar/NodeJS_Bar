document.addEventListener("DOMContentLoaded", function() {
    // Récupérer et afficher toutes les bières
    const fetchBieres = async () => {
        try {
            const response = await fetch('http://localhost:3000/bieres');
            if (!response.ok) {
                throw new Error(await response.text());
            }
            const bieres = await response.json();
            const bieresList = document.getElementById('bieresList');
            bieresList.innerHTML = '';

            bieres.forEach(biere => {
                const biereItem = document.createElement('li');
                biereItem.innerHTML = `
                    <strong>${biere.name}</strong><br>
                    ${biere.description || 'Pas de description'}<br>
                    Degré : ${biere.degree}°<br>
                    Prix : ${biere.prix}€<br>
                    ID Bar : ${biere.bars_id}<br>
                    <button onclick="deleteBiere(${biere.id})">Supprimer</button>
                    <button onclick="editBiere(${biere.id})">Modifier</button>
                `;
                bieresList.appendChild(biereItem);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des bières :", error);
        }
    };

    // Ajouter ou modifier une bière
    const addBiereForm = document.getElementById('addBiereFormBiere');
    addBiereForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const biereId = document.getElementById('biereId').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const degree = parseFloat(document.getElementById('degree').value);
        const prix = parseFloat(document.getElementById('prix').value);
        const bars_id = parseInt(document.getElementById('bars_id').value);

        let response;

        if (biereId) {
            // Mise à jour d'une bière existante
            const updatedBiere = { name, description, degree, prix, bars_id };
            response = await fetch(`http://localhost:3000/biere/${biereId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBiere)
            });
        } else {
            // Ajouter une nouvelle bière
            response = await fetch(`http://localhost:3000/bars/${bars_id}/biere`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description, degree, prix })
            });
        }

        if (response.ok) {
            alert(biereId ? 'Bière mise à jour avec succès' : 'Bière ajoutée avec succès');
            fetchBieres();
            addBiereForm.reset();
            document.getElementById('biereId').value = ''; // Réinitialiser l'ID pour éviter problème pour ajouter si on a fait une modification avant
            document.getElementById('createBiereForm').style.display = 'none'; 
        } else {
            alert('Erreur lors de l\'ajout ou de la mise à jour de la bière');
        }
    });

    // Supprimer une bière
    window.deleteBiere = async (id) => { 
        if (confirm("Voulez-vous vraiment supprimer cette bière ?")) {
            const response = await fetch(`http://localhost:3000/biere/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Bière supprimée avec succès');
                fetchBieres();
            } else {
                alert('Erreur lors de la suppression de la bière');
            }
        }
    };

    // Fonction pour éditer une bière
    window.editBiere = async (id) => { 
        const response = await fetch(`http://localhost:3000/biere/${id}`);
        const biere = await response.json();

        document.getElementById('name').value = biere.name;
        document.getElementById('description').value = biere.description;
        document.getElementById('degree').value = biere.degree;
        document.getElementById('prix').value = biere.prix;
        document.getElementById('bars_id').value = biere.bars_id;
        document.getElementById('biereId').value = biere.id; 

        document.getElementById('createBiereForm').style.display = 'block';
    };

    // Charger les bières au démarrage
    fetchBieres(); 
});

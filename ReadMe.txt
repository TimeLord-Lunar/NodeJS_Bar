____________________________________________________________________________________________________________________________________________________________________________

Recommencement Projet Nodes Bar

Etape 1 : Commandes de base

BARS : 
  	POST /bars => Ajouter un bar		 --- FONCTIONNEL
  	
	PUT /bars/:id_bar => Modifier un bar	 --- FONCTIONNEL
  		
	DELETE /bars/:id_bar => Supprimer un bar --- FONCTIONNEL (variable id_bar supprimé, juste id maintenant)
  		
	GET /bars => Liste des bars		 --- FONCTIONNEL
  	GET /bars/:id_bar => Détail d'un bar	 --- FONCTIONNEL


BIERE : 
  	POST /bars/:id_bar/biere => Ajouter une bière à un bar   --- FONCTIONNEL
  		
	PUT /biere/:id_biere => Modifier une bière		 --- FONCTIONNEL
  		
	DELETE /biere/:id_biere => Supprimer une bière d'un bar	 --- FONCTIONNEL

  	GET /bars/:id_bar/biere => Liste des bières d'un bar	 --- FONCTIONNEL
  	GET /biere/:id_biere => Détail d'une bière		 --- FONCTIONNEL


COMMANDE : 
  	POST /bars/:id_bar/commandes => Ajouter une commande à un bar		---  FONCTIONNEL

  	PUT /commandes/:id_commande => Modifier une commande d'un bar		---  FONCTIONNEL

  	DELETE /commandes/:id_commande => Supprimer une commande d'un bar	---  FONCTIONNEL

  	GET /bars/:id_bar/commandes => Liste des commandes d'un bar		---  FONCTIONNEL
  	GET /commandes/:id => Détail d'une commande d'un bar			---  FONCTIONNEL


BIERE_COMMANDE : 
  	POST /commandes/:id/biere/:id => Ajouter une bière à une commande	---  FONCTIONNEL

  	DELETE /commandes/:id/biere/:id => Supprimer une bière d'une commande	---  FONCTIONNEL



Etape 2 : Mise en place de contraintes 

CONTRAINTES :

Le nom d'un bar doit être unique --- FONCTIONNEL

Le prix d'une bière doit être positif --- FONCTIONNEL
Le prix d'une commande doit être positif --- FONCTIONNEL

Tous les champs obligatoires doivent être renseignés --- FONCTIONNEL
    
Le statut d'une commande doit être "brouillon', "en cours" ou "terminée" --- FONCTIONNEL

Une commande ne peut pas être modifiée si elle est terminée --- FONCTIONNEL

La date d'une commande ne peut pas être supérieure à la date du jour --- FONCTIONNEL
Quand je supprime un bar, je supprime toutes les bières et les commandes associées --- FONCTIONNEL

Quand je supprime une bière, je supprime toutes les commandes associées	--- FONCTIONNEL
Quand je supprime une commande, je supprime toutes les biere_commande associées --- FONCTIONNEL



Etape 3 : Commandes avancées de niveau 1 

COMMANDES :

GET /bars/:id_bar/commandes?date=2021-01-01 => Liste des commandes d'un bar à une date donnée
GET /bars/:id_bar/commandes?prix_min=10&prix_max=20 => Liste des commandes d'un bar avec un prix compris entre 10 et 20
GET /bars?ville=Paris => Liste des bars d'une ville donnée	--- FONCTIONNEL
GET /bars?name=example => Liste des bars dont le nom contient "example" --- FONCTIONNEL
GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bar	--- FONCTIONNEL



Etape 4 : Commandes avancée de niveau 2

COMMANDES :

GET /bars/:id_bar/degree?prix_min=10&prix_max=20 => Degré d'alcool moyen des bières d'un bar avec un prix compris entre 10 et 20
GET /bars/:id_bar/degree?date=2021-01-01 => Degré d'alcool moyen des bières des commandes d'un bar à une date donnée
GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20 => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20
GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée
GET /bars/:id_bar/commandes?date=2021-01-01&prix_min=10&prix_max=20&status=terminée&name=example => Liste des commandes d'un bar à une date donnée avec un prix compris entre 10 et 20 et terminée et dont le nom contient "example"

GET /bars/:id_bar/biere?sort=asc => Liste des bières d'un bar triées par ordre alphabétique
GET /bars/:id_bar/biere?sort=desc => Liste des bières d'un bar triées par ordre alphabétique inversé
GET /bars/:id_bar/biere?sort=asc&limit=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10
GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5
GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10

GET /bars/:id_bar/biere?sort=asc&limit=10&offset=5&degree_min=5&degree_max=10&prix_min=10&prix_max=20 => Liste des bières d'un bar triées par ordre alphabétique et limitées à 10 en commençant à l'index 5 avec un degré d'alcool compris entre 5 et 10 et un prix compris entre 10 et 20 (amusez-vous bien)

GET /commande/details/:id_commande => Renvoie un PDF de la commande


***********************************
Notes sur le Routing, à lire pour y voir plus clair d'un coup d'oeil et continuer votre développement !

J'ai ajouté le routes dans le fichier routes/index.js.

Les views BudgetView et ProfileView ayant le même layout (sidebar + header + footer + contenu variable), c'est le composant layout/ClientInterface qui gère l'affichage des éléments communs. La structure des routes est la suivante:

📌 /accueil => composant HomeView

📌/espace-client => composant ClientInterface (inclue une balise RouterView qui injecte dynamiquement le contenu principal en fonction de la route (voir children)

- children: 

                📌 /espace-client/budget  => la  balise RouterView est remplacé par le composant BudgetView

                📌 /espace-client/profil => la  balise RouterView est remplacé par le composant ProfileView

J'ai mis les liens des pages Accueil, Budget et Profil dans App.vue pour y avoir accès facilement à toutes nos pages / que vous puissiez tester en attendant que le header soit fonctionnel, on pourra les effacer ensuite ! 

***********************************

Outil Gestion de projet :
    - Trello

Outil de communication :
    - Discord

Maquettes : 
    - Figma

Création Logo :
    - Logo illustrator




Plugins :
    - Vite => Installation et configuration
    - TailwindCSS => libraire de CSS
    - Pinia => Store et gestion de state
    - VueRouter => Navigation
    - SweetAlert2 => librairie d'animations pour les alertes
    - vuelidate => librairie de regles de validation de formulaire
    - vue-toastification => pastilles de confimations
    

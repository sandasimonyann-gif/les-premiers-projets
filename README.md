# Studio Marée – site vitrine

Site vitrine d'un studio créatif fictif (identité visuelle, sites web, motion design), réalisé en **HTML5**, **CSS3** et **Bootstrap 5**. Il sert de projet d'apprentissage du front-end : structure sémantique, mise en page en grille, responsive et accessibilité.

## Objectif

Présenter le studio et ses services en une seule page, lisible sur téléphone comme sur ordinateur, et permettre aux visiteurs de poser une question ou de lancer un projet via un formulaire de contact.

## Sections de la page

| Section | Contenu |
|---|---|
| **En-tête** | Logo, nom du studio et navigation (menu burger sur mobile) |
| **Hero** | Titre principal, accroche, bouton d'action et illustration |
| **Services** | 3 cartes : identité visuelle, sites web, motion design |
| **FAQ** | Accordéon de 3 questions/réponses |
| **Contact** | Formulaire (nom, email, sujet, message) avec validation HTML5 |
| **Pied de page** | Coordonnées, liens rapides et copyright en 3 colonnes |

## Structure du projet

```
.
├── index.html      # structure de la page
├── styles.css      # styles personnalisés qui complètent Bootstrap
├── images/
│   ├── hero.svg    # illustration du hero
│   └── logo.svg    # logo affiché à côté du nom dans la navbar
└── README.md
```

Bootstrap et les polices Google sont chargés par CDN : une connexion internet est nécessaire pour voir le rendu complet.

## Démarche responsive mobile-first

- **Mobile d'abord** : les styles de base de `styles.css` visent les petits écrans, puis des media queries `min-width` les enrichissent (768 px, 992 px, 1024 px).
- **Grille Bootstrap** : les colonnes passent de 1 à 2 puis 3 par ligne avec `col-12 col-md-6 col-lg-4`.
- **Unités relatives** : `rem` et `%` pour les tailles, marges et paddings.
- **Variables CSS** : couleurs et espacements regroupés dans `:root`, ajustés à chaque palier plutôt que réécrits.
- **Spécificité basse** : aucun ID dans le CSS, aucun `!important`, `styles.css` chargé après Bootstrap.

## Accessibilité

Un seul `h1` et des titres hiérarchisés, balises sémantiques (`header`, `nav`, `main`, `section`, `footer`), champs reliés à leur `<label for>`, lien d'évitement, focus clavier visible et contrastes vérifiés.

## Prévisualiser en local avec Live Server

1. Installez [Visual Studio Code](https://code.visualstudio.com/).
2. Dans l'onglet **Extensions** (`Ctrl+Shift+X`), recherchez **Live Server** (auteur : Ritwick Dey) et cliquez sur **Install**.
3. Ouvrez le dossier du projet : **Fichier > Ouvrir le dossier**.
4. Faites un clic droit sur `index.html` puis **Open with Live Server**, ou cliquez sur **Go Live** dans la barre d'état en bas à droite.
5. Le navigateur s'ouvre sur `http://127.0.0.1:5500`. La page se recharge automatiquement à chaque enregistrement.
6. Pour tester le responsive, ouvrez les outils de développement (`F12`) puis le mode appareil (`Ctrl+Shift+M`).
7. Pour arrêter le serveur, cliquez sur **Port : 5500** dans la barre d'état.

## À faire

- Brancher le formulaire à un service d'envoi (Formspree, Netlify Forms…) : l'attribut `action="#"` est provisoire.
- Ajouter une section « Réalisations ».
- Déployer le site (Netlify ou Vercel).

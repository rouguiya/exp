const express = require('express');
const app = express();
const port = 3000;

// Middleware pour vérifier l'heure de la demande
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0: dimanche, 1: lundi, ..., 6: samedi
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    // C'est un jour ouvrable entre 9h et 17h, continuez
    next();
  } else {
    // Hors des heures ouvrables, renvoyer une réponse avec un message approprié
    res.send('L\'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
  }
};

// Utilisation du middleware pour vérifier les heures de travail pour toutes les routes
app.use(checkWorkingHours);

// Configuration du moteur de modèle EJS
const ejs = require('ejs'); // <-- Add this line to import EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { currentPage: 'Accueil' });
});

app.get('/services', (req, res) => {
  res.render('services', { currentPage: 'Nos services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { currentPage: 'Contactez-nous' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});

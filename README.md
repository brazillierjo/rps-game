# Rock, Paper, Scissors – Next.js + TS + SCSS

## Commandes

```bash
pnpm install   # installer les dépendances
pnpm dev       # lancer le mode développement (localhost:3000)
pnpm build     # construire l'app pour la prod
```

(Le jeu est également disponible en ligne : https://rps-game-tau-five.vercel.app)

## Temps passé

- 1 h 40 pour l’implémentation complète du scope principal (PvP, scoreboard, responsive).
- 1 h 30 supplémentaires pour les bonus (UI, noms personnalisés, modes CPU, animations).

## Fonctionnement

1. **Modes de jeu** : choisir entre Player vs Player, Player vs Computer ou Computer vs Computer. Les messages s’adaptent automatiquement et la version bot vs bot dispose d’un bouton “Play round”.
2. **Joueurs** : chaque carte affiche le statut (actif, prêt, en attente) et permet de renommer le joueur humain. Un nom vide bloque la sélection d’un coup pour éviter les erreurs.
3. **Sélection des coups** : les moves sont animés (Framer Motion) et mettent en évidence qui a choisi quoi. Les bots jouent automatiquement avec de légers délais pour rester lisibles.
4. **Résultat & scoreboard** : la résolution de manche met à jour l’état, affiche un résumé clair et incrémente le scoreboard (victoires, égalités, rounds).
5. **UI responsive** : l’application reste utilisable sur mobile/tablette avec une sidebar compacte, des cartes adaptées et des boutons accessibles.

## Stack

- **Next.js 16** (App Router, TypeScript strict)
- **SCSS modules** pour le styling
- **Framer Motion** pour les animations (boutons de coups, scoreboard, résultats)
- **Radix Icons** pour l’iconographie légère

## Pistes d’amélioration

1. Sidebar mobile repliable (dropdown) pour afficher directement la zone de jeu.
2. Historique des rounds (log des coups, temps, gagnants).
3. Auto-play CPU vs CPU en continu avec contrôle de vitesse.
4. Persistance des scores (localStorage) pour retrouver sa session.

Bonne partie !***

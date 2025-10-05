# TODO

## Timon MVP

## UI

- [x] Add a start button
- [x] Display the sequence to the user
- [x] Animate the buttons when they light up
- [x] Animate the buttons when the user clicks them
- [ ] Remove the basic alert for wrong moves for a friendly toast
- [ ] Toggle a message when is the player turn

## Game Logic

- [x] Generate random sequences
- [x] Check if the user input matches the sequence
- [ ] Keep track of the score
  - [ ] localstorage
    - [ ] highscore
- [ ] End the game when the user makes a mistake
- [ ] Restart the game

---

## scaffold

```bash
timon/
├── src/
│ ├── index.ts
│ ├── game.ts (logique du jeu)
│ └── styles.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts (optionnel)
```

# Mila’s Fit Check

A dress-up styling game for ages 10 to 15. Read Mila’s messages, dress her for twelve different plans, then show her the mirror. Each look is scored out of 100 for the occasion, the weather, her vibe, colour harmony and styling, and earns up to five stars.

**Play it:** https://raymondchan2046.github.io/fit-check/

## Playing on an iPad

Open the link in Safari. To get an app-style icon, tap Share, then “Add to Home Screen”.

Stars and saved looks are kept in the browser on that device. They do not move to another device.

## What is in this folder

| File | What it is |
| --- | --- |
| `index.html` | The page itself |
| `style.css` | Colours, layout and type |
| `art.js` | Draws Mila and every piece of clothing |
| `data.js` | The wardrobe, the twelve plans and the scoring rules |
| `game.js` | Buttons, the mirror, the verdict and the lookbook |
| `fonts/` | The three typefaces (see `FONT-LICENSES.txt`) |
| `icon.png` | Home Screen icon |

There is nothing to build or install. Edit a file, and the site updates a minute or two after the change is saved to `main`.

To add a plan, copy one of the entries in `OCCASIONS` in `data.js`. To add a piece of clothing, add a line to `ITEMS` in `data.js` and a drawing with the same name in `art.js`.

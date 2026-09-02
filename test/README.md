# Bonne fête maman — 50 ans

Une petite page web : un fond pastel, des emoji qui tombent, une enveloppe à
ouvrir et une lettre posée sur une fleur.

## Fichiers

```
index.html              la structure, et le texte du message
style.css               les couleurs, l'enveloppe, la fleur, les animations
script.js               les emoji qui tombent, l'ouverture et la fermeture
images/fleur.png        la couronne de pétales
outils/genere_fleur.py  le script qui a fabriqué fleur.png
```

## Écrire ton message

Ouvre `index.html` et cherche le bloc marqué `ÉCRIS TON MESSAGE ICI`.
Remplace le texte de chaque `<p>` par le tien. Le premier `<p>` est le titre,
le dernier la signature.

La zone d'écriture est un cercle, donc l'espace est vite pris. Vise deux ou
trois courts paragraphes. Au delà, le texte devient scrollable, ce qui marche
mais se remarque moins bien.

## Changer la fleur

`images/fleur.png` est une image carrée à fond transparent. Tu peux la
remplacer par n'importe quelle autre, à trois conditions :

1. **Carrée**, sinon elle sera déformée par rapport au disque blanc.
2. **Fond transparent** (PNG ou WebP), sinon un carré blanc apparaîtra.
3. **Centre dégagé.** Le disque blanc du message couvre les 68 % centraux.
   Tout ce qui est dessiné à l'intérieur sera caché.

Pour en trouver une : cherche `watercolor flower png transparent` sur Unsplash
ou Pixabay, qui sont libres d'usage. Évite Google Images, les licences y sont
rarement claires.

Si ton image est plus petite ou plus grande que la fleur actuelle, ajuste
`--coeur` dans le bloc `:root` de `style.css` jusqu'à ce que la couronne de
pétales soit bien visible.

### Ou la refabriquer

`outils/genere_fleur.py` regénère `images/fleur.png`. Les couleurs et la forme
des pétales sont en haut du fichier, dans `COURONNES`.

```
pip install pillow
python3 outils/genere_fleur.py
```

Attention : la somme `distance + demi hauteur` doit rester sous 790, sinon les
pétales sont coupés au bord de l'image.

## Changer les emoji

Dans `script.js`, modifie la liste `EMOJIS` en haut du fichier.

## Changer les couleurs

Dans `style.css`, tout est regroupé dans le bloc `:root` au début.

## Tester en local

Double-clique sur `index.html`. Tout fonctionne sans serveur.

## Publier sur GitHub Pages

1. Crée un dépôt **public** sur GitHub, par exemple `anniversaire-maman`.
2. Dépose les fichiers à la **racine** du dépôt, en gardant le dossier
   `images/` à côté de `index.html`.
3. Va dans `Settings` puis `Pages`.
4. Sous `Source`, choisis `Deploy from a branch`, branche `main`,
   dossier `/ (root)`.
5. Après une ou deux minutes, la page est en ligne à l'adresse
   `https://TON-PSEUDO.github.io/anniversaire-maman/`

Le site est public : toute personne avec le lien peut le voir.

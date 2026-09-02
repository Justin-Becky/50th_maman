"""Génère images/fleur.png

Lance ce script pour refabriquer la fleur avec d'autres couleurs, une autre
forme de pétale ou un autre nombre de pétales. Rien d'autre dans le projet
n'en dépend: si tu remplaces images/fleur.png par ta propre image, tu peux
ignorer ce fichier.

    pip install pillow
    python3 outils/genere_fleur.py
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

# On dessine en grand puis on réduit: les bords sont plus nets
RENDU = 1600
FINAL = 1120
CENTRE = RENDU // 2

# Couleurs des pétales, du bout vers le coeur
GRAND_BOUT = (236, 170, 192)
GRAND_COEUR = (250, 222, 231)
PETIT_BOUT = (245, 202, 215)
PETIT_COEUR = (253, 243, 247)

# Une couronne = nombre de pétales, décalage angulaire, distance du centre,
# demi largeur, demi hauteur, couleur du bout, couleur du coeur
COURONNES = [
    (12, 0.0, 575, 100, 205, GRAND_BOUT, GRAND_COEUR),
    (12, 15.0, 515, 82, 160, PETIT_BOUT, PETIT_COEUR),
]


def degrade(couleur_bout, couleur_coeur):
    """Bande verticale du bout du pétale vers le coeur de la fleur."""
    bande = Image.new("RGB", (1, RENDU))
    pixels = bande.load()
    for y in range(RENDU):
        t = y / (RENDU - 1)
        pixels[0, y] = tuple(
            round(couleur_bout[i] + (couleur_coeur[i] - couleur_bout[i]) * t)
            for i in range(3)
        )
    return bande.resize((RENDU, RENDU))


def petale(distance, rx, ry, couleur_bout, couleur_coeur, angle):
    """Un pétale coloré, tourné autour du centre de l'image."""
    cy = CENTRE - distance
    masque = Image.new("L", (RENDU, RENDU), 0)
    ImageDraw.Draw(masque).ellipse(
        [CENTRE - rx, cy - ry, CENTRE + rx, cy + ry], fill=255
    )
    masque = masque.filter(ImageFilter.GaussianBlur(2))

    couche = degrade(couleur_bout, couleur_coeur).convert("RGBA")
    couche.putalpha(masque)
    return couche.rotate(angle, resample=Image.BICUBIC, center=(CENTRE, CENTRE))


def construit():
    fleur = Image.new("RGBA", (RENDU, RENDU), (0, 0, 0, 0))

    for nombre, decalage, distance, rx, ry, bout, coeur in COURONNES:
        pas = 360 / nombre
        for i in range(nombre):
            couche = petale(distance, rx, ry, bout, coeur, decalage + i * pas)
            fleur = Image.alpha_composite(fleur, couche)

    return fleur.resize((FINAL, FINAL), Image.LANCZOS)


if __name__ == "__main__":
    destination = Path(__file__).resolve().parent.parent / "images"
    destination.mkdir(exist_ok=True)
    chemin = destination / "fleur.png"
    construit().save(chemin, optimize=True)
    print("écrit:", chemin)

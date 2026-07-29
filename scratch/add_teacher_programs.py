import re

file_path = "src/lib/programs-data.ts"
with open(file_path, "r") as f:
    content = f.read()

# Add the two programs to PROGRAMS_DATA
programs = """
  "nour-al-bayan": {
    title: "Formation Enseignant de Tajwid",
    duration: "4 mois",
    tag: "Pédagogie & Tajwid",
    price: "Sur Devis",
    hook: "Apprendre à enseigner le Tajwid avec une méthode éprouvée et devenir un véritable pédagogue.",
    description: `Tu connais peut-être déjà les règles du Tajwid. Tu récites correctement. Mais lorsqu'il faut transmettre ce savoir, beaucoup réalisent qu'il existe une différence entre connaître une science… et savoir l'enseigner.\n\nC'est précisément pour répondre à ce besoin qu'a été créée la Formation Enseignant de Tajwid. L'objectif est de former des enseignants capables de transmettre le Coran avec rigueur, pédagogie et bienveillance.\n\n📚 **Module 1 — Enseigner le Tajwid**\nMéthode pédagogique exclusive Les Clés du Coran (adaptation francophone inspirée de Nour Al Bayan).\n\n🧠 **Module 2 — « Apprendre à apprendre »**\nPiliers de l'apprentissage, mémorisation, gestion de classe, psychologie et posture de l'enseignant.\n\n🎙️ **Module 3 — Perfectionnement de la récitation**\nVérification et correction de ta lecture pour t'assurer une parfaite maîtrise des règles à enseigner.`,
    features: [
      { t: "Progression logique", d: "Construire une progression pédagogique adaptée à chaque élève." },
      { t: "Simplicité", d: "Savoir présenter chaque règle de Tajwid avec des mots simples." },
      { t: "Gestion de classe", d: "Maintenir l'attention des élèves et corriger sans décourager." },
      { t: "Certification", d: "Examen final et obtention d'un diplôme d'enseignant ISHES." }
    ],
    whyMe: [
      "Deux cours par semaine : le lundi et le jeudi en direct",
      "Replays accessibles pendant toute la durée",
      "Perfectionnement de la récitation inclus (Module 3)",
      "Tous les supports inclus (Méthode Les Clés du Coran)"
    ]
  },
  "tarbya-islamya": {
    title: "Formation Enseignant Tarbya Islamiya",
    duration: "4-5 mois",
    tag: "Éducation & Valeurs",
    price: "Sur Devis",
    hook: "Transmettre les valeurs de l'Islam avec pédagogie et former la génération musulmane de demain.",
    description: `Tu aimes transmettre l'Islam aux enfants. Tu possèdes peut-être déjà des connaissances religieuses. Mais très vite, une réalité apparaît : comment parler d'ALLAH à un enfant ? Comment lui faire aimer son Seigneur plutôt que de lui transmettre uniquement des connaissances ?\n\nLa plupart des enseignants n'ont jamais reçu de véritable formation pédagogique. C'est précisément pour répondre à ce besoin qu'a été créée cette formation, fruit de plus de 15 ans d'expérience de l'Institut ISHES.\n\nL'objectif est de former des éducateurs capables d'éveiller les cœurs, de développer l'amour d'ALLAH et d'accompagner les enfants dans leur cheminement spirituel.\n\n📚 **Module 1 — Maîtriser et transmettre la Tarbya Islamiya**\nRôle de l'enseignant, fondements de la spiritualité, piliers de l'Islam et de la foi, calendrier musulman, utilisation des histoires.\n\n🧠 **Module 2 — « Apprendre à apprendre »**\nPiliers de l'apprentissage, gestion de classe, prévention des conflits, création de cours interactifs et accompagnement personnalisé.`,
    features: [
      { t: "Transmettre l'Islam", d: "Maîtriser les grands thèmes de l'éducation islamique de manière vivante." },
      { t: "Storytelling", d: "Savoir utiliser les histoires et récits pour rendre les enseignements concrets." },
      { t: "Bienveillance", d: "Adopter une posture d'enseignant bienveillant, inspirant et respecté." },
      { t: "Certification", d: "Possibilité de stage pratique et remise d'un diplôme officiel ISHES." }
    ],
    whyMe: [
      "Deux cours par semaine (lundi et jeudi à 19h30)",
      "Replays accessibles et formation pratique",
      "Manuels pédagogiques et supports complets inclus",
      "Suivi pédagogique continu et mentorat post-formation"
    ]
  }
"""

# Insert before the last closing brace of PROGRAMS_DATA
pos = content.rfind("};")
if pos != -1:
    new_content = content[:pos] + ",\n" + programs + content[pos:]
    with open(file_path, "w") as f:
        f.write(new_content)
    print("Successfully added programs.")
else:
    print("Could not find the end of PROGRAMS_DATA.")


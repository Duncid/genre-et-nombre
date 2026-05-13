export interface QuestionGuessItem {
  answer: string;
  question: string;
}

// Réponses simples — l'enfant doit deviner la question correspondante (à l'oral avec le parent).
export const questionGuessItems: QuestionGuessItem[] = [
  { answer: "Je m'appelle Léo.", question: "Comment t'appelles-tu ?" },
  { answer: "J'ai sept ans.", question: "Quel âge as-tu ?" },
  { answer: "J'habite à Paris.", question: "Où habites-tu ?" },
  { answer: "Ma couleur préférée est le bleu.", question: "Quelle est ta couleur préférée ?" },
  { answer: "Je mange une pomme.", question: "Que manges-tu ?" },
  { answer: "Il fait beau aujourd'hui.", question: "Quel temps fait-il ?" },
  { answer: "Je vais à l'école.", question: "Où vas-tu ?" },
  { answer: "C'est un chat.", question: "Qu'est-ce que c'est ?" },
  { answer: "Le chat dort sur le canapé.", question: "Où dort le chat ?" },
  { answer: "J'ai deux frères.", question: "Combien as-tu de frères ?" },
  { answer: "Mon papa s'appelle Marc.", question: "Comment s'appelle ton papa ?" },
  { answer: "Je joue au foot.", question: "À quoi joues-tu ?" },
  { answer: "Nous sommes mercredi.", question: "Quel jour sommes-nous ?" },
  { answer: "Il est huit heures.", question: "Quelle heure est-il ?" },
  { answer: "Je veux un gâteau au chocolat.", question: "Que veux-tu ?" },
  { answer: "C'est mon livre.", question: "À qui est ce livre ?" },
  { answer: "J'aime lire des histoires.", question: "Qu'est-ce que tu aimes faire ?" },
  { answer: "Mon meilleur ami s'appelle Tom.", question: "Comment s'appelle ton meilleur ami ?" },
  { answer: "Je vais à la piscine demain.", question: "Quand vas-tu à la piscine ?" },
  { answer: "Le ciel est bleu.", question: "De quelle couleur est le ciel ?" },
  { answer: "J'ai un chien à la maison.", question: "Quel animal as-tu ?" },
  { answer: "Je bois du jus d'orange.", question: "Que bois-tu ?" },
  { answer: "L'école commence à huit heures et demie.", question: "À quelle heure commence l'école ?" },
  { answer: "Je rentre à la maison en bus.", question: "Comment rentres-tu à la maison ?" },
];

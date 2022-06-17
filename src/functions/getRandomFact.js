import facts from "../assets/dogFacts";

const getRandomFact = () => {
  return facts[Math.floor(Math.random() * facts.length)];
};

export default getRandomFact;

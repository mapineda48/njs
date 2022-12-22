import { LoremIpsum } from "lorem-ipsum";
import PDF from "../PDF";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const foo = lorem.generateParagraphs(70);

export default function Example2() {
  return (
    <PDF
      height={100}
      Header={<div>Header...</div>}
      Content={<div>{foo}</div>}
      Footer={<div>Footer...</div>}
    />
  );
}

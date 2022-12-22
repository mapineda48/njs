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
  const Header = <div>Header...</div>;

  const Content = <div>{foo}</div>;

  const Footer = <div>Footer...</div>;

  return (
    <PDF
      height={{
        header: 100,
        footer: 50,
      }}
      Header={Header}
      Content={Content}
      Footer={Footer}
    />
  );
}

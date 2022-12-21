import { LoremIpsum } from "lorem-ipsum";
import './index.css';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


const foo = lorem.generateParagraphs(70);

export default function Example() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <div className="header-space">&nbsp;</div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="content">{foo}</div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className="footer-space">&nbsp;</div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="header">header</div>
      <div className="footer">footer</div>
    </div>
  );
}

export default function PDF(props: Props) {
  const height = props.height ?? {};
  const { footer = 100, header = 300 } = height;

  return (
    <div>
      <table>
        {props.Header ? (
          <thead>
            <tr>
              <td>
                <div style={{ height:header }}>&nbsp;</div>
              </td>
            </tr>
          </thead>
        ) : null}
        {props.Content ? (
          <tbody>
            <tr>
              <td>
                <div>{props.Content}</div>
              </td>
            </tr>
          </tbody>
        ) : null}
        {props.Footer ? (
          <tfoot>
            <tr>
              <td>
                <div style={{ height:footer }}>&nbsp;</div>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
      {props.Header ? (
        <div style={{ position: "fixed", height:header, top: 0 }}>{props.Header}</div>
      ) : null}
      {props.Footer ? (
        <div style={{ position: "fixed", height:footer, bottom: 0 }}>
          {props.Footer}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Types
 */
export interface Props {
  height?: HeightSection;
  Header?: JSX.Element;
  Content?: JSX.Element;
  Footer?: JSX.Element;
}

export interface HeightSection {
  header?: number;
  footer?: number;
}

export default function PDF(props: Props) {
  const height = props.height ?? 100;

  return (
    <div>
      <table>
        {props.Header ? (
          <thead>
            <tr>
              <td>
                <div style={{ height }}>&nbsp;</div>
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
                <div style={{ height }}>&nbsp;</div>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
      {props.Header ? (
        <div style={{ position: "fixed", height, top: 0 }}>{props.Header}</div>
      ) : null}
      {props.Footer ? (
        <div style={{ position: "fixed", height, bottom: 0 }}>
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
  height?: number;
  Header?: JSX.Element;
  Content?: JSX.Element;
  Footer?: JSX.Element;
}

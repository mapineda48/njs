import useStyle from "./styles";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
  const style = useStyle();

  return (
    <div className={style.root}>
      <CircularProgress size={30} />
    </div>
  );
}

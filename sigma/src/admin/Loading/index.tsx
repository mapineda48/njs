import style from "./index.module.scss";

export default function Loading() {
  return (
    <div className={style._}>
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
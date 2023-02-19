import React from "react";
import { usePortalToBody, Props as PropsPortal } from "Component/Portal";
import { useModal } from "./useModal";

/**
 * https://getbootstrap.com/docs/5.3/components/modal/
 */

export function useConfirmModal() {
  return usePortalToBody(ConfirmModal);
}

export function ConfirmModal(props: Props) {
  const { remove } = props;
  const ref = useModal<HTMLDivElement>(remove);

  return (
    <div
      ref={ref}
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {props.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">{props.message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={props.onConfirm}
            >
              {props.label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Types
 */
interface Props extends PropsPortal, ConfirmOptions {}

interface ConfirmOptions {
  title: string;
  message: string;
  label: string;
  onConfirm?: () => void;
}

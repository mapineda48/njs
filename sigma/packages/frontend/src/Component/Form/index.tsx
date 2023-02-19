import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Form(props: Props) {
  const {
    onSubmit,
    onInvalid,
    resetForm,
    preventDefault,
    stopPropagation,
    ...rest
  } = props;

  const {
    mode,
    reValidateMode,
    defaultValues,
    values,
    resetOptions,
    resolver,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
    ...coreProps
  } = rest;

  const methods = useForm({
    mode,
    reValidateMode,
    defaultValues,
    values,
    resetOptions,
    resolver,
    context,
    shouldFocusError,
    shouldUnregister,
    shouldUseNativeValidation,
    criteriaMode,
    delayError,
  });

  React.useEffect(() => {
    if (resetForm) {
      methods.reset();
    }
  }, [methods, resetForm]);

  return (
    <FormProvider {...methods}>
      <form
        {...coreProps}
        onSubmit={methods.handleSubmit((data, event) => {
          if (preventDefault && event) {
            event.preventDefault();
          }

          if (stopPropagation && event) {
            event.stopPropagation();
          }
          onSubmit(data, event);
        }, onInvalid)}
      />
    </FormProvider>
  );
}

/**
 * Types
 */

export type Props = BaseProps & HookProps;

interface BaseProps extends CoreProps {
  onSubmit: OnValid;
  onInvalid?: OnInvalid;
  resetForm?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}

type CoreProps = Omit<JSX.IntrinsicElements["form"], "onSubmit" | "onInvalid">;

// React hook form
export type RegisterOptions = RegisterParams[1];
export type RegisterParams = Parameters<Register>;
export type Register = Methods["register"];
export type Methods = ReturnType<UseForm>;
export type OnInvalid = HandlerSubmitParamas[1];
export type OnValid = HandlerSubmitParamas[0];
export type HandlerSubmitParamas = Parameters<HandlerSubmit>;
export type HandlerSubmit = Methods["handleSubmit"];
export type Reset = Methods["reset"];
export type HookProps = HookParams[0];
export type HookParams = Parameters<UseForm>;
export type UseForm = typeof useForm;

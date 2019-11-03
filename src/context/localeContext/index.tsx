import React, { createContext, SetStateAction, useState } from "react";
import { ReactNode } from "react";
import { Dispatch } from "react";

type Props = {
  children: ReactNode;
};

type Context = {
  context: { locale: string };
  setContext: Dispatch<SetStateAction<Context>>;
};

const initialContext: Context = {
  context: { locale: "sv" },
  setContext: (): void => {
    throw new Error("setLocale function must be overridden");
  }
};

const LocaleContext = createContext<Context>(initialContext);

const LocaleProvider = ({ children }: Props): JSX.Element => {
  const [context, setContext] = useState<Context>(initialContext);

  return (
    <LocaleContext.Provider value={{ ...context, setContext }}>
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext, LocaleProvider };

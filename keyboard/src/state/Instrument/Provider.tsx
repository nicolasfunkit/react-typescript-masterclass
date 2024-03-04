import { FunctionComponent, ReactNode, useState } from "react"
import { DEFAULT_INSTRUMENT } from "../../domain/sound"
import { InstrumentContext } from "./Context"

interface InstrumentContextProviderProps {
  children: ReactNode; // Définir explicitement 'children' comme étant de type ReactNode
}

export const InstrumentContextProvider: FunctionComponent<InstrumentContextProviderProps> = ({
  children
}) => {
  const [instrument, setInstrument] = useState(DEFAULT_INSTRUMENT)

  return (
    <InstrumentContext.Provider value={{ instrument, setInstrument }}>
      {children}
    </InstrumentContext.Provider>
  )
}

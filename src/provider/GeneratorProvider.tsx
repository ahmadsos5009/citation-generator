import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react"
import { Citation, CitationDocumentType, CitationStyle } from "../types"
import {
  Control,
  FieldValues,
  useForm,
  UseFormResetField,
  UseFormReset,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

export const GeneratorContext = createContext<{
  xml: string
  style: CitationStyle
  citation: Citation
  documentType: CitationDocumentType
  control: Control
  reset: UseFormReset<FieldValues>
  register: UseFormRegister<FieldValues>
  resetField: UseFormResetField<FieldValues>
  setCitation: (citation: Citation, type: CitationDocumentType) => Citation
  setValue: UseFormSetValue<FieldValues>
  setDocumentType: Dispatch<SetStateAction<CitationDocumentType>>
}>({
  citation: {} as Citation,
  xml: "",
  style: "apa",
  documentType: CitationDocumentType.JOURNAL,
  control: {} as Control,
  setCitation: () => ({} as Citation),
  setDocumentType: () => "",
  setValue: () => "",
  reset: () => "",
  register: () => ({} as never),
  resetField: () => "",
})

export const GeneratorProvider: React.FC<{ xml: string; style: CitationStyle }> = ({
  children,
  xml,
  style,
}) => {
  const { control, reset, resetField, register, setValue, watch } = useForm()
  const formCitation = watch()

  const [documentType, setDocumentType] = useState<CitationDocumentType>(
    CitationDocumentType.JOURNAL,
  )

  const [runtimeCitation, setRuntimeCitation] = useState<
    { [k in CitationDocumentType]: Citation }
  >({
    [CitationDocumentType.JOURNAL]: {},
    [CitationDocumentType.BOOK]: {},
    [CitationDocumentType.REPORT]: {},
    [CitationDocumentType.WEBSITE]: {},
  })

  const setCitation = useCallback(
    (citation: Citation, type: CitationDocumentType) => {
      setRuntimeCitation({ ...runtimeCitation, [documentType]: citation })
      return runtimeCitation[type]
    },
    [runtimeCitation, documentType],
  )

  return (
    <GeneratorContext.Provider
      value={{
        xml,
        style,
        citation: formCitation,
        documentType,
        control,
        register,
        reset,
        resetField,
        setCitation,
        setValue,
        setDocumentType,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  )
}

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
import { CopyOption, PreviewMode } from "../components/form/CitationToolbar"

export const GeneratorContext = createContext<{
  xml: string
  style: CitationStyle
  citation: Citation
  documentType: CitationDocumentType
  previewMode: PreviewMode
  copyOption: CopyOption
  control: Control
  reset: UseFormReset<FieldValues>
  register: UseFormRegister<FieldValues>
  resetField: UseFormResetField<FieldValues>
  setCitation: (citation: Citation, type: CitationDocumentType) => Citation
  setValue: UseFormSetValue<FieldValues>
  setDocumentType: Dispatch<SetStateAction<CitationDocumentType>>
  setPreviewMode: Dispatch<SetStateAction<PreviewMode>>
  setCopyOption: Dispatch<SetStateAction<CopyOption>>
}>({
  citation: {} as Citation,
  xml: "",
  style: "apa",
  documentType: CitationDocumentType.JOURNAL,
  previewMode: "citation",
  copyOption: "text",
  control: {} as Control,
  setCitation: () => ({} as Citation),
  setDocumentType: () => "",
  setPreviewMode: () => "",
  setCopyOption: () => "",
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

  const [previewMode, setPreviewMode] = useState<PreviewMode>("citation")
  const [copyOption, setCopyOption] = useState<CopyOption>("text")

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
        previewMode,
        copyOption,
        control,
        register,
        reset,
        resetField,
        setCitation,
        setValue,
        setDocumentType,
        setPreviewMode,
        setCopyOption,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  )
}

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react"
import { Citation, CitationStyle, DocumentType } from "../types"
import {
  FieldValues,
  useForm,
  UseFormResetField,
  UseFormReset,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"
import { CopyOption, PreviewMode } from "../components/form/CitationToolbar"

const initialDocuments = {
  article: {},
  "article-magazine": {},
  "article-newspaper": {},
  "article-journal": {},
  bill: {},
  book: {},
  chapter: {},
  "entry-dictionary": {},
  "entry-encyclopedia": {},
  graphic: {},
  legislation: {},
  legal_case: {},
  manuscript: {},
  map: {},
  "paper-conference": {},
  patent: {},
  post: {},
  "post-weblog": {},
  personal_communication: {},
  report: {},
  speech: {},
  thesis: {},
  webpage: {},
}

export const GeneratorContext = createContext<{
  xml: string
  style: CitationStyle
  note?: boolean
  citation: Citation
  documentType: DocumentType
  previewMode: PreviewMode
  copyOption: CopyOption
  reset: UseFormReset<FieldValues>
  register: UseFormRegister<FieldValues>
  resetField: UseFormResetField<FieldValues>
  setCitation: (citation: Citation, type: DocumentType) => Citation
  setValue: UseFormSetValue<FieldValues>
  setDocumentType: Dispatch<SetStateAction<DocumentType>>
  setPreviewMode: Dispatch<SetStateAction<PreviewMode>>
  setCopyOption: Dispatch<SetStateAction<CopyOption>>
}>({
  citation: {} as Citation,
  xml: "",
  style: "apa",
  note: false,
  documentType: "article-journal",
  previewMode: "citation",
  copyOption: "text",
  setCitation: () => ({} as Citation),
  setDocumentType: () => "",
  setPreviewMode: () => "",
  setCopyOption: () => "",
  setValue: () => "",
  reset: () => "",
  register: () => ({} as never),
  resetField: () => "",
})

export const GeneratorProvider: React.FC<{
  xml: string
  style: CitationStyle
  note?: boolean
}> = ({ children, xml, style, note }) => {
  const { reset, resetField, register, setValue, watch } = useForm()
  const formCitation = watch()

  const [previewMode, setPreviewMode] = useState<PreviewMode>("citation")
  const [copyOption, setCopyOption] = useState<CopyOption>("text")

  const [documentType, setDocumentType] = useState<DocumentType>("article-journal")

  const [runtimeCitation, setRuntimeCitation] =
    useState<{ [k in DocumentType]: Citation }>(initialDocuments)

  const setCitation = useCallback(
    (citation: Citation, type: DocumentType) => {
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
        note,
        citation: formCitation,
        documentType,
        previewMode,
        copyOption,
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

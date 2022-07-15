export const validateFeedback = (feedback: string): string | undefined => {
  const isValid = feedback.trim().length > 4 && feedback.length < 200
  return (isValid && feedback) || undefined
}

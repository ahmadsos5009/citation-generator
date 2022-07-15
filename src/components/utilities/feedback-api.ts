const JSON_API_URL = "https://api.jsonbin.io"
const API_END_PONT = "/v3/b"

export default async (feedback: string): Promise<boolean> => {
  const response = await fetch(`${JSON_API_URL}${API_END_PONT}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Bin-Name": "citation-generator",
      "X-Master-Key": process.env.FEEDBACK_API_KEY || "",
    },
    method: "POST",
    body: JSON.stringify({ feedback: feedback }),
  })

  return response.status === 200
}

const JSON_API_URL = "https://api.jsonbin.io"
const API_END_PONT = "/v3/b"

export default async (feedback: string): Promise<boolean> => {
  const response = await fetch(`${JSON_API_URL}${API_END_PONT}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Bin-Name": "citation-generator",
      "X-Master-Key": "$2b$10$DJagMXkM455rbbxOtIOMLuijNmFvsKzs/taFCNuN8bYQE.kiEv3Be",
    },
    method: "POST",
    body: JSON.stringify({ feedback: feedback }),
  })

  return response.status === 200
}

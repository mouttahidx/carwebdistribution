import axios from "axios";

export default async function POST(req, res) {
  if (req.method === "GET") {
    res.status(405).json({ message: "bad request" });
    return;
  }
  try {
    const results = await axios.post(
      process.env.NEXT_PUBLIC_ENV === "test"
        ? "https://ppp-test.safecharge.com/ppp/api/v1/openOrder.do"
        : "https://secure.safecharge.com/ppp/api/v1/openOrder.do",
      req.body.data
    );

    if (results.data.sessionToken) {
      res.status(200).json({ data: results.data.sessionToken });
    } else {
      res.status(404).json({ data: "Merci de réessayer" });
    }
  } catch (error) {
    res.status(400).json({ data: error });
  }
}

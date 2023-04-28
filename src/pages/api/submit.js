// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    const { method } = req
    switch (method) {
        case "GET":
            res.status(200).json("Submit Application")
        case "POST":
            res.status(200).json({ response: "Successful", body: req.body })
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${method} not allowed`)
    }
}

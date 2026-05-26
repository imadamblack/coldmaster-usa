import { google } from 'googleapis';

export default function SaveGsheet(req, res) {
  const {method, body} = req;

  if (method !== 'POST') {
    return res.status(405).send({message:'Only POST request allowed'})
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ]
  })

  const sheets = google.sheets({
    auth,
    version: 'v4'
  })

  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'A1:E1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [Object.keys(body).map((key) => body[key])]
    }
  })
    .then((r) => res.status(200).json({ data: r.data }))
    .catch((err) => {
      res.status(500).send({message: 'Something went wrong', err});
    })
}
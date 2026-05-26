export default function SaveOnGSheet(data) {
  return fetch('/api/save-gsheet', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      date: new Date().toLocaleString('es-MX', {timeZone: 'America/Mexico_City'})
    })
  })
    .then((r) => r.json())
    .then((res) => res)
}
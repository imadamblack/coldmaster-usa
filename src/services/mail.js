export default function SendMail(data) {
  return fetch('/api/send-mail', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then((r) => r.json())
    .then((res) => res)
}
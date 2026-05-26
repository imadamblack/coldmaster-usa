import sgMail from "@sendgrid/mail";
import { info } from "../../../info";

export default function SendMail(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).send({ message: "Only POST request allowed" });
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msgBody = `
    <strong>${info.email.subject}</strong>
    <br/><br/>
    ${Object.keys(body).map((key) => `<div>${key}: ${body[key]}</div>`)}
    <br/>
    ${
      body.phone &&
      `<a href="https://wa.me/+52${
        body.phone.replace(/\+52|[()\s-]/g, "") ?? ""
      }">Enviar whatsapp</a>`
    }
  `;
  const msg = {
    to: info.email.recipients,
    from: info.email.sender,
    subject: info.email.subject,
    html: msgBody,
  };

  return sgMail
    .send(msg)
    .then((r) =>
      res.status(r[0].statusCode).json({
        message: "Email Sent",
        body,
      })
    )
    .catch((error) => {
      console.log("Something failed", error);
      res.status(error.code).json(error.response.body);
    });
}

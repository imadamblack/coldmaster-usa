import { getCookie } from 'cookies-next';

export default function fbEvent(
  eventName,
  userData = {
    phone: '',
    email: '',
    externalID: '',
  },
  eventID = Date.now(),
) {
  const payload = JSON.stringify({
    eventName,
    eventID,
    user: {
      ph: userData.phone || '',
      em: userData.email || '',
      externalID: userData.externalID,
    },
  });

  fbq('track', eventName, {fbc: getCookie('_fbc')}, {eventID});

  return fetch(`/api/fb-event`, {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch(err => console.log(err));
}

export function gtagSendEvent(conversionId, data = {}) {
  const fullName = data.fullName ?? '';
  const phone = data.phone ?? '';
  const [firstName = '', lastName = ''] = fullName.split(' ');

  gtag('set', 'user_data', {
    phone_number: phone.trim(),
    address: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    },
  });

  gtag('event', 'conversion', {
    send_to: `AW-17809814013/${conversionId}`,
    event_callback: () => {},
  });


  return false;
}

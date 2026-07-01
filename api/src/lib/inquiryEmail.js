// ----------------------------------------------------------------------------
// Sends inquiry notifications via Web3Forms (https://web3forms.com).
//
// Set WEB3FORMS_ACCESS_KEY as a Worker secret (api/.dev.vars locally).
// Notification inbox is configured in the Web3Forms dashboard, not here.
// ----------------------------------------------------------------------------

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export function buildInquiryEmail({ name, email, productSlug, subject, message }) {
  const safeName = name.replace(/[\r\n]/g, ' ');
  const subjectLine =
    subject?.trim() ||
    (productSlug ? `Order inquiry: ${productSlug}` : `Website inquiry from ${safeName}`);

  const lines = [`Name: ${name}`, `Email: ${email}`];
  if (productSlug) lines.push(`Product: ${productSlug}`);
  if (subject?.trim()) lines.push(`Subject: ${subject.trim()}`);
  lines.push('', 'Message:', message);

  return { safeName, subjectLine, text: lines.join('\n') };
}

export async function sendInquiryEmail(env, inquiry) {
  const accessKey = env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return { sent: false, reason: 'web3forms-not-configured' };
  }

  const { subjectLine, text } = buildInquiryEmail(inquiry);

  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name: inquiry.name,
      email: inquiry.email,
      replyto: inquiry.email,
      subject: subjectLine,
      message: text,
      from_name: 'KIMONO Art Nails',
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (res.status !== 200 || !data.success) {
    const detail = data.message || `Web3Forms responded with status ${res.status}`;
    throw new Error(detail);
  }

  return { sent: true };
}

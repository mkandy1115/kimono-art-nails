// ----------------------------------------------------------------------------
// Sends inquiry notifications via the Cloudflare Email Service Worker binding.
//
// Prerequisites (Cloudflare dashboard):
//   1. Email Routing → verify destination inbox (CONTACT_INBOX).
//   2. Email Sending → onboard your shop domain for CONTACT_FROM.
//   3. wrangler.jsonc → send_email binding with matching destination_address.
//
// Use CONTACT_FROM as `from` (your authenticated domain). Put the customer's
// address in replyTo so you can hit Reply in your inbox.
// ----------------------------------------------------------------------------

const DEFAULT_FROM = 'hello@kimonoartnails.com';

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
  const emailBinding = env.EMAIL;
  const inbox = env.CONTACT_INBOX?.trim();
  const from = env.CONTACT_FROM?.trim() || DEFAULT_FROM;

  if (!emailBinding || !inbox) {
    return { sent: false, reason: 'email-not-configured' };
  }

  const { safeName, subjectLine, text } = buildInquiryEmail(inquiry);

  await emailBinding.send({
    from,
    to: inbox,
    replyTo: inquiry.email,
    subject: subjectLine,
    text,
  });

  return { sent: true };
}

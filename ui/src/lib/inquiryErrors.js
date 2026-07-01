const ERROR_KEYS = {
  'A name is required.': 'inquiry.errors.nameRequired',
  'Name is too long.': 'inquiry.errors.nameTooLong',
  'A valid email is required.': 'inquiry.errors.emailInvalid',
  'A message is required.': 'inquiry.errors.messageRequired',
  'The message is too long.': 'inquiry.errors.messageTooLong',
  'Could not save your inquiry. Please try again.': 'inquiry.errors.saveFailed',
  'Invalid JSON in request body': 'inquiry.errors.invalidRequest',
  'Validation failed': 'inquiry.errors.validationFailed',
  'Something went wrong.': 'inquiry.errors.generic',
};

export function translateInquiryError(message, t) {
  if (!message) return t('inquiry.errorDefault');
  const parts = String(message).split(/\s{2,}/).filter(Boolean);
  let translatedAny = false;
  const translated = parts.map((part) => {
    const key = ERROR_KEYS[part.trim()];
    if (key) {
      translatedAny = true;
      return t(key);
    }
    return part.trim();
  });
  if (!translatedAny && /^Request failed:/.test(message)) {
    return t('inquiry.errorDefault');
  }
  return translated.join(' ') || t('inquiry.errorDefault');
}

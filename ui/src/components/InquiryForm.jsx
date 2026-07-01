import { useEffect, useState } from 'react';
import { submitInquiry } from '../api/client.js';
import { ArrowIcon } from './icons.jsx';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function InquiryForm({ productSlug = null, defaultSubject = '' }) {
  const { t, messages } = useLocale();
  const ph = messages.inquiry.placeholders;
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: defaultSubject,
    message: '',
  });
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    setForm((f) => ({ ...f, subject: defaultSubject }));
  }, [defaultSubject]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      await submitInquiry({ ...form, productSlug });
      setState('success');
      setForm({ name: '', email: '', subject: defaultSubject, message: '' });
    } catch (err) {
      setError(err.message || t('inquiry.errorDefault'));
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__mark" aria-hidden="true">✦</span>
        <h3 className="serif">{t('inquiry.thankYou')}</h3>
        <p className="muted">{t('inquiry.success')}</p>
        <button type="button" className="btn btn--ghost" onClick={() => setState('idle')}>
          {t('inquiry.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <label className="field">
          <span className="field__label">{t('inquiry.name')}</span>
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            required
            minLength={2}
            autoComplete="name"
            placeholder={ph.name}
          />
        </label>
        <label className="field">
          <span className="field__label">{t('inquiry.email')}</span>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            required
            autoComplete="email"
            placeholder={ph.email}
          />
        </label>
      </div>

      <label className="field">
        <span className="field__label">{t('inquiry.subject')}</span>
        <input
          type="text"
          value={form.subject}
          onChange={update('subject')}
          placeholder={ph.subject}
        />
      </label>

      <label className="field">
        <span className="field__label">{t('inquiry.message')}</span>
        <textarea
          value={form.message}
          onChange={update('message')}
          required
          minLength={5}
          rows={5}
          placeholder={ph.message}
        />
      </label>

      {state === 'error' && <p className="form__error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
        {state === 'sending' ? t('inquiry.sending') : t('inquiry.send')}
        {state !== 'sending' && <ArrowIcon className="btn__arrow" />}
      </button>
    </form>
  );
}

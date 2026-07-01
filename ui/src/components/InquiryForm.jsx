import { useState } from 'react';
import { submitInquiry } from '../api/client.js';
import { ArrowIcon } from './icons.jsx';

export default function InquiryForm({ productSlug = null, defaultSubject = '' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: defaultSubject,
    message: '',
  });
  const [state, setState] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');

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
      setError(err.message || 'Something went wrong. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="form-success" role="status">
        <span className="form-success__mark" aria-hidden="true">✦</span>
        <h3 className="serif">Thank you!</h3>
        <p className="muted">
          Your inquiry has been received. For the fastest reply, DM us on Instagram — we usually
          respond quicker there than by email.
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setState('idle')}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <label className="field">
          <span className="field__label">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            required
            minLength={2}
            autoComplete="name"
            placeholder="Your name"
          />
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="field">
        <span className="field__label">Subject</span>
        <input
          type="text"
          value={form.subject}
          onChange={update('subject')}
          placeholder="What's this about?"
        />
      </label>

      <label className="field">
        <span className="field__label">Message</span>
        <textarea
          value={form.message}
          onChange={update('message')}
          required
          minLength={5}
          rows={5}
          placeholder="Tell us which set you'd like, your sizing, and any questions."
        />
      </label>

      {state === 'error' && <p className="form__error" role="alert">{error}</p>}

      <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send inquiry'}
        {state !== 'sending' && <ArrowIcon className="btn__arrow" />}
      </button>
    </form>
  );
}

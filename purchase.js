/* =============================================
   GameStoB — Purchase Form Validation
   5 Components: text input, number input,
                 select, checkbox, radio
   5 Validations: empty check, length check,
                  range check, credit card luhn,
                  expiry date future check
   No Regular Expressions used.
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('purchase-form');
  if (!form) return;

  /* ── Helper: show / clear error ── */
  function showError(fieldId, message) {
    const group = document.getElementById(fieldId).closest('.form-group');
    group.classList.remove('success');
    group.classList.add('error');
    group.querySelector('.form-error').textContent = message;
  }
  function showSuccess(fieldId) {
    const group = document.getElementById(fieldId).closest('.form-group');
    group.classList.remove('error');
    group.classList.add('success');
    group.querySelector('.form-error').textContent = '';
  }
  function clearState(fieldId) {
    const group = document.getElementById(fieldId).closest('.form-group');
    group.classList.remove('error', 'success');
  }

  /* ── Validation 1: Empty Check ──
     Validates that required text fields are not blank */
  function validateNotEmpty(fieldId, label) {
    const val = document.getElementById(fieldId).value.trim();
    if (val.length === 0) {
      showError(fieldId, label + ' cannot be empty.');
      return false;
    }
    showSuccess(fieldId);
    return true;
  }

  /* ── Validation 2: Length Check ──
     Validates string length without regex */
  function validateLength(fieldId, min, max, label) {
    const val = document.getElementById(fieldId).value.trim();
    if (val.length < min || val.length > max) {
      showError(fieldId, label + ' must be between ' + min + ' and ' + max + ' characters.');
      return false;
    }
    showSuccess(fieldId);
    return true;
  }

  /* ── Validation 3: Numeric Range Check ──
     Validates CVV is all digits and correct length (no regex) */
  function validateCVV(fieldId) {
    const val = document.getElementById(fieldId).value.trim();
    if (val.length === 0) {
      showError(fieldId, 'CVV cannot be empty.');
      return false;
    }
    // Check all characters are digits (no regex)
    for (let i = 0; i < val.length; i++) {
      const code = val.charCodeAt(i);
      if (code < 48 || code > 57) {
        showError(fieldId, 'CVV must contain digits only.');
        return false;
      }
    }
    if (val.length < 3 || val.length > 4) {
      showError(fieldId, 'CVV must be 3 or 4 digits.');
      return false;
    }
    showSuccess(fieldId);
    return true;
  }

  /* ── Validation 4: Luhn Algorithm (Credit Card) ──
     Validates credit card number using Luhn checksum, no regex */
  function validateCreditCard(fieldId) {
    const raw = document.getElementById(fieldId).value.trim();

    // Remove spaces manually
    let val = '';
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] !== ' ') val += raw[i];
    }

    if (val.length === 0) {
      showError(fieldId, 'Card number cannot be empty.');
      return false;
    }

    // Check all chars are digits
    for (let i = 0; i < val.length; i++) {
      const code = val.charCodeAt(i);
      if (code < 48 || code > 57) {
        showError(fieldId, 'Card number must contain digits only.');
        return false;
      }
    }

    if (val.length < 13 || val.length > 19) {
      showError(fieldId, 'Card number must be between 13 and 19 digits.');
      return false;
    }

    // Luhn check
    let sum = 0;
    let shouldDouble = false;
    for (let i = val.length - 1; i >= 0; i--) {
      let digit = val.charCodeAt(i) - 48;
      if (shouldDouble) {
        digit = digit * 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    if (sum % 10 !== 0) {
      showError(fieldId, 'Invalid card number. Please check and try again.');
      return false;
    }

    showSuccess(fieldId);
    return true;
  }

  /* ── Validation 5: Expiry Date Future Check ──
     Validates MM/YY is in the future without regex */
  function validateExpiry(fieldId) {
    const val = document.getElementById(fieldId).value.trim();

    if (val.length === 0) {
      showError(fieldId, 'Expiry date cannot be empty.');
      return false;
    }

    // Find the slash position manually
    let slashIdx = -1;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === '/') { slashIdx = i; break; }
    }

    if (slashIdx === -1) {
      showError(fieldId, 'Expiry date must be in MM/YY format.');
      return false;
    }

    const mmStr = val.substring(0, slashIdx);
    const yyStr = val.substring(slashIdx + 1);

    // Check digits only
    for (let i = 0; i < mmStr.length; i++) {
      const c = mmStr.charCodeAt(i);
      if (c < 48 || c > 57) { showError(fieldId, 'Expiry date must be in MM/YY format.'); return false; }
    }
    for (let i = 0; i < yyStr.length; i++) {
      const c = yyStr.charCodeAt(i);
      if (c < 48 || c > 57) { showError(fieldId, 'Expiry date must be in MM/YY format.'); return false; }
    }

    const month = parseInt(mmStr, 10);
    const year  = parseInt('20' + yyStr, 10);

    if (month < 1 || month > 12) {
      showError(fieldId, 'Month must be between 01 and 12.');
      return false;
    }

    const now      = new Date();
    const nowYear  = now.getFullYear();
    const nowMonth = now.getMonth() + 1; // 1-indexed

    if (year < nowYear || (year === nowYear && month < nowMonth)) {
      showError(fieldId, 'Card has expired. Please use a valid card.');
      return false;
    }

    showSuccess(fieldId);
    return true;
  }

  /* ── Validate Select ── */
  function validateSelect(fieldId, label) {
    const val = document.getElementById(fieldId).value;
    if (!val || val === '') {
      showError(fieldId, 'Please select a ' + label + '.');
      return false;
    }
    showSuccess(fieldId);
    return true;
  }

  /* ── Validate Checkbox ── */
  function validateCheckbox(fieldId, message) {
    const el = document.getElementById(fieldId);
    if (!el.checked) {
      const group = el.closest('.form-group');
      group.classList.add('error');
      group.querySelector('.form-error').textContent = message;
      return false;
    }
    const group = el.closest('.form-group');
    group.classList.remove('error');
    group.querySelector('.form-error').textContent = '';
    return true;
  }

  /* ── Validate Radio Group ── */
  function validateRadio(groupName, message) {
    const radios = document.querySelectorAll('input[name="' + groupName + '"]');
    let checked = false;
    radios.forEach(r => { if (r.checked) checked = true; });
    const container = document.getElementById(groupName + '-group');
    const errEl = container ? container.querySelector('.form-error') : null;
    if (!checked) {
      if (container) container.classList.add('error');
      if (errEl) errEl.textContent = message;
      return false;
    }
    if (container) container.classList.remove('error');
    if (errEl) errEl.textContent = '';
    return true;
  }

  /* ── Live formatting: card number spaces ── */
  const cardInput = document.getElementById('card-number');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let raw = '';
      for (let i = 0; i < e.target.value.length; i++) {
        const c = e.target.value.charCodeAt(i);
        if (c >= 48 && c <= 57) raw += e.target.value[i];
      }
      let formatted = '';
      for (let i = 0; i < raw.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += raw[i];
      }
      e.target.value = formatted.substring(0, 19);
    });
  }

  /* ── Live formatting: expiry MM/YY ── */
  const expiryInput = document.getElementById('expiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let raw = '';
      for (let i = 0; i < e.target.value.length; i++) {
        const c = e.target.value.charCodeAt(i);
        if (c >= 48 && c <= 57) raw += e.target.value[i];
      }
      if (raw.length > 2) {
        e.target.value = raw.substring(0, 2) + '/' + raw.substring(2, 4);
      } else {
        e.target.value = raw;
      }
    });
  }

  /* ── Form Submit ── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    // (1) Full name — empty + length check
    valid = validateNotEmpty('full-name', 'Full name') && valid;
    if (document.getElementById('full-name').value.trim().length > 0) {
      valid = validateLength('full-name', 3, 80, 'Full name') && valid;
    }

    // (2) Email — empty check
    valid = validateNotEmpty('email', 'Email') && valid;
    if (document.getElementById('email').value.trim().length > 0) {
      // Manual email check (no regex): must contain @ and a dot after @
      const emailVal = document.getElementById('email').value.trim();
      let atIdx = -1;
      for (let i = 0; i < emailVal.length; i++) {
        if (emailVal[i] === '@') { atIdx = i; break; }
      }
      if (atIdx === -1 || atIdx === 0 || atIdx === emailVal.length - 1) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        const afterAt = emailVal.substring(atIdx + 1);
        let hasDot = false;
        for (let i = 0; i < afterAt.length; i++) {
          if (afterAt[i] === '.') { hasDot = true; break; }
        }
        if (!hasDot) {
          showError('email', 'Please enter a valid email address.');
          valid = false;
        } else {
          showSuccess('email');
        }
      }
    }

    // (3) Credit card — Luhn
    valid = validateCreditCard('card-number') && valid;

    // (4) Expiry date — future check
    valid = validateExpiry('expiry') && valid;

    // (5) CVV — numeric range
    valid = validateCVV('cvv') && valid;

    // (6) Payment method — radio
    valid = validateRadio('payment-method', 'Please select a payment method.') && valid;

    // (7) Country — select
    valid = validateSelect('country', 'country') && valid;

    // (8) Terms — checkbox
    valid = validateCheckbox('terms', 'You must agree to the terms and conditions.') && valid;

    if (valid) {
      showSuccessModal();
    }
  });

  /* ── Success Modal ── */
  function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  const modalClose = document.getElementById('modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      document.getElementById('success-modal').style.display = 'none';
      document.body.style.overflow = '';
      form.reset();
      document.querySelectorAll('.form-group').forEach(g => g.classList.remove('success','error'));
    });
  }
});

// Block native submission even while backend configuration is loading.
document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => event.preventDefault()));
(async () => {
  const showError = (message) => {
    let el = document.getElementById('authMessage');
    if (!el) {
      el = document.createElement('p');
      el.id = 'authMessage';
      el.className = 'muted';
      document.querySelector('.auth-card')?.appendChild(el);
    }
    el.textContent = message;
  };

  try {
    const sb = await StudyGenieAPI.getSupabase();

    const { data: { session } } = await sb.auth.getSession();
    if (session && (location.pathname.endsWith('/login.html') || location.pathname.endsWith('/signup.html'))) {
      location.href = 'dashboard.html';
      return;
    }

    document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const identifier = document.getElementById('identifier')?.value.trim();
      const password = document.getElementById('password')?.value;
      if (!identifier || !password) return showError('Enter your email and password.');
      if (!identifier.includes('@')) return showError('Use your email for account login.');

      const button = event.submitter;
      if (button) button.disabled = true;
      try {
        const { error } = await sb.auth.signInWithPassword({ email: identifier, password });
        if (error) throw error;
        location.href = 'dashboard.html';
      } catch (error) {
        showError(error.message || 'Login failed.');
      } finally {
        if (button) button.disabled = false;
      }
    });

    document.getElementById('signupForm')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const identifier = document.getElementById('identifier')?.value.trim();
      const password = document.getElementById('password')?.value;
      if (!name || !identifier || !password) return showError('Complete all required fields.');
      if (!identifier.includes('@')) return showError('Use your email to create the account.');
      if (password.length < 8) return showError('Use at least 8 characters for your password.');

      const button = event.submitter;
      if (button) button.disabled = true;
      try {
        const { data, error } = await sb.auth.signUp({
          email: identifier,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        if (data.session) location.href = 'dashboard.html';
        else showError('Account created. Check your email to confirm your account.');
      } catch (error) {
        showError(error.message || 'Signup failed.');
      } finally {
        if (button) button.disabled = false;
      }
    });

    const startGoogle = async () => {
      try {
        const { error } = await sb.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: `${location.origin}${location.pathname.replace(/login\.html|signup\.html$/, 'dashboard.html')}` },
        });
        if (error) throw error;
      } catch (error) {
        showError(error.message || 'Google sign-in is unavailable until the provider is enabled in Supabase.');
      }
    };

    document.getElementById('googleLogin')?.addEventListener('click', startGoogle);
    document.getElementById('googleSignup')?.addEventListener('click', startGoogle);

    document.getElementById('forgotPassword')?.addEventListener('click', async (event) => {
      event.preventDefault();
      const identifier = document.getElementById('identifier')?.value.trim();
      if (!identifier?.includes('@')) return showError('Enter your email first.');
      try {
        const { error } = await sb.auth.resetPasswordForEmail(identifier, {
          redirectTo: `${location.origin}${location.pathname.replace('login.html', 'settings.html')}`,
        });
        if (error) throw error;
        showError('Password reset email sent.');
      } catch (error) {
        showError(error.message || 'Could not send password reset email.');
      }
    });
  } catch (error) {
    showError(error.message || 'Could not load authentication. Start the backend first.');
  }
})();

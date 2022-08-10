

import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__form-title">Регистрация</h2>
        <fieldset className="login__form-fieldset">
          <label className="login__form-label">
            <input className="login__form-input" id="emailReg" type="email" name="emailRegInput"
              placeholder="Email" value={email || ''} required onChange={handleEmailChange} />
            <span className="login__form-input-error"></span>
          </label>
          <label className="login__form-label">
            <input className="login__form-input" id="passwordReg" type="password" name="passwordRegInput"
              placeholder="Пароль" required autoComplete="off" value={password || ''} onChange={handlePasswordChange} />
            <span className="login__form-input-error"></span>
          </label>
          <button className="login__button button" type="submit">Зарегистрироваться</button>
        </fieldset>
        <p className='login__form-signin'>Уже зарегистрированы?<Link className='login__form-signin' to='sign-in'>&nbsp;Войти</Link></p>

      </form>
    </section>
  );
}

export default Register;



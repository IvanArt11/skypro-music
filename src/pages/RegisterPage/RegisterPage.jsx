import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import * as S from './styles'
import { fetchRegister } from '../../API'
import { setLocalStorage } from '../../localStorage'

export function RegisterPage({ setUser }) {
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [disabledButtonLogin, setDisabledButtonLogin] = React.useState(false)
  const emailRef = React.useRef(null)
  const passwordRef = React.useRef(null)
  const confirmPassRef = React.useRef(null)

  const navigate = useNavigate()

  const validateAndRegister = async () => {
    setDisabledButtonLogin(true)
    try {
      let email = ''
      let password = ''

      if (emailRef.current && passwordRef.current) {
        email = emailRef.current.value
        password = passwordRef.current.value
      }

      const userData = await fetchRegister(email, password)

      setUser(userData)
      setLocalStorage(userData)
      setErrorMessage(null)
      navigate('/', { replace: true })
    } catch (error) {
      if (error.message) {
        setErrorMessage(error.message)
      }
    } finally {
      setDisabledButtonLogin(false)
    }
  }

  const handleRegister = () => {
    if (!emailRef.current?.value) {
      setErrorMessage('Заполните почту')
      return
    }
    // Проверка валидности email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailPattern.test(emailRef.current.value)) {
      setErrorMessage('Введите корректный email в формате valid@example.com')
      return
    }
    if (!passwordRef.current?.value) {
      setErrorMessage('Введите пароль')
      return
    }
    if (!confirmPassRef.current?.value) {
      setErrorMessage('Повторите пароль')
      return
    }
    if (passwordRef.current?.value !== confirmPassRef.current?.value) {
      setErrorMessage('Пароли не совпадают')
      return
    }

    validateAndRegister()
  }

  return (
    <S.PageContainer>
      <S.ModalForm>
        <Link to="/">
          <S.ModalLogo>
            <S.ModalLogoImage src="/img/logo-black.png" alt="logo" />
          </S.ModalLogo>
        </Link>
        <>
          <S.Inputs>
            <S.ModalInput ref={emailRef} type="text" placeholder="Почта" />
            <S.ModalInput
              ref={passwordRef}
              type="password"
              placeholder="Пароль"
            />
            <S.ModalInput
              ref={confirmPassRef}
              type="password"
              placeholder="Повторите пароль"
            />
          </S.Inputs>
          {errorMessage && <S.Error>{errorMessage}</S.Error>}
          <S.Buttons>
            <S.PrimaryButton
              disabled={disabledButtonLogin}
              onClick={handleRegister}
            >
              Зарегистрироваться
            </S.PrimaryButton>
          </S.Buttons>
        </>
      </S.ModalForm>
    </S.PageContainer>
  )
}

export default RegisterPage

import React from 'react'
import { Link } from 'react-router-dom'
import * as S from './styles'

export function NotFoundPage() {
  return (
    <S.PageContainer>
      <S.ModalForm>
        <S.Title>404</S.Title>
        <S.Block>
          <S.Text>Страница не найдена</S.Text>
          <img src="/img/smile_crying.png" alt="smile_crying" />
        </S.Block>
        <S.Subtext>
          Возможно, она была удалена или перенесена на другой адрес
        </S.Subtext>
        <Link to="/">
          <S.PrimaryButton>Вернуться на главную</S.PrimaryButton>
        </Link>
      </S.ModalForm>
    </S.PageContainer>
  )
}

export default NotFoundPage

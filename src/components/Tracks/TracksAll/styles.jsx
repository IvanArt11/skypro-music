import { styled } from 'styled-components'

export const ContentPlaylist = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
  row-gap: 12px;
  font-size: 24px;
`

export const ErrorMessage = styled.p`
  & span {
    color: tomato;
  }
`

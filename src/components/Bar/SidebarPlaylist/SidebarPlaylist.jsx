import React from 'react'
import * as S from './styles'
import { Link } from 'react-router-dom'
import CATEGORIES from '../../../constants'
import { useGetSelectionQuery } from '../../../services/tracks'
import BarSkeleton from './BarSkeleton'

const SidebarPlaylist = () => {
  const skeletons = [...new Array(3)].map((_, index) => (
    <BarSkeleton key={index} />
  ))

  const { isLoading, error } = useGetSelectionQuery()

  return (
    <S.SidebarBlock>
      <S.SidebarList>
        {isLoading ? (
          skeletons
        ) : CATEGORIES ? (
          CATEGORIES.map((category) => (
            <S.SidebarItem key={category.id}>
              <Link to={`/selection/${category.id}`}>
                <S.SidebarLink>
                  <S.SidebarImg
                    src={`${category.image}`}
                    alt={`${category.title}`}
                  ></S.SidebarImg>
                </S.SidebarLink>
              </Link>
            </S.SidebarItem>
          ))
        ) : (
          <S.SidebarItem>
            Подборки не найдены, попробуйте позже.
            <span>{error.error}</span>
          </S.SidebarItem>
        )}
      </S.SidebarList>
    </S.SidebarBlock>
  )
}

export default SidebarPlaylist

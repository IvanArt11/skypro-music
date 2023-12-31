import * as S from './styles'
import { timer } from '../../../utils/timer'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentTrack,
  setIsPlaying,
  setVisiblePlayer,
} from '../../../redux/slices/playerSlice'
import {
  addToFavoritesPlaylist,
  deleteFromFavoritesPlaylist,
} from '../../../redux/slices/favoritesSlice'
import React from 'react'
import {
  useAddToFavoritesMutation,
  useDeleteFromFavoritesMutation,
} from '../../../services/tracks'
import {
  getLocalStorage,
  getRefreshTokenLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../../../localStorage'
import { updateToken } from '../../../API'
import { UserContext } from '../../../App'

const Track = ({ track }) => {
  const dispatch = useDispatch()
  const currentTrack = useSelector((state) => state.audioplayer.track)
  const isPlaying = useSelector((state) => state.audioplayer.playing)
  const { user, setUser } = React.useContext(UserContext)

  const currentID = currentTrack ? currentTrack.id : null

  const onChangeTrack = () => {
    if (currentTrack !== track) {
      dispatch(setCurrentTrack(track))
      dispatch(setIsPlaying(true))
    } else {
      dispatch(setIsPlaying(false))
    }
    dispatch(setVisiblePlayer(true))
  }

  const [addToFavorites, { error: errorLike }] = useAddToFavoritesMutation()
  const [deleteFromFavorites, { error: errorDislike }] =
    useDeleteFromFavoritesMutation()

  const isLike = track.stared_user.some((users) => users.id === user.id)

  const handleClickLike = (event, id) => {
    event.stopPropagation()
    addToFavorites(id)
    dispatch(addToFavoritesPlaylist(track))
  }
  const handleClickDislike = (event, id) => {
    event.stopPropagation()
    deleteFromFavorites(id)
    dispatch(deleteFromFavoritesPlaylist(track))
  }

  React.useEffect(() => {
    const errorStateDislike = errorDislike
    const errorStateLike = errorLike

    if (errorStateDislike?.status === 401 || errorStateLike?.status === 401) {
      const fetchUpdateToken = async () => {
        const userData = getLocalStorage()
        try {
          const newToken = await updateToken(getRefreshTokenLocalStorage())
          const newUser = {
            ...userData,
            accessToken: {
              access: newToken.access,
              refresh: userData.accessToken.refresh,
            },
          }
          setLocalStorage(newUser)

          window.location.reload()
        } catch {
          setUser(null)
          removeLocalStorage()
        }
      }

      fetchUpdateToken()
    }
  }, [dispatch, errorDislike, errorLike, setUser])

  return (
    <S.PlaylistTrack onClick={onChangeTrack}>
      <S.TrackTitle>
        <S.TrackTitleImage>
          {currentID === track.id ? (
            <S.TrackTitleCurrent $isPlaying={isPlaying}></S.TrackTitleCurrent>
          ) : (
            <S.TrackTitleSvg alt={track.name}>
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </S.TrackTitleSvg>
          )}
        </S.TrackTitleImage>
        <S.TrackTitleText>
          <S.TrackTitleLink>{track.name}</S.TrackTitleLink>
        </S.TrackTitleText>
      </S.TrackTitle>
      <S.TrackAuthor>
        <S.TrackAuthorLink>{track.author}</S.TrackAuthorLink>
      </S.TrackAuthor>
      <S.TrackAlbum>
        <S.TrackAlbumLink>{track.album}</S.TrackAlbumLink>
      </S.TrackAlbum>
      <S.TrackTime>
        {isLike ? (
          <S.TrackLike
            onClick={(event) => handleClickDislike(event, track.id)}
            className="_btn-icon-like"
          >
            <S.TrackLikeSvg alt="like">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </S.TrackLikeSvg>
          </S.TrackLike>
        ) : (
          <S.TrackLike
            onClick={(event) => handleClickLike(event, track.id)}
            className="_btn-icon"
          >
            <S.TrackLikeSvg alt="like">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </S.TrackLikeSvg>
          </S.TrackLike>
        )}
        <S.TrackTimeText>{timer(track.duration_in_seconds)}</S.TrackTimeText>
      </S.TrackTime>
    </S.PlaylistTrack>
  )
}

export default Track

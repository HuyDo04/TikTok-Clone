'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ShareModal from '../ShareModal/ShareModal'
import styles from './VideoActions.module.scss'
import classNames from 'classnames/bind'
import HeartIcon from '@/component/Icons/HeartIcon'
import CommentIcon from '@/component/Icons/CommentIcon'
import BookmarkIcon from '@/component/Icons/BookmarkIcon'
import ShareIcon from '@/component/Icons/ShareIcon'
import PlusIcon from '@/component/Icons/PlusIcon'
import CheckIcon from '@/component/Icons/CheckIcon'
import { likePost, unlikePost } from '@/services/post.service'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

export default function VideoActions({ video, onToggleComments }) {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const navigate = useNavigate()

  // Khởi tạo state từ prop `video` nhận từ API
  const [isLiked, setIsLiked] = useState(video.isLiked || false)
  const [likeCount, setLikeCount] = useState(Number(video.likesCount) || 0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(video.stats?.bookmarks || 0) // Giả sử có thể không có
  const [showShare, setShowShare] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [commentCount, setCommentCount] = useState(video.stats?.comments || 0)
  const [isFollowed, setIsFollowed] = useState(false)

  // Đồng bộ state khi prop `video` thay đổi (khi cuộn qua video khác)
  useEffect(() => {
    setIsLiked(video.isLiked || false)
    setLikeCount(Number(video.likesCount) || 0)
  }, [video.id, video.isLiked, video.likesCount])

  const handleLike = async () => {
    if (!currentUser) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/login')
      return
    }

    // Cập nhật UI một cách lạc quan
    const originalIsLiked = isLiked
    const originalLikeCount = likeCount

    setIsLiked(!originalIsLiked)
    setLikeCount(originalIsLiked ? originalLikeCount - 1 : originalLikeCount + 1)

    try {
      if (originalIsLiked) {
        await unlikePost(video.id)
      } else {
        await likePost(video.id)
      }
    } catch (error) {
      console.error('Failed to update like status:', error)
      // Nếu API thất bại, khôi phục lại trạng thái ban đầu
      setIsLiked(originalIsLiked)
      setLikeCount(originalLikeCount)
    }
  }

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarkCount(bookmarkCount - 1)
    } else {
      setBookmarkCount(bookmarkCount + 1)
    }
    setIsBookmarked(!isBookmarked)
  }

  const handleToggleFollow = () => {
    setIsFollowed((prev) => !prev)
  }

  return (
    <>
      <div className={cx('videoActions')}>
        <div className={cx('authorAvatar')}>
        <img
          src={video.author.avatar || 'https://picsum.photos/200'}
          alt={video.author.username}
        />
        <button
          className={cx('followButton', { active: isFollowed })}
          onClick={handleToggleFollow}
        >
          {isFollowed ? (
            <CheckIcon size="14px" className={cx('icon')} />
          ) : (
            <PlusIcon size="14px" className={cx('icon')} />
          )}
        </button>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button
              className={cx('actionButton', { liked: isLiked })}
              onClick={handleLike}
            >
              <HeartIcon size={24} color={isLiked ? '#fe2c55' : 'var(--text-color)'} />
            </button>
          </div>
          <span className={cx('actionLabel')}>{likeCount}</span>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button className={cx('actionButton')} onClick={onToggleComments}>
              <CommentIcon size={24} color="var(--text-color)" />
            </button>
          </div>
          <span className={cx('actionLabel')}>{commentCount}</span>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button
              className={cx('actionButton', { bookmarked: isBookmarked })}
              onClick={handleBookmark}
            >
              <BookmarkIcon size={24} color={isBookmarked ? '#ffb800' : 'var(--text-color)'} />
            </button>
          </div>
          <span className={cx('actionLabel')}>{bookmarkCount}</span>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button
              className={cx('actionButton')}
              onClick={() => setShowShare(true)}
            >
              <ShareIcon size={24} color="var(--text-color)" />
            </button>
          </div>
          <span className={cx('actionLabel')}>{video.stats?.shares || 0}</span>
        </div>
      </div>

      {showShare && (
        <ShareModal video={video} onClose={() => setShowShare(false)} />
      )}
    </>
  )
}
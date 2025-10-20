'use client'

import { useState } from 'react'
import ShareModal from '../ShareModal/ShareModal'
import styles from './VideoActions.module.scss'
import classNames from 'classnames/bind'
import HeartIcon from '@/component/Icons/HeartIcon'
import CommentIcon from '@/component/Icons/CommentIcon'
import BookmarkIcon from '@/component/Icons/BookmarkIcon'
import ShareIcon from '@/component/Icons/ShareIcon'

const cx = classNames.bind(styles)

export default function VideoActions({ video, onToggleComments }) {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(video.stats.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(video.stats.bookmarks)
  const [showShare, setShowShare] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [commentCount, setCommentCount] = useState(video.stats.comments)

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    if (isBookmarked) {
      setBookmarkCount(bookmarkCount - 1)
    } else {
      setBookmarkCount(bookmarkCount + 1)
    }
    setIsBookmarked(!isBookmarked)
  }

  return (
    <>
      <div className={cx('videoActions')}>
        <div className={cx('authorAvatar')}>
          <img
            src={video.author.avatar || '/placeholder.svg'}
            alt={video.author.username}
          />
          <button className={cx('followButton')}>+</button>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button
              className={cx('actionButton', { liked: isLiked })}
              onClick={handleLike}
            >
              <HeartIcon size={24} color={isLiked ? '#f1204a' : '#000'} />
            </button>
          </div>
          <span className={cx('actionLabel')}>{likeCount}</span>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button className={cx('actionButton')} onClick={onToggleComments}>
              <CommentIcon size={24} color="#000" />
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
              <BookmarkIcon size={24} color={isBookmarked ? '#fff85a' : '#000'} />
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
              <ShareIcon size={24} color="#000" />
            </button>
          </div>
          <span className={cx('actionLabel')}>{video.stats.shares}</span>
        </div>
      </div>

      {showShare && (
        <ShareModal video={video} onClose={() => setShowShare(false)} />
      )}
    </>
  )
}
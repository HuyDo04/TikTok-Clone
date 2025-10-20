'use client'

import { useState } from 'react'
import ShareModal from '../ShareModal/ShareModal'
import styles from './VideoActions.module.scss'
import classNames from 'classnames/bind'
import HeartIcon from '@/component/Icons/HeartIcon'
import CommentIcon from '@/component/Icons/CommentIcon'

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
              <CommentIcon size={24} color="#fff" />
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
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill={isBookmarked ? '#ffc107' : '#000'}
              >
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5
                     c0-1.1-.9-2-2-2z" />
              </svg>
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7
                     c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11
                     c.54.5 1.25.81 2.04.81
                     1.66 0 3-1.34 3-3s-1.34-3-3-3
                     -3 1.34-3 3
                     c0 .24.04.47.09.7L8.04 9.81
                     C7.5 9.31 6.79 9 6 9
                     c-1.66 0-3 1.34-3 3s1.34 3 3 3
                     c.79 0 1.5-.31 2.04-.81l7.12 4.16
                     c-.05.21-.08.43-.08.65
                     0 1.61 1.31 2.92 2.92 2.92
                     s2.92-1.31 2.92-2.92
                     -1.31-2.92-2.92-2.92z" />
              </svg>
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
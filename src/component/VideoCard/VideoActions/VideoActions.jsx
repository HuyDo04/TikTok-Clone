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
import { likePost, unlikePost, repost, unRepost, getPostById } from '@/services/post.service'
import { followUser, unfollowUser } from '@/services/user.service'
import { useNavigate, Link } from 'react-router-dom'

const cx = classNames.bind(styles)
const URL = import.meta.env.VITE_BASE_URL_ME

export default function VideoActions({ video, onToggleComments }) {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const navigate = useNavigate()
  console.log("video", video.commentCount);
  
  // Khởi tạo state từ prop `video` nhận từ API
  const [isLiked, setIsLiked] = useState(video.isLiked || false)
  const [likeCount, setLikeCount] = useState(Number(video.likesCount) || 0)
  const [isBookmarked, setIsBookmarked] = useState(!!video.isBookmarked) // Đảm bảo luôn là boolean
  const [bookmarkCount, setBookmarkCount] = useState(video.bookmarksCount || 0) // Giả sử API trả về `bookmarksCount`
  const [showShare, setShowShare] = useState(false)
  const [commentCount, setCommentCount] = useState(video.commentCount || 0)
  const [shareCount, setShareCount] = useState(video.sharesCount || 0)
  const [isFollowed, setIsFollowed] = useState(video.author?.isFollowing || false)

  // Đồng bộ state khi prop `video` thay đổi (khi cuộn qua video khác) và fetch trạng thái mới nhất
  useEffect(() => {
    // Cập nhật UI ngay lập tức với dữ liệu hiện có
    setLikeCount(Number(video.likesCount) || 0);
    setCommentCount(video.commentCount || 0);
    setShareCount(video.sharesCount || 0);
    setBookmarkCount(video.bookmarksCount || 0);
    setIsFollowed(video.author?.isFollowing || false);

    // Nếu đã đăng nhập, gọi API để lấy trạng thái like/repost mới nhất
    if (currentUser && video.id) {
      const fetchPostStatus = async () => {
        try {
          const postDetails = await getPostById(video.id);
          setIsLiked(postDetails.isLiked);
          // Cập nhật lại số lượt thích từ dữ liệu mới nhất
          setLikeCount(Number(postDetails.likesCount) || 0);
          // API trả về 'isReposted', ta dùng nó cho trạng thái 'isBookmarked'
          setIsBookmarked(postDetails.isReposted);
          // Cập nhật lại số đếm bookmark từ dữ liệu mới nhất
          setBookmarkCount(Number(postDetails.repostCount) || 0);
        } catch (error) {
          console.error("Failed to fetch post status:", error);
        }
      };
      fetchPostStatus();
    }
  }, [currentUser, video])

  const handleLike = async () => {
    if (!currentUser) {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate('/auth/login')
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

  const handleBookmark = async () => {
    if (!currentUser) {
      navigate('/auth/login')
      return
    }

    const originalIsBookmarked = isBookmarked
    const originalBookmarkCount = bookmarkCount

    setIsBookmarked(!originalIsBookmarked)
    // Đảm bảo số đếm không bao giờ là số âm
    setBookmarkCount(prevCount => 
      originalIsBookmarked ? Math.max(0, prevCount - 1) : prevCount + 1
    )

    try {
      if (originalIsBookmarked) {
        await unRepost(video.id)
      } else {
        await repost(video.id)
      }
    } catch (error) {
      console.error('Failed to update bookmark status:', error)
      setIsBookmarked(originalIsBookmarked)
      setBookmarkCount(originalBookmarkCount)
    }
  }

  const handleToggleFollow = async () => {
    if (!currentUser) {
      navigate('/auth/login')
      return
    }

    // Không cho phép tự follow chính mình
    if (currentUser.id === video.author.id) return

    const originalIsFollowed = isFollowed
    setIsFollowed(!originalIsFollowed) // Cập nhật UI lạc quan

    try {
      if (originalIsFollowed) {
        await unfollowUser(video.author.id)
      } else {
        await followUser(video.author.id)
      }
    } catch (error) {
      console.error('Failed to update follow status:', error)
      setIsFollowed(originalIsFollowed) // Khôi phục lại nếu có lỗi
    }
  }

  const handleShareSuccess = () => {
    // Cập nhật số lượt share sau khi người dùng chia sẻ thành công
    setShareCount(prev => prev + 1);
  }

  return (
    <>
      <div className={cx('videoActions')}>
        <div className={cx('authorAvatar')}>
        <Link to={`/profile/${video.author.username}`}>
          <img
            src={video.author.avatar ? `${URL}/${video.author.avatar}` : 'https://picsum.photos/200'}
            alt={video.author.username}
          />
        </Link>
        <button
          className={cx('followButton', { active: isFollowed, hidden: currentUser?.id === video.author.id })}
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
          <span className={cx('actionLabel')}>{shareCount}</span>
        </div>
      </div>

      {showShare && (
        <ShareModal video={video} onClose={() => setShowShare(false)} onShareSuccess={handleShareSuccess} />
      )}
    </>
  )
}
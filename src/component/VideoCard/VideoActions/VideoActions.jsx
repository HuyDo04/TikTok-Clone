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
import { followUser, unfollowUser, getUserById } from '@/services/user.service'
import { useNavigate, Link } from 'react-router-dom'

const cx = classNames.bind(styles)
const URL = import.meta.env.VITE_BASE_URL_ME

export default function VideoActions({ video, onToggleComments }) {
  const currentUser = useSelector(state => state.auth.currentUser)
  const navigate = useNavigate()

  // Khởi tạo state từ prop `video` nhận từ API
  const [isLiked, setIsLiked] = useState(video.isLiked || false)
  const [likeCount, setLikeCount] = useState(Number(video.likesCount) || 0)
  const [isBookmarked, setIsBookmarked] = useState(!!video.isBookmarked) // Đảm bảo luôn là boolean
  const [bookmarkCount, setBookmarkCount] = useState(video.bookmarksCount || 0) // Giả sử API trả về `bookmarksCount`
  const [showShare, setShowShare] = useState(false)
  const [commentCount, setCommentCount] = useState(video.commentCount || 0)
  const [shareCount, setShareCount] = useState(video.sharesCount || 0)
  // Cập nhật logic: Xác định isFollowed dựa trên `followStatus` từ API.
  // Nếu `followStatus` là "Following" hoặc "Friends", có nghĩa là người dùng hiện tại đang theo dõi tác giả.
  const [isFollowed, setIsFollowed] = useState(
    video.author?.followStatus === 'Following' || video.author?.followStatus === 'Friends'
  );
  const [isTogglingFollow, setIsTogglingFollow] = useState(false); // State để quản lý trạng thái đang xử lý

  // Đồng bộ state khi prop `video` thay đổi (khi cuộn qua video khác) và fetch trạng thái mới nhất
  useEffect(() => {
    
    // Cập nhật UI ngay lập tức với dữ liệu hiện có từ props
    setIsLiked(video.isLiked || false);
    setLikeCount(Number(video.likesCount) || 0);
    setCommentCount(video.commentCount || 0);
    setShareCount(video.sharesCount || 0);
    setIsBookmarked(!!video.isBookmarked);
    setBookmarkCount(video.bookmarksCount || 0);
    // Cập nhật logic tương tự như state ban đầu
    const initialFollowedState = video.author?.followStatus === 'Following' || video.author?.followStatus === 'Friends';
    setIsFollowed(initialFollowedState);
    
    // Nếu đã đăng nhập, gọi API để lấy trạng thái chính xác nhất
    if (currentUser && video.id && video.author?.id) {
      const fetchPostStatus = async () => {
        try {
          const [postDetails, authorDetails] = await Promise.all([
            getPostById(video.id),
            getUserById(video.author.id)
          ]);

          // Cập nhật logic: Sử dụng `followStatus` từ dữ liệu fetch được
          const fetchedFollowedState = authorDetails.followStatus === 'Following' || authorDetails.followStatus === 'Friends';
         
          setIsLiked(postDetails.isLiked);
          setLikeCount(Number(postDetails.likesCount) || 0);
          setIsBookmarked(postDetails.isReposted); // API trả về 'isReposted'
          setBookmarkCount(Number(postDetails.repostCount) || 0);
          setIsFollowed(fetchedFollowedState);
        } catch (error) {
          console.error("[VideoActions] Failed to fetch latest post/author status:", error);
        }
      };
      fetchPostStatus();
    }
  }, [currentUser, video]); // Phụ thuộc vào currentUser và video

  const handleLike = async () => {
    if (!currentUser) { navigate('/auth/login'); return }
    const original = isLiked
    setIsLiked(!original)
    setLikeCount(prev => original ? Math.max(0, prev - 1) : prev + 1)
    try {
      if (original) await unlikePost(video.id)
      else await likePost(video.id)
    } catch {
      setIsLiked(original)
      setLikeCount(prev => original ? prev + 1 : Math.max(0, prev - 1))
    }
  }

  const handleBookmark = async () => {
    if (!currentUser) { navigate('/auth/login'); return }
    const original = isBookmarked
    setIsBookmarked(!original)
    setBookmarkCount(prev => original ? Math.max(0, prev - 1) : prev + 1)
    try {
      if (original) await unRepost(video.id)
      else await repost(video.id)
    } catch {
      setIsBookmarked(original)
      setBookmarkCount(prev => original ? prev + 1 : Math.max(0, prev - 1))
    }
  }

  const handleToggleFollow = async () => {
    // Nếu đang xử lý, không làm gì cả để tránh double-click
    if (isTogglingFollow) return;

    if (!currentUser) {
      navigate('/auth/login');
      return;
    }
  
    if (currentUser.id === video.author.id) {
      console.warn("[VideoActions] Attempted to follow/unfollow self. Action blocked.");
      return;
    }
  
    setIsTogglingFollow(true); // Bắt đầu xử lý, vô hiệu hóa nút
  
    try {
      if (isFollowed) {
        await unfollowUser(video.author.id);
        setIsFollowed(false);
      } else {
        await followUser(video.author.id);
        setIsFollowed(true);
      }
    } catch (error) {
      console.error('Failed to update follow status. Re-syncing with server.', error);
      // Nếu API báo lỗi, đồng bộ lại trạng thái từ server để khắc phục bất đồng bộ.
      try {
        const authorDetails = await getUserById(video.author.id);
        // Cập nhật logic: Đồng bộ lại bằng `followStatus`
        const reSyncFollowedState = authorDetails.followStatus === 'Following' || authorDetails.followStatus === 'Friends';
        setIsFollowed(reSyncFollowedState);
      } catch (syncError) {
        console.error("[VideoActions] Failed to re-sync follow status after error:", syncError);
      }
    } finally {
      setIsTogglingFollow(false);
    }
  };
  
  const handleShareSuccess = () => setShareCount(prev => prev + 1)

  return (
    <>
      <div className={cx('videoActions')}>
        <div className={cx('authorAvatar')}>
          <Link to={`/profile/${video.author.username}`}>
            <img src={video.author.avatar ? `${URL}/${video.author.avatar}` : 'https://picsum.photos/200'} alt={video.author.username} />
          </Link>
          <button
            className={cx('followButton', { active: isFollowed, hidden: currentUser?.id === video.author.id, disabled: isTogglingFollow })}
            onClick={handleToggleFollow}
            disabled={isTogglingFollow}
          >
            {isFollowed ? <CheckIcon size="14px" className={cx('icon')} /> : <PlusIcon size="14px" className={cx('icon')} />}
          </button>
        </div>

        {/* Các nút khác */}
        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button className={cx('actionButton', { liked: isLiked })} onClick={handleLike}>
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
            <button className={cx('actionButton', { bookmarked: isBookmarked })} onClick={handleBookmark}>
              <BookmarkIcon size={24} color={isBookmarked ? '#ffb800' : 'var(--text-color)'} />
            </button>
          </div>
          <span className={cx('actionLabel')}>{bookmarkCount}</span>
        </div>

        <div className={cx('actionItem')}>
          <div className={cx('actionButtons')}>
            <button className={cx('actionButton')} onClick={() => setShowShare(true)}>
              <ShareIcon size={24} color="var(--text-color)" />
            </button>
          </div>
          <span className={cx('actionLabel')}>{shareCount}</span>
        </div>
      </div>

      {showShare && <ShareModal video={video} onClose={() => setShowShare(false)} onShareSuccess={handleShareSuccess} />}
    </>
  )
}

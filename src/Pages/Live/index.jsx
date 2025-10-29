import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Live.module.scss';

const cx = classNames.bind(styles);

// Mock data - This should be replaced with API calls in the future
const liveUsers = [
    {
      id: 1,
      username: "hungmatkho",
      displayName: "Cao Hùng Logistics",
      avatar: "https://picsum.photos/200/300",
      viewers: 628,
      title: "trầm tính ít nói...chs VIP10-923",
      thumbnail: "https://picsum.photos/200",
      isLive: true,
    },
    {
      id: 2,
      username: "thoi0526",
      displayName: "Hoài Chế",
      avatar: "https://picsum.photos/200/300",
      viewers: 11,
      title: "Chơi game cùng bạn",
      thumbnail: "https://picsum.photos/200",
      isLive: true,
    },
    {
      id: 3,
      username: "sammishop",
      displayName: "SammiShop Official",
      avatar: "https://picsum.photos/200/300",
      viewers: 5,
      title: "Giới thiệu sản phẩm mới",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 4,
      username: "hindeptrai123",
      displayName: "Draven TV",
      avatar: "https://picsum.photos/200/300",
      thumbnail: "https://picsum.photos/200",
      isLive: true,
    },
];

function LivePage() {
  return (
    <div className={cx('live-container')}>
      <h1 className={cx('title')}>Trực tiếp</h1>
      <div className={cx('live-list')}>
        {liveUsers.map((live) => (
          <Link to={`/live/${live.id}`} key={live.id} className={cx('live-card')}>
            <img src={live.thumbnail} alt={live.title} className={cx('thumbnail')} />
            <div className={cx('live-info')}>
              <h3 className={cx('live-title')}>{live.title}</h3>
              <div className={cx('user-info')}>
                <img src={live.avatar} alt={live.displayName} className={cx('avatar')} />
                <span className={cx('username')}>{live.displayName}</span>
              </div>
              <div className={cx('viewers')}>{live.viewers} viewers</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LivePage;
import VideoFeed from "@/component/VideoCard/VideoFeed/VideoFeed";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Test from "@/component/test/Test";
import HeartIcon from "@/component/Icons/HeartIcon";
import CommentIcon from "@/component/Icons/CommentIcon";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <VideoFeed />
    </div>
    
  );
}

export default Home;

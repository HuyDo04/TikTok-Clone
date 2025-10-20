import VideoFeed from "@/component/VideoCard/VideoFeed/VideoFeed";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Test from "@/component/test/Test";
import HeartIcon from "@/component/Icons/HeartIcon";

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <HeartIcon size={32} color="#FF2D55" />
      <VideoFeed />
    </div>
    
  );
}

export default Home;

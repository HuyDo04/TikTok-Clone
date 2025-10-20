import VideoFeed from "@/component/VideoCard/VideoFeed/VideoFeed";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <VideoFeed />
    </div>
    
  );
}

export default Home;

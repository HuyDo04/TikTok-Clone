import VideoFeed from "@/component/VideoCard/VideoFeed/VideoFeed";
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Test from "@/component/test/Test";
import PlusIcon from "@/component/Icons/PlusIcon";


const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <PlusIcon />
      <VideoFeed />
    </div>
    
  );
}

export default Home;

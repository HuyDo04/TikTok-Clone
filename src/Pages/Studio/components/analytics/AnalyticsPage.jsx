import React from 'react';
import classNames from 'classnames/bind';
import styles from './AnalyticsPage.module.scss';
// Assuming heroicons is used in the project
import { EyeIcon, ClockIcon, ShareIcon, HeartIcon, ChatBubbleOvalLeftEllipsisIcon, UsersIcon, MapPinIcon, ChartPieIcon } from '@heroicons/react/24/outline';

const cx = classNames.bind(styles);

// Mock Data
const contentAnalytics = {
    videoViews: '1.2M',
    watchTime: '28.5K hours',
    engagementRate: '12.5%',
    trafficSources: [
        { source: 'For You Page', percentage: 75 },
        { source: 'Profile', percentage: 15 },
        { source: 'Search', percentage: 5 },
        { source: 'Hashtag', percentage: 5 },
    ],
    recentVideos: [
        { id: 1, title: 'My first viral video!', thumbnail: '/placeholder.jpg', views: '500K', date: 'Oct 22, 2025' },
        { id: 2, title: 'A day in my life', thumbnail: '/placeholder.jpg', views: '250K', date: 'Oct 20, 2025' },
        { id: 3, title: 'Cooking challenge', thumbnail: '/placeholder.jpg', views: '150K', date: 'Oct 18, 2025' },
    ]
};

const followerAnalytics = {
    totalFollowers: '125,432',
    change: '+1.2K this week',
    gender: [{ label: 'Female', value: 65 }, { label: 'Male', value: 33 }, { label: 'Other', value: 2 }],
    topTerritories: ['United States', 'Brazil', 'Vietnam'],
    activeHours: '7 PM - 9 PM',
};

export default function AnalyticsPage() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Phân tích</h1>
            
            <div className={cx('section')}>
                <h2 className={cx('sectionTitle')}>Phân tích nội dung</h2>
                <div className={cx('grid')}>
                    <div className={cx('card')}>
                        <h3><EyeIcon className={cx('icon')} /> Lượt xem video</h3>
                        <p className={cx('metric')}>{contentAnalytics.videoViews}</p>
                    </div>
                    <div className={cx('card')}>
                        <h3><ClockIcon className={cx('icon')} /> Thời gian xem (giờ)</h3>
                        <p className={cx('metric')}>{contentAnalytics.watchTime}</p>
                    </div>
                    <div className={cx('card')}>
                        <h3><HeartIcon className={cx('icon')} /> Tỷ lệ tương tác</h3>
                        <p className={cx('metric')}>{contentAnalytics.engagementRate}</p>
                    </div>
                </div>
                <div className={cx('card', 'fullWidth')}>
                    <h3><MapPinIcon className={cx('icon')} /> Nguồn lưu lượng</h3>
                    <div className={cx('trafficSourceList')}>
                        {contentAnalytics.trafficSources.map(source => (
                            <div key={source.source} className={cx('trafficItem')}>
                                <span>{source.source}</span>
                                <span>{source.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className={cx('card', 'fullWidth')}>
                    <h3>Video gần đây</h3>
                    <div className={cx('videoList')}>
                        {contentAnalytics.recentVideos.map(video => (
                            <div key={video.id} className={cx('videoItem')}>
                                <img src={video.thumbnail} alt={video.title} className={cx('thumbnail')} />
                                <div className={cx('videoInfo')}>
                                    <p className={cx('videoTitle')}>{video.title}</p>
                                    <p className={cx('videoMeta')}>{video.views} views • {video.date}</p>
                                d</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx('section')}>
                <h2 className={cx('sectionTitle')}>Phân tích người theo dõi</h2>
                <div className={cx('grid')}>
                    <div className={cx('card')}>
                        <h3><UsersIcon className={cx('icon')} /> Tổng số người theo dõi</h3>
                        <p className={cx('metric')}>{followerAnalytics.totalFollowers}</p>
                        <p className={cx('change')}>{followerAnalytics.change}</p>
                    </div>
                    <div className={cx('card')}>
                        <h3><ChartPieIcon className={cx('icon')} /> Phân bổ giới tính</h3>
                        {/* Placeholder for a pie chart */}
                        <div className={cx('genderList')}>
                            {followerAnalytics.gender.map(g => <p key={g.label}>{g.label}: {g.value}%</p>)}
                        </div>
                    </div>
                    <div className={cx('card')}>
                        <h3><MapPinIcon className={cx('icon')} /> Khu vực địa lý hàng đầu</h3>
                        <ul className={cx('territoryList')}>
                            {followerAnalytics.topTerritories.map(t => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

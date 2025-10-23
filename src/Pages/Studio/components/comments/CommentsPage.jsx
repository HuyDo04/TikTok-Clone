import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CommentsPage.module.scss';

const cx = classNames.bind(styles);

// Mock Data
const comments = {
    unanswered: [
        { id: 1, user: 'User123', avatar: '/user-avatar-1.png', text: 'This is amazing! How did you do that?', video: 'My first viral video!', time: '2 hours ago' },
        { id: 2, user: 'CreativeCat', avatar: '/user-avatar-reply.jpg', text: 'Can you make a tutorial for this?', video: 'Cooking challenge', time: '5 hours ago' },
    ],
    answered: [
        { id: 3, user: 'JohnDoe', avatar: '/user-avatar-reply-2.jpg', text: 'Great content!', video: 'A day in my life', time: '1 day ago', reply: 'Thank you so much!' },
        { id: 4, user: 'JaneSmith', avatar: '/user-avatar-reply-3.jpg', text: 'Love this!', video: 'My first viral video!', time: '2 days ago', reply: 'Glad you enjoyed it!' },
    ]
};

export default function CommentsPage() {
    const [activeTab, setActiveTab] = useState('unanswered');

    const renderComment = (comment, isAnswered) => (
        <div key={comment.id} className={cx('commentItem')}>
            <img src={comment.avatar} alt={comment.user} className={cx('avatar')} />
            <div className={cx('commentContent')}>
                <p className={cx('userInfo')}>
                    <strong>{comment.user}</strong> commented on <em>{comment.video}</em>
                    <span className={cx('time')}>{comment.time}</span>
                </p>
                <p className={cx('commentText')}>{comment.text}</p>
                {isAnswered ? (
                    <div className={cx('reply')}>
                        <strong>Your reply:</strong> {comment.reply}
                    </div>
                ) : (
                    <div className={cx('actions')}>
                        <button className={cx('replyButton')}>Reply</button>
                        <button className={cx('deleteButton')}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('header')}>Bình luận</h1>
            
            <div className={cx('tabs')}>
                <button 
                    className={cx('tab', { active: activeTab === 'unanswered' })}
                    onClick={() => setActiveTab('unanswered')}
                >
                    Chưa trả lời ({comments.unanswered.length})
                </button>
                <button 
                    className={cx('tab', { active: activeTab === 'answered' })}
                    onClick={() => setActiveTab('answered')}
                >
                    Đã trả lời ({comments.answered.length})
                </button>
            </div>

            <div className={cx('commentList')}>
                {activeTab === 'unanswered' && comments.unanswered.map(c => renderComment(c, false))}
                {activeTab === 'answered' && comments.answered.map(c => renderComment(c, true))}
            </div>
        </div>
    );
}

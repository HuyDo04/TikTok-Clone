import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { X } from 'lucide-react';

const cx = classNames.bind(styles);

// Mock user data, replace with API data later
const mockUserData = {
    avatar: 'https://picsum.photos/200/300',
    tiktokId: 'current_user',
    name: 'Current User',
    bio: 'This is my bio.'
};

// Mock function to check if username exists
const checkUsernameExists = async (username) => {
    console.log(`Checking if ${username} exists...`);
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            if (username === 'existing_user') {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 500);
    });
};

const EditProfile = ({ onClose }) => {
    const [userData, setUserData] = useState(mockUserData);
    const [nameError, setNameError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleNameBlur = async (e) => {
        const newName = e.target.value;
        if (newName !== mockUserData.name) {
            const exists = await checkUsernameExists(newName);
            if (exists) {
                setNameError('This name is already taken. Please choose another.');
            } else {
                setNameError('');
            }
        } else {
            setNameError('');
        }
    };

    const handleSave = () => {
        if (!nameError) {
            console.log('Saving data:', userData);
            // Add API call to save data here
            onClose(); // Close form on save
        } else {
            console.log('Cannot save, name already exists.');
        }
    };

    return (
        <div className={cx('overlay')}>
            <div className={cx('form-container')}>
                <div className={cx('header')}>
                    <h2>Sửa hồ sơ</h2>
                    <button onClick={onClose} className={cx('close-button')}>
                        <X size={24} />
                    </button>
                </div>
                <div className={cx('form-content')}>
                    <div className={cx('form-avatar')}>
                        <div className={cx('avatar-section')}>
                            <p>Ảnh hồ sơ</p>
                            <div className={cx('avatar-edit')}>
                                <img src={userData.avatar} alt="Avatar" className={cx('avatar')} />
                                <button className={cx('change-avatar-btn')}>Thay đổi</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form-section')}>
                        <label htmlFor="tiktokId">Tiktok ID</label>
                        <input
                            type="text"
                            id="tiktokId"
                            name="tiktokId"
                            value={userData.tiktokId}
                            onChange={handleChange}
                            className={cx('input')}
                        />
                    </div>
                    <div className={cx('form-section')}>
                        <label htmlFor="name">Tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            onBlur={handleNameBlur}
                            className={cx('input')}
                        />
                        {nameError && <p className={cx('error-message')}>{nameError}</p>}
                    </div>
                    <div className={cx('form-section')}>
                        <label htmlFor="bio">Tiểu sử</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={userData.bio}
                            onChange={handleChange}
                            className={cx('textarea')}
                            rows="4"
                        ></textarea>
                    </div>
                </div>
                <div className={cx('footer')}>
                    <button onClick={onClose} className={cx('cancel-button')}>Hủy</button>
                    <button onClick={handleSave} className={cx('save-button')} disabled={!!nameError}>Lưu</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;

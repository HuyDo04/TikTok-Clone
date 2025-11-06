import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import { X } from 'lucide-react';
import * as userService from '@/services/user.service';

const cx = classNames.bind(styles);

const EditProfile = ({ user, onClose, onSaveSuccess }) => {
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    avatar: '',
  });
  const [nameError, setNameError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  // Khởi tạo state với dữ liệu người dùng được truyền vào
  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user]);

  // Xử lý thay đổi input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Kiểm tra username khi người dùng rời khỏi ô input
  const handleNameBlur = async (e) => {
    const newUsername = e.target.value.trim();
    if (newUsername && newUsername !== user.username) {
      try {
        const response = await userService.checkUsername(newUsername);
        if (response.exists) {
          setNameError('Username này đã được sử dụng. Vui lòng chọn một tên khác.');
        } else {
          setNameError('');
        }
      } catch (error) {
        console.error('Error checking username:', error);
        setNameError('Không thể kiểm tra username lúc này.');
      }
    } else {
      setNameError('');
    }
  };

  // Xử lý khi người dùng chọn file ảnh mới
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setUserData((prev) => ({ ...prev, avatar: previewUrl }));
    }
  };

  // Xử lý lưu thay đổi
  const handleSave = async () => {
    if (nameError || isSaving) return;

    setIsSaving(true);
    try {
      // 1. Upload avatar nếu có ảnh mới
      if (selectedAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', selectedAvatarFile);
        await userService.updateAvatar(formData);
      }

      // 2. Cập nhật username và bio
      const dataToUpdate = {
        username: userData.username,
        bio: userData.bio,
      };
      await userService.updateUser(user.id, dataToUpdate);

      // 3. Gọi callback để reload profile và đóng modal
      onSaveSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

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
          {/* Avatar */}
          <div className={cx('form-avatar')}>
            <div className={cx('avatar-section')}>
              <p>Ảnh hồ sơ</p>
              <div className={cx('avatar-edit')}>
                <img
                  src={userData.avatar || '/default-avatar.png'}
                  alt="Avatar"
                  className={cx('avatar')}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className={cx('change-avatar-btn')}
                >
                  Thay đổi
                </button>
              </div>
            </div>
          </div>

          {/* Tiktok ID */}
          <div className={cx('form-section')}>
            <label htmlFor="tiktokId">Tiktok ID</label>
            <input
              type="text"
              id="tiktokId"
              value={user.username}
              readOnly
              className={cx('input', 'input-disabled')}
            />
          </div>

          {/* Username */}
          <div className={cx('form-section')}>
            <label htmlFor="username">Tên</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              onBlur={handleNameBlur}
              className={cx('input')}
            />
            {nameError && <p className={cx('error-message')}>{nameError}</p>}
          </div>

          {/* Bio */}
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

        {/* Footer */}
        <div className={cx('footer')}>
          <button onClick={onClose} className={cx('cancel-button')}>
            Hủy
          </button>
          <button
            onClick={handleSave}
            className={cx('save-button')}
            disabled={!!nameError || isSaving}
          >
            {isSaving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

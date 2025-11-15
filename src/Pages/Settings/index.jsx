import { Bell, BellIcon, LockIcon, Tv, UserIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BlockedUsersModal from "./BlockedUsersModal";

// --- Self-contained UI Components ---

export const Button = ({ variant, onClick, children, className = '' }) => {
    const baseStyle = "px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black";
    let variantStyle = "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500";

    if (variant === 'destructive') {
        variantStyle = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
    }
    if (variant === 'outline') {
        variantStyle = "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500";
    }
    if (variant === 'secondary') {
        variantStyle = "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500";
    }

    return (
        <button onClick={onClick} className={`${baseStyle} ${variantStyle} ${className}`}>
            {children}
        </button>
    );
};

const Switch = ({ id, checked: controlledChecked, onChange, defaultChecked = false }) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;

    const handleChange = (e) => {
        if (!isControlled) {
            setInternalChecked(e.target.checked);
        }
        if (onChange) {
            onChange(e.target.checked);
        }
    };

    return (
        <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
            <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={handleChange} />
            <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
            <div className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform ${checked ? 'transform translate-x-5' : ''}`}></div>
        </label>
    );
};

const AlertDialog = ({ trigger, title, description, onContinue, onCancel }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleContinue = () => {
        if (onContinue) onContinue();
        setIsOpen(false);
    };

    const handleCancel = () => {
        if (onCancel) onCancel();
        setIsOpen(false);
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)}>{trigger}</div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl mx-4">
                        <h3 className="text-lg font-bold text-black dark:text-white">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
                        <div className="flex justify-end space-x-4 mt-6">
                            <Button variant="secondary" onClick={handleCancel}>Hủy</Button>
                            <Button variant="destructive" onClick={handleContinue}>Tiếp tục</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// --- Core Page Logic ---

function useScrollSpy(sectionIds, options) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
        const firstIntersecting = entries.find(e => e.isIntersecting);
        if (firstIntersecting) {
            setActiveSection(firstIntersecting.target.id);
        }
    }, options);

    const { current: currentObserver } = observer;
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) currentObserver.observe(element);
    });

    return () => currentObserver.disconnect();
  }, [sectionIds, options]);

  return activeSection;
}

function SettingsSidebar({ menuItems, activeSection }) {
    return (
        <div className="w-full md:w-64 lg:w-72 p-4 lg:p-6">
            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Cài đặt</h2>
            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.id} className="mb-1">
                            <a
                                href={`#${item.id}`}
                                className={`flex items-center px-3 py-2.5 rounded-lg text-base font-medium transition-colors duration-150 ${
                                    activeSection === item.id
                                        ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white font-semibold"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                }`}
                            >
                                <span className="mr-3 text-xl">{item.icon}</span>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

function SettingItem({ label, description, children }) {
    return (
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="pr-4">
                <p className="font-semibold text-base text-black dark:text-white">{label}</p>
                {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    );
}

function SettingsSection({ section, children }) {
    return (
        <div id={section.id} className="scroll-mt-24">
            <h3 className="text-2xl font-bold mb-2 text-black dark:text-white">{section.title}</h3>
            <div className="bg-white dark:bg-black/30 rounded-lg p-4 sm:p-6">
                 {children}
            </div>
        </div>
    );
}

function SettingsPage() {
  const navigate = useNavigate();
  const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
  const menuItems = [
    { id: "account-management", label: "Quản lý tài khoản", icon: <UserIcon /> },
    { id: "privacy", label: "Quyền riêng tư", icon: <LockIcon /> },
    { id: "notifications", label: "Thông báo đẩy", icon: <BellIcon /> },
    { id: "content-preferences", label: "Tùy chọn nội dung", icon: <Tv />},
  ];

  const sectionIds = menuItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds, { rootMargin: "0px 0px -80% 0px", threshold: 0.1 });

  const handleDeleteAccount = () => {
    console.log("Account deletion initiated");
    alert("Yêu cầu xóa tài khoản đã được gửi đi. (Đây là thông báo giả lập)");
  };

  const handleDownloadData = () => {
      console.log("Requesting user data download");
      alert("Đang chuẩn bị dữ liệu của bạn. (Đây là thông báo giả lập)");
  }

  const handleChangePassword = () => {
    navigate('/auth/change-password');
  };

  const handleLanguageSettings = () => {
    navigate('/settings/languages'); // Chuyển hướng đến trang cài đặt ngôn ngữ
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-zinc-900">
      <aside className="md:fixed md:h-screen md:border-r md:border-gray-200 dark:md:border-gray-800">
        <SettingsSidebar menuItems={menuItems} activeSection={activeSection} />
      </aside>
      <main className="md:ml-64 lg:ml-72 flex-1 mt-12 p-6 sm:p-8 md:p-10 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        <div className="max-w-4xl mx-auto space-y-12">
            <SettingsSection section={{id: "account-management", title: "Quản lý tài khoản"}}>
                <SettingItem label="Xóa tài khoản" description="Hành động này không thể hoàn tác và sẽ xóa vĩnh viễn tài khoản của bạn.">
                    <AlertDialog
                        trigger={<Button variant="destructive">Xóa tài khoản</Button>}
                        title="Bạn có chắc chắn muốn xóa tài khoản?"
                        description="Thao tác này sẽ xóa vĩnh viễn tài khoản của bạn và toàn bộ dữ liệu liên quan. Bạn không thể hoàn tác hành động này."
                        onContinue={handleDeleteAccount}
                    />
                </SettingItem>
            </SettingsSection>

            <SettingsSection section={{id: "privacy", title: "Quyền riêng tư"}}>
                <SettingItem label="Tài khoản riêng tư" description="Khi ở chế độ riêng tư, chỉ những người bạn phê duyệt mới có thể theo dõi bạn.">
                    <Switch id="private-account" />
                </SettingItem>
                <SettingItem label="Đổi mật khẩu" description="Đổi mật khẩu">
                    
                    <Button variant="outline" onClick={handleChangePassword}>Đổi</Button>
                </SettingItem>
                <SettingItem label="Tài khoản đã chặn" description="Quản lý các tài khoản bạn đã chặn.">
                    <Button variant="outline" onClick={() => setIsBlockedModalOpen(true)}>Quản lý</Button>
                </SettingItem>
                <SettingItem label="Tải về dữ liệu của bạn" description="Nhận một bản sao dữ liệu TikTok của bạn.">
                    <Button variant="outline" onClick={handleDownloadData}>Yêu cầu dữ liệu</Button>
                </SettingItem>
            </SettingsSection>

            <SettingsSection section={{id: "notifications", title: "Thông báo đẩy"}}>
                <SettingItem label="Tương tác" description="Lượt thích, bình luận, người theo dõi mới, lượt đề cập.">
                    <Switch id="notifications-interactions" defaultChecked />
                </SettingItem>
                <SettingItem label="Tin nhắn trực tiếp" description="Nhận thông báo về tin nhắn mới.">
                    <Switch id="notifications-dms" defaultChecked />
                </SettingItem>
                <SettingItem label="Cập nhật từ TikTok" description="Cập nhật sản phẩm và thông báo quan trọng khác.">
                    <Switch id="notifications-tiktok-updates" />
                </SettingItem>
            </SettingsSection>

            <SettingsSection section={{id: "content-preferences", title: "Tùy chọn nội dung"}}>
                <SettingItem label="Ngôn ngữ video" description="Quản lý ngôn ngữ cho video của bạn.">
                     <Button variant="outline" onClick={handleLanguageSettings}>Thêm ngôn ngữ</Button>
                </SettingItem>
                <SettingItem label="Chế độ hạn chế" description="Hạn chế các video có thể không phù hợp với một số người xem.">
                    <Switch id="restricted-mode" />
                </SettingItem>
            </SettingsSection>
        </div>
      </main>

      <BlockedUsersModal 
        isOpen={isBlockedModalOpen}
        onClose={() => setIsBlockedModalOpen(false)}
      />
    </div>
  );
}

export default SettingsPage;
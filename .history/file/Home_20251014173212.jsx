import React, { useState, useEffect } from 'react';
import { Search, Menu, Upload, Heart, MessageCircle, Share2, Music } from 'lucide-react';

// =================================================================================
// 1. MOCK DATA (Dữ liệu giả lập)
// =================================================================================

const sidebarMenu = [
    { title: "Đề xuất", icon: "🏠", active: true, path: "/" },
    { title: "Khám phá", icon: "🧭", active: false, path: "/discover" },
    { title: "Đã follow", icon: "🧑‍🤝‍🧑", active: false, path: "/following" },
    { title: "LIVE", icon: "📺", active: false, path: "/live" },
];

const userActions = [
    { title: "Tải lên", icon: "➕", path: "/upload" },
    { title: "Hồ sơ", icon: "👤", path: "/profile" },
    { title: "Thêm", icon: "•••", path: "/more" },
];

const suggestedAccounts = [
    { id: 1, username: "thuytien", name: "Thủy Tiên", avatar: "https://placehold.co/40x40/FF5588/FFFFFF?text=TT", followers: "3.5M" },
    { id: 2, username: "truongan", name: "Trường An Official", avatar: "https://placehold.co/40x70/007bff/FFFFFF?text=TA", followers: "1.2M" },
    { id: 3, username: "minh_hieu", name: "Minh Hiếu", avatar: "https://placehold.co/40x40/28a745/FFFFFF?text=MH", followers: "800K" },
];

const videoFeed = [
    {
        id: 1,
        user: { username: "nguyenvana", name: "Nguyễn Văn A", avatar: "https://placehold.co/56x56/FFD700/000000?text=A" },
        caption: "Khoảnh khắc tuyệt vời khi bình minh 🌄 #vietnam #dulich",
        music: "Âm nhạc: Một bài hát nhẹ nhàng...",
        likes: "1.2K",
        comments: "88",
        shares: "25",
        videoUrl: "https://dummy-video-url.mp4", 
    },
    {
        id: 2,
        user: { username: "hotgirlB", name: "Hot Girl B", avatar: "https://placehold.co/56x56/00AABB/FFFFFF?text=B" },
        caption: "Thử thách nhảy 🕺🏻 Cả nhà cùng tham gia nhé!",
        music: "Âm nhạc: Challenge hit",
        likes: "5.5K",
        comments: "312",
        shares: "105",
        videoUrl: "https://dummy-video-url-2.mp4",
    },
    // Thêm video để tạo hiệu ứng cuộn
    ...Array(5).fill().map((_, i) => ({
        id: i + 4,
        user: { username: `user${i+4}`, name: `Người dùng ${i+4}`, avatar: `https://placehold.co/56x56/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${i+4}` },
        caption: `Video ngẫu nhiên số ${i+4}. Nội dung thú vị để khám phá!`,
        music: `Âm nhạc: Lo-fi beat ${i+4}`,
        likes: `${Math.floor(Math.random() * 100) + 1}K`,
        comments: `${Math.floor(Math.random() * 50) + 10}`,
        shares: `${Math.floor(Math.random() * 30) + 5}`,
        videoUrl: `https://dummy-video-url-${i+4}.mp4`,
    }))
];


// =================================================================================
// 2. COMPONENT: VideoPost (Bài đăng video trong feed)
// =================================================================================

const VideoPost = ({ data }) => {
    // Giả lập chức năng tương tác
    const handleAction = (action) => console.log(`${action} video ${data.id}`);

    return (
        <div className="flex border-b border-gray-700 py-6 px-4 md:px-0 max-w-2xl mx-auto">
            {/* Thông tin người dùng và nội dung */}
            <div className="flex-grow">
                {/* Header người dùng */}
                <div className="flex items-start space-x-3 mb-2">
                    <img src={data.user.avatar} alt={data.user.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-grow">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold hover:underline cursor-pointer text-white">{data.user.username}</h3>
                                <p className="text-sm text-gray-300">{data.user.name}</p>
                            </div>
                            <button className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white text-sm font-semibold py-1 px-4 rounded-md transition-all duration-200 flex-shrink-0">
                                Follow
                            </button>
                        </div>
                    </div>
                </div>

                {/* Caption và Music */}
                <p className="text-white mb-2 ml-16 md:ml-16 leading-relaxed">{data.caption}</p>
                <div className="flex items-center text-sm text-gray-300 ml-16 md:ml-16 mb-4">
                    <Music className="w-4 h-4 mr-2" />
                    <span className="font-semibold hover:underline cursor-pointer">{data.music}</span>
                </div>

                {/* Khu vực Video và Thanh Tương Tác */}
                <div className="flex space-x-4 ml-16 md:ml-16">
                    {/* Video Placeholder */}
                    <div className="w-full max-w-md bg-gray-900 rounded-xl overflow-hidden shadow-lg aspect-[9/16] relative flex items-center justify-center">
                        <p className="text-gray-500 text-center p-4">
                            [Video Player Placeholder]<br/>
                            {data.videoUrl}
                        </p>
                        {/* Nút Play lớn ở giữa */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors">
                             <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4l12 8-12 8V4z"/></svg>
                        </div>
                    </div>

                    {/* Thanh Tương Tác (Bên phải video) */}
                    <div className="flex flex-col justify-end space-y-4">
                        {/* Nút Like */}
                        <button onClick={() => handleAction('Thích')} className="flex flex-col items-center text-white hover:text-red-500 transition-colors">
                            <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                                <Heart className="w-6 h-6 fill-current" />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{data.likes}</span>
                        </button>
                        {/* Nút Comment */}
                        <button onClick={() => handleAction('Bình luận')} className="flex flex-col items-center text-white hover:text-blue-400 transition-colors">
                            <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{data.comments}</span>
                        </button>
                        {/* Nút Share */}
                        <button onClick={() => handleAction('Chia sẻ')} className="flex flex-col items-center text-white hover:text-green-500 transition-colors">
                            <div className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                                <Share2 className="w-6 h-6" />
                            </div>
                            <span className="text-xs mt-1 font-semibold">{data.shares}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// =================================================================================
// 3. COMPONENT: Sidebar (Thanh điều hướng bên trái)
// =================================================================================

const NavItem = ({ icon, title, active, isCollapsed }) => (
    <div
        className={`
            flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-colors duration-200
            ${active ? 'text-red-500 font-semibold bg-gray-900' : 'text-gray-300 hover:bg-gray-800'}
            ${isCollapsed ? 'justify-center w-12 h-12' : 'w-full'}
        `}
        title={title} // Tooltip khi thu gọn
    >
        <span className={`text-2xl ${isCollapsed ? 'mx-auto' : ''}`}>{icon}</span>
        {!isCollapsed && <span className="text-sm truncate">{title}</span>}
    </div>
);

const Sidebar = ({ isCollapsed }) => {
    // Điều chỉnh Tailwind classes để tạo hiệu ứng chuyển động mượt mà
    const sidebarWidthClass = isCollapsed ? 'w-16' : 'w-64';

    return (
        <div
            className={`
                fixed top-0 left-0 h-screen bg-black text-white p-4 pt-16
                transition-all duration-300 ease-in-out z-20 overflow-y-auto border-r border-gray-800
                ${sidebarWidthClass}
                // Ẩn hoàn toàn trên mobile, chỉ hiện trên desktop
                hidden md:block 
            `}
        >
            {/* Menu chính */}
            <div className={`space-y-1 mb-6 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                {sidebarMenu.map((item) => (
                    <NavItem key={item.title} {...item} isCollapsed={isCollapsed} />
                ))}
            </div>
            
            {/* Đường phân cách */}
            <div className={`h-px bg-gray-700 mx-auto ${isCollapsed ? 'w-8' : 'w-full'} mb-6`}></div>

            {/* Nút Đăng nhập/Gợi ý tài khoản chỉ hiển thị khi mở rộng */}
            {!isCollapsed && (
                <>
                    {/* Khu vực Đăng nhập */}
                    <div className="p-4 border border-gray-700 rounded-xl bg-gray-900 mb-6">
                        <p className="text-sm text-gray-400 mb-4">
                            Đăng nhập để theo dõi tác giả, thích video và xem bình luận.
                        </p>
                        <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors duration-200">
                            Đăng nhập
                        </button>
                    </div>
                    
                    {/* Tài khoản được đề xuất */}
                    <div className="mb-6">
                        <p className="text-xs text-gray-400 mb-3 font-semibold uppercase">Tài khoản được đề xuất</p>
                        <div className="space-y-2">
                            {suggestedAccounts.map((account) => (
                                <div key={account.id} className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-colors duration-200">
                                    <img src={account.avatar} alt={account.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold truncate max-w-[120px] text-white">{account.username}</p>
                                        <p className="text-xs text-gray-400">{account.name}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="text-sm text-red-500 hover:text-red-400 cursor-pointer pt-2">Xem tất cả</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-xs text-gray-500 space-y-1 mt-6">
                        <p>
                            <span className="hover:underline cursor-pointer mr-2">Công ty</span>
                            <span className="hover:underline cursor-pointer">Chương trình</span>
                        </p>
                        <p className="hover:underline cursor-pointer">Điều khoản và chính sách</p>
                        <p className="mt-2">© 2025 TikTok</p>
                    </div>
                </>
            )}
        </div>
    );
};


// =================================================================================
// 4. MAIN APP COMPONENT (Bố cục chính)
// =================================================================================

const App = () => {
    // State để quản lý trạng thái đóng/mở của Sidebar
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    
    // State để mô phỏng loading data
    const [isLoading, setIsLoading] = useState(true);

    // Toggle function cho Sidebar
    const toggleSidebar = () => {
        setIsSidebarCollapsed(prev => !prev);
    };

    // Mô phỏng quá trình tải dữ liệu
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Điều chỉnh margin cho main content dựa trên trạng thái Sidebar
    const mainContentMarginClass = isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64';

    return (
        <div className="bg-black min-h-screen font-sans">
            {/* Load Tailwind CSS và Lucide Icons */}
            <script src="https://unpkg.com/lucide@latest"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            
            <style>
                {/* Tùy chỉnh CSS cho giao diện tối */}
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                .font-sans {
                    font-family: 'Inter', sans-serif;
                }
                /* Tùy chỉnh thanh cuộn cho giao diện tối */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #000000;
                }
                ::-webkit-scrollbar-thumb {
                    background: #4B5563;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #6B7280;
                }
                body { margin: 0; }
                `}
            </style>

            {/* Header (Navbar) */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-black z-30 flex items-center justify-between px-4 md:px-6 border-b border-gray-800 shadow-md">
                {/* Logo và Menu Toggle */}
                <div className="flex items-center">
                    <button 
                        onClick={toggleSidebar}
                        className="p-2 text-white hover:bg-gray-800 rounded-full transition-colors duration-200 mr-4 hidden md:block" // Nút toggle chỉ hiện trên desktop
                        title={isSidebarCollapsed ? "Mở rộng Sidebar" : "Thu gọn Sidebar"}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="text-3xl font-extrabold text-white tracking-tighter">TikTok</span>
                </div>

                {/* Thanh tìm kiếm */}
                <div className="flex flex-grow max-w-lg mx-4 md:mx-8">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Tìm kiếm tài khoản và video"
                            className="w-full py-2 px-4 pl-10 bg-gray-800 text-white rounded-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Các nút hành động (Phải) */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button className="flex items-center space-x-1 py-1 px-3 border border-gray-700 text-white hover:bg-gray-800 rounded-md transition-colors duration-200">
                        <Upload className="w-5 h-5" />
                        <span className="text-sm font-medium hidden sm:inline">Tải lên</span>
                    </button>
                    <button className="py-1 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors duration-200">
                        Đăng nhập
                    </button>
                    <button className="p-2 text-white hover:bg-gray-800 rounded-full transition-colors duration-200" title="Cài đặt">
                        {/* Icon 3 chấm dọc */}
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="7" r="1.5"></circle><circle cx="12" cy="12" r="1.5"></circle><circle cx="12" cy="17" r="1.5"></circle></svg>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex pt-16">
                {/* Sidebar */}
                <Sidebar isCollapsed={isSidebarCollapsed} />

                {/* Feed Video chính */}
                <main 
                    className={`
                        flex-grow bg-black transition-all duration-300 ease-in-out p-4 md:p-6 
                        ${mainContentMarginClass} 
                        w-full 
                        // Giới hạn chiều rộng nội dung trên desktop
                        md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px] 
                        mx-auto
                    `}
                >
                    
                    {isLoading ? (
                        <div className="text-white text-center py-20">
                            <svg className="animate-spin h-8 w-8 text-red-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p>Đang tải video... (Mô phỏng)</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {videoFeed.map((video) => (
                                <VideoPost key={video.id} data={video} />
                            ))}
                            <div className="text-center text-gray-500 py-10">
                                <p>Bạn đã xem hết! Tải thêm hoặc Đăng nhập để khám phá nội dung mới!</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;

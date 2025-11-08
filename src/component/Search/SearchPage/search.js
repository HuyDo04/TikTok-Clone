/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import SearchPage from '@/component/Search/SearchPage/SearchPage';

export default function Search() {
  const router = useRouter();
  const { q } = router.query; // Lấy query 'q' từ URL, ví dụ: /search?q=son

  // Bạn có thể sử dụng 'q' để fetch dữ liệu trong tương lai
  // Hiện tại, chúng ta chỉ hiển thị SearchPage
  // console.log('Search query:', q);

  return (
    <div>
      <SearchPage />
    </div>
  );
}

// 
import React, { useRef } from "react";
import classNames from "classnames/bind";
import styles from "./ShareMenu.module.scss";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Facebook,
  MessageSquare,
  Share2,
  Link as LinkIcon,
  Send,
  Code,
} from "lucide-react";

const cx = classNames.bind(styles);

const shareOptions = [
  { icon: <LinkIcon />, label: "Copy" },
  { icon: <Send />, label: "WhatsApp" },
  { icon: <Code />, label: "Nhúng" },
  { icon: <Facebook />, label: "Facebook" },
  { icon: <MessageSquare />, label: "Messenger" },
  { icon: <Send />, label: "Telegram" },
  { icon: <Share2 />, label: "Zalo" },
];

const ShareMenu = ({ isOpen, onClose }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!isOpen) return null; // ❗ Không render gì nếu chưa mở

  return (
    <div className={cx("overlay")} onClick={onClose}>
      <div className={cx("sharePopup")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("header")}>
          <h4>Chia sẻ đến</h4>
          <button className={cx("closeBtn")} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className={cx("carouselWrapper")}>
          <button
            className={cx("navBtn", "prev")}
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft />
          </button>

          <div className={cx("shareList")} ref={scrollRef}>
            {shareOptions.map((item, idx) => (
              <div key={idx} className={cx("shareItem")}>
                <div className={cx("iconWrapper")}>{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <button
            className={cx("navBtn", "next")}
            onClick={() => handleScroll("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareMenu;

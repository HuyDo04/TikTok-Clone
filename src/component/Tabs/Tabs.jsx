import React, { useEffect, useRef, useState } from "react";
const defaultFn = () => {};

function Tabs({
  defaultIndex = 0,
  children,
  onChange = defaultFn,
  wrapperClass = "", // class cho toàn bộ tabs
  listClass = "", // class cho list tab buttons
  tabClass = "", // class cho từng tab button
  activeTabClass = "", // class cho tab đang active
  contentClass = "", // class cho phần nội dung tab
}) {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const tabs = React.Children.toArray(children);
  const prevIndex = useRef(defaultIndex);

  useEffect(() => {
    if (prevIndex.current !== currentIndex) {
      onChange(currentIndex);
    }
    prevIndex.current = currentIndex;
  }, [currentIndex]);

  return (
    <div className={wrapperClass}>
      <div className={listClass}>
        {tabs.map((item, i) => {
          const active = currentIndex === i;
          return (
            <button
              key={i}
              className={`${tabClass} ${active ? activeTabClass : ""}`}
              onClick={() => setCurrentIndex(i)}
            >
              {item.props.title}
            </button>
          );
        })}
      </div>
      <div className={contentClass}>{tabs[currentIndex]}</div>
    </div>
  );
}

export default Tabs;

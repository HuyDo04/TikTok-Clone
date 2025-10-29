import classNames from "classnames/bind";
import styles from "./SceneLayout.module.scss";

const cx = classNames.bind(styles);

function SceneLayout() {
  return (
    <div className={cx("scene-layout")}>
      <h3 className={cx("scene-title")}>Scene layout</h3>

      <div className={cx("layout-options")}>
        <button className={cx("layout-btn")} title="Full screen">
          <div className={cx("icon")}>⬜</div>
        </button>
        <button className={cx("layout-btn")} title="Split screen">
          <div className={cx("icon")}>⬜⬜</div>
        </button>
        <button className={cx("layout-btn")} title="Picture in picture">
          <div className={cx("icon")}>⬜◻️</div>
        </button>
      </div>

      <div className={cx("scenes")}>
        <h4>Scenes</h4>
        <div className={cx("scene-item")}>
          <span>Full-screen camera</span>
        </div>
      </div>

      <div className={cx("sources")}>
        <h4>Sources</h4>
        <button className={cx("add-btn")}>+ Camera</button>
      </div>
    </div>
  )
}

export default SceneLayout;
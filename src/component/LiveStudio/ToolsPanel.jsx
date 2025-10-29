import classNames from "classnames/bind";
import styles from "./ToolsPanel.module.scss";

const cx = classNames.bind(styles);

function ToolsPanel() {
  const tools = [
    { id: 1, name: "Viewer Wishes", icon: "👥" },
    { id: 2, name: "Play Together", icon: "🎮" },
    { id: 3, name: "LIVE Goal", icon: "🎯" },
    { id: 4, name: "Poll & Gift vote", icon: "✅" },
    { id: 5, name: "Playbook", icon: "📖" },
    { id: 6, name: "Gift Gallery", icon: "🎁" },
    { id: 7, name: "Super Fan", icon: "⭐" },
    { id: 8, name: "Fan Club", icon: "👫" },
    { id: 9, name: "Promote", icon: "📢" },
  ]

  return (
    <div className={cx("tools-panel")}>
      <h3>Tools</h3>

      <div className={cx("tools-grid")}>
        {tools.map((tool) => (
          <button key={tool.id} className={cx("tool-btn")} title={tool.name}>
            <span className={cx("icon")}>{tool.icon}</span>
            <span className={cx("name")}>{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToolsPanel;
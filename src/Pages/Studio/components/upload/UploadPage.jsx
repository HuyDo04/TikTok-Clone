"use client"

import UploadForm from "../upload/UploadForm"
import classNames from "classnames/bind"
import styles from "./UploadPage.module.scss"

const cx = classNames.bind(styles)

export default function UploadPage() {
  return (
    <main className={cx("uploadPage")}>
      <div className={cx("container")}>
        <UploadForm />
      </div>
    </main>
  )
}

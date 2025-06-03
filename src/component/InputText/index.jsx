import PropTypes from "prop-types";
import styles from "./InputText.module.scss";
function InputText({ type = "text", name, register, message = "" }) {
  return (
    <>
      <input type={type} name={name} {...register} className={styles.input} />
      <br />
      {message && <span className={`${styles.error}`}>{message}</span>}
      <br />
    </>
  );
}

InputText.protoTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  register: PropTypes.object,
};

export default InputText;


import PropTypes from "prop-types";
import styles from "./Input.module.scss";
import clsx from "clsx";

const Input = ({ label, type = "text", name, value, onChange, error, placeholder,autoComplete }) => {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(styles.input, { [styles.errorInput]: error })}
        autoComplete={autoComplete}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;

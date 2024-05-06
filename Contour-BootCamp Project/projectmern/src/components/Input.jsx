import PropTypes from "prop-types";

const inputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-green-500 border-2 focus:z-10 sm:text-sm";

export default function Input({
  handleChange,
  value,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  options,
  customClass,
}) {
  return (
    <div className="my-5">
      {type === "select" ? (
        <select
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          required={isRequired}
          className={`${inputClass} ${customClass}`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={`${inputClass} ${customClass}`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  customClass: PropTypes.string,
};



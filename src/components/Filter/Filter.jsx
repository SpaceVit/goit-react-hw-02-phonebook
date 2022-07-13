import PropTypes from 'prop-types';

export default function Filter({ value, onChange }) {
  return (
    <label>
      Filter
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

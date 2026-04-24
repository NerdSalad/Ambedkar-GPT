import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function PhoneField({ value, onChange, error }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium mb-1" style={{ color: '#9db3d8' }}>
        Phone Number
      </label>
      <div className={`phone-field${error ? ' error' : ''}`}>
        <PhoneInput
          international
          defaultCountry="IN"
          value={value}
          onChange={onChange}
          placeholder="Enter phone number"
        />
      </div>
      {error && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{error}</p>}
    </div>
  );
}

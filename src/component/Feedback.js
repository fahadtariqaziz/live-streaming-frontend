import { useState } from 'react';
import Card from "./Card";
import Welcome from "./Welcome";

export default function Feedback() {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide the popup after 3 seconds
  };

  return (
    <div style={styles.container}>
      <Welcome />
      <div style={styles.formContainer}>
        <form>
          <p style={styles.title}>Feedback & Queries</p>
          <div>
            <label style={styles.label}>Select Issue*</label>
            <br />
            <select style={styles.select}>
              <option value="Feedback">-- Select Your Query --</option>
              <option value="Feedback">Feedback</option>
              
              <option value="Payment Related Issue">Payment Related Issue</option>
              <option value="Hiring Related Queries">Hiring Related Queries</option>
              <option value="Advertise With Us">Advertise With Us</option>
            </select>
            <label style={styles.label}>Email Address*</label>
            <br />
            <input style={styles.input} type="email" placeholder="fahad@gmail.com" />
            <label style={styles.label}>Contact No.</label>
            <br />
            <input style={styles.input} type="text" placeholder="1324567890" />
            <label style={styles.label}>Drop Your Query</label>
            <br />
            <textarea style={styles.textarea} rows="4" maxLength="300" placeholder="Max Allowed Characters: 300"></textarea>
            <button style={styles.button} type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
        {showPopup && (
          <div style={styles.popup}>
            Feedback Sent!
          </div>
        )}
      </div>
      <Card />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  formContainer: {
    width: '20rem',
    border: '2px solid #e2e8f0',
    padding: '1rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    position: 'relative',
    marginTop: '2rem',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  label: {
    fontSize: '0.875rem',
  },
  select: {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    color: '#4b5563',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    padding: '0.625rem',
    width: '100%',
    marginTop: '0.25rem',
    marginBottom: '1rem',
  },
  input: {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    padding: '0.625rem',
    width: '100%',
    marginTop: '0.25rem',
    marginBottom: '1rem',
  },
  textarea: {
    backgroundColor: '#f9fafb',
    border: '1px solid #d1d5db',
    fontSize: '0.875rem',
    borderRadius: '0.5rem',
    padding: '0.625rem',
    width: '100%',
    marginTop: '0.25rem',
    marginBottom: '1rem',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
  },
  buttonHover: {
    backgroundColor: '#2563eb',
  },
  popup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

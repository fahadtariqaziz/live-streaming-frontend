export default function Card() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardContent}>
            <h5 style={styles.cardTitle}>Contact Information</h5>
            <ul>
              <li style={styles.listItem}>
                <span><i className="fa fa-phone" style={styles.icon}></i> 123-456-7890</span>
              </li>
              <li style={styles.listItem}>
                <span><i className="fa fa-envelope" style={styles.icon}></i> fahadtariqaziz1@gmail.com</span>
              </li>
              <li style={styles.listItem}>
                <span><i className="fa-solid fa-map-pin" style={styles.icon}></i> 123 Main St, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardContent}>
            <h5 style={styles.cardTitle}>Reach Us At</h5>
            <div style={styles.iconContainer}>
              <i className="fa fa-handshake fa-2xl"></i>
            </div>
            <div style={styles.textLeft}>
              <span><i className="fa fa-envelope" style={styles.icon}></i> fahadtariqaziz1@gmail.com</span>
            </div>
            <div style={styles.textLeft}>
              <span><i className="fa-solid fa-map-pin" style={styles.icon}></i> FAHAD TARIQ, Web Developer - 1012,</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
      marginTop: '2rem',
    },
    card: {
      height: '13rem',
      width: '24rem',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '0.75rem',
      backgroundColor: '#ffffff',
      color: '#4b5563',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
    cardContent: {
      padding: '1.5rem',
    },
    cardTitle: {
      textAlign: 'center',
      marginBottom: '0.5rem',
      fontFamily: 'sans-serif',
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1e293b',
    },
    listItem: {
      marginTop: '0.5rem',
    },
    icon: {
      marginRight: '0.5rem',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    textLeft: {
      textAlign: 'left',
      marginTop: '1rem',
    },
  };
  
import React from "react";

export default function About() {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>About Easy Stream</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            At Easy Stream, our mission is to provide seamless and accessible
            online streaming of your favorite channels. We aim to revolutionize
            the way you watch TV by offering a wide range of channels and an
            intuitive user experience.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
          <p style={styles.text}>
            Easy Stream offers a diverse selection of channels across various
            genres including news, sports, entertainment, and more. Our platform
            is designed to be user-friendly and adaptable to your preferences.
          </p>
        </div>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.text}>
            Have questions or feedback? We'd love to hear from you! Reach out to
            us at{" "}
            <a href="mailto:fahadtariqaziz1@gmail.com" style={styles.link}>
              fahadtariqaziz1@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  h2: {
    color: "#fff",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    lineHeight: "1.6",
  },
  header: {
    backgroundColor: "#1a202c",
    color: "#fff",
    padding: "2rem 0",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    margin: 0,
  },
  content: {
    padding: "2rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "0.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1rem",
  },
  link: {
    color: "#3182ce",
    textDecoration: "none",
  },
};

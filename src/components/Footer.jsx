function Footer() {
  return (
    <footer className="footer-masthead text-center py-4 mt-auto">
  <div className="container">
    <h6 className="mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>The Daily Draft</h6>
    <small>© {new Date().getFullYear()} All rights reserved.</small>
  </div>
</footer>
  );
}

export default Footer;
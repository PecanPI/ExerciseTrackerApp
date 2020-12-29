import React from "react";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <div className="container text-center">
      <footer className="main-footer py-4 bg-dark flex-shrink-0">
      
        <div className="footer-middle">
          <div className="row">
            {/* Column One */}
            <div className="col-md-3 col-sm-6 navbar-brand">
              <h4>Matthew Logan</h4>
            </div>
            {/* Column Two */}
            <div className="col-md-3 col-sm-6">
                <Link to="https://www.google.com" className="nav-link">
                  Contact
                </Link>
            </div>
            {/* Column Two */}
            <div className="col-md-3 col-sm-6">
              <h4>Other Thing</h4>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p classname="text-xs-center">
              © {new Date().getFullYear()} Exercise App
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterPage;

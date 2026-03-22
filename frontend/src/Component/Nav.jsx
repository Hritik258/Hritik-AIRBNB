import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { PiFarmFill } from "react-icons/pi";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { FaDollyFlatbed } from "react-icons/fa";
import { GiWoodCabin } from "react-icons/gi";
import { CiShop } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { AuthDataContext } from '../Context/AuthContext';
import { userDataContext } from '../Context/UserContext';
import { listingDataContext } from '../Context/listingContext';

const Nav = () => {
  const { isAuthenticated, logout } = useContext(AuthDataContext);
  const { userData, setuserData } = useContext(userDataContext);
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useContext(listingDataContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const categories = [
    { name: 'Trending', icon: <MdWhatshot size={22} /> },
    { name: 'Villa', icon: <MdOutlineHolidayVillage size={22} /> },
    { name: 'Farm House', icon: <PiFarmFill size={22} /> },
    { name: 'Pool House', icon: <MdPool size={22} /> },
    { name: 'Rooms', icon: <MdBedroomParent size={22} /> },
    { name: 'Flat', icon: <FaDollyFlatbed size={22} /> },
    { name: 'PG', icon: <MdBedroomParent size={22} /> },
    { name: 'Cabins', icon: <GiWoodCabin size={22} /> },
    { name: 'Shops', icon: <CiShop size={22} /> },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setuserData(null);
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      setuserData(null);
      setIsProfileOpen(false);
      navigate('/');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-wrapper {
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          position: sticky;
          top: 0;
          z-index: 1000;
          overflow: visible;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
        }

        .nav-top {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
          gap: 24px;
          overflow: visible;
        }

        .nav-logo {
          flex-shrink: 0;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-logo-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #FF385C 0%, #ff6b35 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(255,56,92,0.35);
          flex-shrink: 0;
        }
        .nav-logo-icon svg {
          width: 20px;
          height: 20px;
          fill: white;
        }
        .nav-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .nav-logo-main {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a2e;
          letter-spacing: -0.3px;
        }
        .nav-logo-sub {
          font-size: 10px;
          font-weight: 500;
          color: #FF385C;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 1px;
        }

        .nav-search-form {
          flex: 1;
          max-width: 520px;
        }
        .nav-search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nav-search-input {
          width: 100%;
          border: 1.5px solid #e8e8e8;
          border-radius: 50px;
          padding: 13px 56px 13px 22px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          outline: none;
          background: #fafafa;
          color: #1a1a2e;
          transition: all 0.2s ease;
        }
        .nav-search-input::placeholder { color: #aaa; }
        .nav-search-input:focus {
          background: #fff;
          border-color: #FF385C;
          box-shadow: 0 0 0 4px rgba(255,56,92,0.08);
        }
        .nav-search-btn {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(135deg, #FF385C 0%, #ff6b35 100%);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          box-shadow: 0 3px 10px rgba(255,56,92,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-search-btn:hover {
          transform: translateY(-50%) scale(1.07);
          box-shadow: 0 5px 16px rgba(255,56,92,0.5);
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          position: relative;
          z-index: 1001;
        }
        .nav-list-home {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          padding: 9px 18px;
          border-radius: 50px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.15s;
          letter-spacing: -0.1px;
        }
        .nav-list-home:hover { background: #f5f5f5; }

        .nav-profile-wrap {
          position: relative;
          z-index: 1002;
        }
        .nav-profile-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid #e8e8e8;
          border-radius: 50px;
          padding: 7px 14px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .nav-profile-btn:hover {
          border-color: #ccc;
          box-shadow: 0 3px 12px rgba(0,0,0,0.1);
        }
        .nav-avatar {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #FF385C, #ff6b35);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 13px;
          font-weight: 700;
        }

        .nav-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 230px;
          background: #fff;
          border: 1px solid #f0f0f0;
          border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          padding: 8px 0;
          z-index: 99999;
          animation: dropIn 0.18s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-dropdown a,
        .nav-dropdown button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          padding: 11px 20px;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a2e;
          text-decoration: none;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.12s;
          letter-spacing: -0.1px;
        }
        .nav-dropdown a:hover,
        .nav-dropdown button:hover {
          background: #fafafa;
          color: #FF385C;
        }
        .nav-dropdown-divider {
          border: none;
          border-top: 1px solid #f5f5f5;
          margin: 6px 0;
        }
        .logout-btn { color: #e53e3e !important; }
        .logout-btn:hover {
          background: #fff5f5 !important;
          color: #e53e3e !important;
        }

        .nav-categories {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
          border-top: 1px solid #f5f5f5;
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .nav-categories::-webkit-scrollbar { display: none; }

        .nav-cat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          cursor: pointer;
          flex-shrink: 0;
          color: #9ca3af;
          padding: 10px 16px 8px;
          border-bottom: 2px solid transparent;
          border-radius: 4px 4px 0 0;
          transition: all 0.18s ease;
          position: relative;
        }
        .nav-cat-item:hover { color: #374151; }
        .nav-cat-item.active {
          color: #1a1a2e;
          border-bottom: 2px solid #FF385C;
        }
        .nav-cat-item.active svg { color: #FF385C; }
        .nav-cat-item span {
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
          letter-spacing: 0.2px;
        }
      `}</style>

      <nav className="nav-wrapper">
        <div className="nav-top">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
                <path d="M9 22V12h6v10" fill="rgba(255,255,255,0.3)"/>
              </svg>
            </div>
            <div className="nav-logo-text">
              <span className="nav-logo-main">NestAway</span>
              <span className="nav-logo-sub">Find your stay</span>
            </div>
          </Link>

          <form className="nav-search-form" onSubmit={handleSearch}>
            <div className="nav-search-wrap">
              <input
                type="text"
                className="nav-search-input"
                placeholder="Search city, location or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="nav-search-btn">
                <IoSearchSharp size={16} />
              </button>
            </div>
          </form>

          <div className="nav-right">
            <Link to="/listingpage1" className="nav-list-home">
              List your home
            </Link>

            <div className="nav-profile-wrap" ref={dropdownRef}>
              <button
                className="nav-profile-btn"
                onClick={() => setIsProfileOpen((prev) => !prev)}
                type="button"
              >
                <HiMenu size={17} color="#374151" />
                <div className="nav-avatar">
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : <CgProfile size={17} />}
                </div>
              </button>

              {isProfileOpen && (
                <div className="nav-dropdown">
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login" onClick={() => setIsProfileOpen(false)}>
                        Login
                      </Link>
                      <Link to="/signup" onClick={() => setIsProfileOpen(false)}>
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/listingpage1" onClick={() => setIsProfileOpen(false)}>
                        List your Home
                      </Link>
                      <Link to="/my-listings" onClick={() => setIsProfileOpen(false)}>
                        My Listings
                      </Link>
                      <Link to="/check-booking" onClick={() => setIsProfileOpen(false)}>
                        Check Booking
                      </Link>
                      <hr className="nav-dropdown-divider" />
                      <button className="logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="nav-categories">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`nav-cat-item ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;

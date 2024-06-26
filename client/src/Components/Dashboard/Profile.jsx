import React, { useEffect, useState } from "react";
import "../../CSS/profile-card.css";
import Scanner from "./ScannerBtn";
import { useNavigate } from "react-router-dom";
import Leaderboardbtn from './Leaderboardbtn'
import Logout from "../Mainlanding/Logout";

const LOADING_MESSAGE = 'Loading...';
const UNAUTHORIZED_MESSAGE = 'Unauthorized access';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log(UNAUTHORIZED_MESSAGE);
        navigate("/");
        return;
      }

      try {
        const response = await fetch("/api/profile", {
          method: 'GET',
          headers: {
            "x-access-token": token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          const data = await response.json();
          alert(data.error);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details');
      }
    }

    fetchUserDetails();
  }, [navigate]);

  if (!user) {
    return <div className="text-2xl font-mono font-bold p-4 text-white">{LOADING_MESSAGE}</div>;
  }


  return (
    <div>
      <div className="card">
        <div className="card__image"><Logout /></div>
        <div className="flex flex-row justify-between items-center">
          <div className="card__content">
            <span className="card__title font-sans font-bold text-3xl sm:text-4xl tracking-tight sm:leading-none dark:text-white">
              {user.name}
            </span>
            <h3 className="text-slate-500 mt-1 mb-3">@{user.username}</h3>
            <h3 className="card__describe">Locality - {user.locality}</h3>
          </div>
          <div className="flex flex-col md:flex-row mt-4 mr-5">
            <div className="mb-4 md:pr-8">
              <Scanner />
            </div>
            <div className="">
              <Leaderboardbtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

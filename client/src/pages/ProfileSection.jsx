import { useParams, useOutletContext } from "react-router-dom";
import { useState } from "react";
import ProfileDetails from './ProfileDetails';
import UpcomingClasses from './UpcomingClasses'
import PreviousClasses from "./PreviousClasses";
import Purchases from "./Purchases";
import Booking from "./Booking";

function ProfileSection() {
  const { section } = useParams();
  const { userID } = useOutletContext();

  const renderContent = () => {
    switch (section) {
      case "book-classes":
        return <div><Booking /></div>;
      case "upcoming-classes":
        return <div><UpcomingClasses /></div>;
      case "previous-classes":
        return <div><PreviousClasses /></div>;
      case "profile-details":
        return <div><ProfileDetails userID={userID} /></div>;
      case "purchases":
          return <div><Purchases /></div>;
      default:
        return <div>Page not found.</div>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl capitalize">{section.replace("-", " ")}</h1>
      <div className="border p-4 rounded-md mt-4 min-h-64">
        {renderContent()}
      </div>
    </div>
  );
}

export default ProfileSection;

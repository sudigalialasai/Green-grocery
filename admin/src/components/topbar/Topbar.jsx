import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import Logout from "../../pages/logout/logout";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin</span>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer">
            <Logout />
          </div>
        
        </div>
      </div>
    </div>
  );
}

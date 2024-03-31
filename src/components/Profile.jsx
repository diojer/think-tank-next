import React from "react";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "next/link";
import Image from "next/image";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const Profile = ({
  children,
  image,
  name,
  position,
  degree,
  year_of_study,
  linkedin,
}) => {
  return (
    <div className="profile-wrapper">
      <div className="profile-primary">
        <div className="profile-image-container">
          <Image
            className="profile-image"
            src={`${image}`}
            fill
            objectFit="cover"
          />
        </div>
        <div className="profile-text">
          <p className="profile-name">{name}</p>
          {Array.isArray(position) ? (
            position.map((value, key) => {
              return (
                <p key={key} className={`profile-position ${key}`}>
                  {value}
                </p>
              );
            })
          ) : (
            <p className="profile-position">{position}</p>
          )}
          <hr className="profile-text-break" />
          <p className="profile-degree">{degree}</p>
          <p className="profile-year_of_study">{year_of_study}</p>
          <p className="profile-linkedin-logo">
            <a href={`${linkedin}`} target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </p>
        </div>
      </div>
      <div className="profile-secondary">
        <p className="profile-aboutme">{children}</p>
      </div>
    </div>
  );
};

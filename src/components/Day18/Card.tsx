import React from "react";

type CardProps = {
  image: string;
  name: string;
  gender: string;
  phone: string;
  email: string;
  isOnline: boolean;
};

function Card({ image, name, gender, phone, email, isOnline }: CardProps) {
  return (
    <div className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      {/* Profile Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
        />
        {/* Online / Offline Status Dot */}
        <span
          className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
      </div>

      {/* User Info */}
      <div className="flex flex-col text-gray-700">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm">
          <strong>Gender:</strong> {gender}
        </p>
        <p className="text-sm">
          <strong>Phone:</strong> {phone}
        </p>
        <p className="text-sm">
          <strong>Email:</strong> {email}
        </p>

        {/* Status text */}
        <span
          className={`mt-2 inline-block text-sm font-medium px-3 py-1 rounded-full ${
            isOnline ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default Card;

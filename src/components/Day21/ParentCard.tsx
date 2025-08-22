import React, { useState } from "react";

type Users = {
  name: string;
  email: string;
  phone: string;
  gender: boolean | null;
  id: string; // id as string for safe generation
};

function ParentCard() {
  const [newUser, setNewUser] = useState<Users[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<Users>({
    id: generateId(),
    name: "",
    email: "",
    phone: "",
    gender: null,
  });
  const [userIndex, setUserIndex] = useState<number | null>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString();
  }

  // Validation function returns true or false; sets error message
  const phoneRegex = /^[0-9]+$/;

  const validation = (): boolean => {
    if (!user.name.trim()) {
      setError("Please enter a valid name");
      return false;
    }
    if (!user.email || !emailRegex.test(user.email)) {
      setError("Please enter a valid email");
      return false;
    }
    if (!user.phone.trim() || !phoneRegex.test(user.phone)) {
      setError("Please enter a valid phone number (digits only)");
      return false;
    }
    if (user.gender === null) {
      setError("Please select a gender");
      return false;
    }
    setError(null);
    return true;
  };

  const addUsers = () => {
    if (!validation()) {
      return;
    }

    if (userIndex !== null) {
      // Edit existing user
      const updatedUsers = [...newUser];
      updatedUsers[userIndex] = user;
      setNewUser(updatedUsers);
      setUserIndex(null);
    } else {
      // Add new user
      setNewUser([...newUser, user]);
    }

    setUser({
      id: generateId(),
      name: "",
      email: "",
      phone: "",
      gender: null,
    });
  };

  const deleteUser = (id: string) => {
    const updatedUsers = newUser.filter((user) => user.id !== id);
    setNewUser(updatedUsers);
  };

  const editUser = (index: number) => {
    const selectedUser = newUser[index];
    setUser(selectedUser);
    setUserIndex(index);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Detail</h1>
      {error && <h3 className="text-red-600 font-semibold mb-4">{error}</h3>}
      <div>
        <Input
          label="Name"
          placeholder="Enter Your Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          name="name"
        />
        <Input
          label="Email"
          placeholder="Enter Your Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          name="email"
        />
        <Input
          label="Phone"
          placeholder="Enter Your Phone"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          name="phone"
        />

        {/* Gender radio buttons */}
        <div className="mb-4 flex flex-col">
          <span className="font-semibold mb-1">Gender</span>
          <label className="inline-flex items-center mr-4">
            <Input
              type="radio"
              name="gender"
              value="male"
              checked={user.gender === true}
              onChange={() => setUser({ ...user, gender: true })}
            />
            <span className="ml-1">Male</span>
          </label>
          <label className="inline-flex items-center">
            <Input
              type="radio"
              name="gender"
              value="female"
              checked={user.gender === false}
              onChange={() => setUser({ ...user, gender: false })}
            />
            <span className="ml-1">Female</span>
          </label>
        </div>
      </div>

      <Button
        onClick={addUsers}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {userIndex !== null ? "Update User" : "Add User"}
      </Button>

      {/* Display added users */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Users List</h2>
        {newUser.length === 0 ? (
          <p className="text-gray-600">No users added yet.</p>
        ) : (
          <ul className="space-y-4">
            {newUser.map((u, index) => (
              <li
                key={u.id}
                className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border"
              >
                <div className="text-gray-800">
                  {u.name} - {u.email} - {u.phone} -{" "}
                  {u.gender === null
                    ? "Not specified"
                    : u.gender
                    ? "Male"
                    : "Female"}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => editUser(index)}
                    className="bg-orange-400 hover:bg-orange-500 text-white text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ParentCard;

type ButtonField = {
  children: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button = ({
  children,
  className = "",
  onClick,
  disabled = false,
}: ButtonField) => {
  return (
    <button
      className={`
        bg-blue-600 
        text-white 
        font-semibold 
        py-3 px-6 
        rounded-lg 
        shadow-md 
        hover:bg-blue-700 
        focus:outline-none 
        focus:ring-4 
        focus:ring-blue-300 
        disabled:bg-gray-400 
        disabled:cursor-not-allowed 
        transition 
        duration-300 
        ease-in-out 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

type InputField = {
  label?: string;
  value?: string;
  checked?: boolean;
  className?: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name: string;
};

const Input = ({
  label,
  className = "",
  type = "text",
  placeholder = "",
  value = "",
  checked,
  onChange,
  disabled = false,
  name,
}: InputField) => {
  const inputId = label ? label.replace(/\s+/g, "-").toLowerCase() : undefined;

  return (
    <div className={`mb-4 flex flex-col ${className}`}>
      {label && (
        <label className="font-semibold mb-1" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
        className={
          type === "radio"
            ? "mr-2 leading-tight"
            : "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        }
      />
    </div>
  );
};

import { useState } from "react";

type UserDetails = {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | null;
};

type FormErrors = Partial<Record<keyof UserDetails, string>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  return [storedValue, setValue];
}

export default function CustomerDetails() {
  const [user, setUser] = useLocalStorage<UserDetails>("user", {
    name: "",
    email: "",
    phone: "",
    gender: null,
  });

  const [newUsers, setNewUsers] = useState<UserDetails[]>([]);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      gender: e.target.value as "male" | "female",
    });
    setErrors((prev) => ({ ...prev, gender: undefined }));
  };

  const validate = (fields: UserDetails): FormErrors => {
    const newErrors: FormErrors = {};
    if (!fields.name.trim()) newErrors.name = "Name is required";
    if (!fields.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(fields.email)) newErrors.email = "Email is invalid";
    if (!fields.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(fields.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!fields.gender) newErrors.gender = "Gender is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validate(user);
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    // Add the current user to the newUsers array on form submit
    setNewUsers((prevUsers) => [...prevUsers, user]);

    alert("Form submitted successfully!");
    console.log("Submitted user:", user);

    // Optionally clear the form after submission
    setUser({
      name: "",
      email: "",
      phone: "",
      gender: null,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={user.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={user.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone :</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter Your Phone"
            value={user.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
        </div>
        <div>
          <label>Gender :</label>
          <label htmlFor="male">Male</label>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            checked={user.gender === "male"}
            onChange={handleGenderChange}
          />
          <label htmlFor="female">Female</label>
          <input
            id="female"
            name="gender"
            type="radio"
            value="female"
            checked={user.gender === "female"}
            onChange={handleGenderChange}
          />
          {errors.gender && <p style={{ color: "red" }}>{errors.gender}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>

      <h2>Submitted Users</h2>
      <ul>
        {newUsers.map((usr, index) => (
          <li key={index}>{`${usr.name} - ${usr.email} - ${usr.phone} - ${usr.gender}`}</li>
        ))}
      </ul>
    </div>
  );
}

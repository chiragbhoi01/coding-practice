type CardType = {
  name: string;
  email: string;
  gender: string;
  phone: string;
  pincode: string | number;
  image: string;
  isOnline: boolean;
};

function Card({ name, isOnline, email, gender, phone, pincode, image }: CardType) {
  return (
    <div className="bg-amber-200 rounded-2xl p-6 flex gap-4 items-center shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
      />
      <div className="text-gray-800">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Pincode:</strong> {pincode}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`h-4 w-4 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <strong>{isOnline ? "Online" : "Offline"}</strong>
        </div>
      </div>
    </div>
  );
}

export default Card;

import React from "react";
import { PhoneCall } from "lucide-react";

const emergencyContacts = [
  { id: 1, name: "Police", number: "911" },
  { id: 2, name: "Fire Department", number: "101" },
  { id: 3, name: "Army", number: "102" },
  { id: 4, name: "Ambulance", number: "108" },
  { id: 5, name: "Women Helpline", number: "1091" },
  { id: 6, name: "Child Helpline", number: "1098" },
];

const EmergencyContacts = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-[#C42847] mb-4">
        Emergency Contacts
      </h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        In case of any emergency, quickly contact the relevant authority.
      </p>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {emergencyContacts.map((contact) => (
          <div
            key={contact.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2"
          >
            <span className="text-lg font-semibold">{contact.name}</span>
            <a
              href={`tel:${contact.number}`}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-amber-700 transition"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              Call Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;

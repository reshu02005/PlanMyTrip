import React, { useEffect, useState } from "react";
import { db } from "../service/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";

function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    picture: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.sub) return;

      try {
        const ref = doc(db, "users", user.sub);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setFormData({
            name: data.name || "",
            email: data.email || "",
            picture: data.picture || "",
            bio: data.bio || "",
          });
        } else {
          const newProfile = {
            name: user.name || "",
            email: user.email || "",
            picture: user.picture || "",
            bio: "",
          };
          await setDoc(ref, newProfile);
          setFormData(newProfile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user?.sub) return;

    try {
      const ref = doc(db, "users", user.sub);
      await setDoc(ref, formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4 text-red-500">User not logged in</p>
        <Button onClick={handleLogout}>Go to Login</Button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img
          src={formData.picture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div className="flex-1">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl font-bold border p-2 rounded w-full text-black"
              placeholder="Your name"
            />
          ) : (
            <h2 className="text-xl font-bold">{formData.name}</h2>
          )}
          <p className="text-sm text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-1">Bio:</label>
        {editMode ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded resize-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Write something about yourself, your favorite place, hobbies etc..."
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{formData.bio || "No bio added yet."}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {editMode ? (
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setEditMode(true)} className="w-full">
            Edit Profile
          </Button>
        )}
        <Button variant="destructive" onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;

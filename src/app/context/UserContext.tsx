"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export const UserContext = createContext<{ userData: any } | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<any>({msg: "Loading..."});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/userdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setUserData(data);
          console.log("Fetched user data:", data);
        } else {
          setUserData({ failed: "Error fetching user data" });
          console.log("Error fetching user data");
        }
      } catch (err) {
        setUserData({ failed: "Error fetching user data" });
        console.log("Fetch error: ", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

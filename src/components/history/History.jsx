import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./history.module.scss";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/retrieve", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className={styles.history__container}>
      <div className={`${styles.history__logo} text-lg`}>Logo</div>
      <div className={styles.history__feed}>
        {history.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            <small>{item.timestamp}</small>
          </div>
        ))}
      </div>
      <button
        className={`${styles.history__logoutButton} text-sm`}
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}

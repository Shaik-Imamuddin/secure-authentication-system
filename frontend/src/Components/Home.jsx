import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/"); // redirect to login/home page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      
      <h3 style={{ fontSize: "48px",color:"white"}}>Welcome, {name}</h3>

      <p style={{ fontSize: "28px", marginTop: "20px" ,color:"white",}}>
        Believe in yourself and all that you are.  
        <br/>
        You are stronger than you think.  
        <br/><br/>
        Keep pushing forward and never give up.  
        <br/>
        Have a wonderful and productive day!
      </p>

      <button 
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "35px",
          borderRadius: "8px",
          border: "none",
          background: "#667eea",
          color: "white",
          fontSize: "25px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
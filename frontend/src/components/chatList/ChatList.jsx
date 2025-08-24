import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";

const ChatList = () => {
  const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      // Get the authentication token from Clerk
      const token = await getToken();
      
      return fetch(`${process.env.REACT_APP_API_URL}/api/userchats`, {
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      });
    },
    // Only run the query if user is authenticated
    enabled: authLoaded && isSignedIn,
  });

  // Show loading state while Clerk is loading
  if (!authLoaded) {
    return (
      <div className="chatList">
        <span className="title">Loading...</span>
      </div>
    );
  }

  // Show sign-in prompt if user is not authenticated
  if (!isSignedIn) {
    return (
      <div className="chatList">
        <span className="title">Please sign in to view your chats</span>
        <Link to="/sign-in">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      {user && (
        <div className="user-info">
          <span>Welcome, {user.firstName || user.username}!</span>
        </div>
      )}
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore JAXAI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? `Something went wrong! ${error.message}`
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to JAXAI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
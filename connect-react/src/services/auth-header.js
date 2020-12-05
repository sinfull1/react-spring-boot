export default function authHeader() {
  const accessToken = localStorage.getItem("user");

  if (accessToken) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    
    return { Authorization: "Bearer " + accessToken } ;
  } else {
    return {};
  }
}

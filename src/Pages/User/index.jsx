import userService from "@/service/userService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
  const [users, setUser] = useState([]);
  console.log(users);

  useEffect(() => {
    (async () => {
      const user = await userService.getAll();
      setUser(user.data);
    })();
  }, []);

  return (
    <>
      <h1>User Page</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/profile/${u.username}`}>
              {`${u.firstName} ${u.lastName}`}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default User;

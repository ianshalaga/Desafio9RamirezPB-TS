import UserLogin from "./UserLogin";

interface User extends UserLogin {
  firstName: string;
  lastName: string;
  age: number;
  rol: string;
  cart: string;
}

export default User;

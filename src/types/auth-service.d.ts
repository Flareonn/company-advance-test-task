interface UserDTO {
  email: string;
  password: string;
}

interface User {
  email: string;
  name: string;
  role: Role;
}

type Role = "ADMIN" | "USER";

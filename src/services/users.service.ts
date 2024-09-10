import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (): Promise<User[]> => {
  const users = await userRepository.find();
  return users;
};

export const createUser = async (data: User): Promise<User> => {
  const newUser = await userRepository.save(data);
  return newUser;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await userRepository.findOneOrFail({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

/* export const getUsers = async (): Promise<User[]> => {
  const [rows] = await mysqlPool.query<RowDataPacket[]>("SELECT * FROM Users");
  return rows as User[];
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const [rows] = await mysqlPool.query<RowDataPacket[]>(
    "SELECT * FROM Users WHERE id = ?",
    [id]
  );
  return rows[0] as User | undefined;
};



export const deleteUserById = async (id: number): Promise<number> => {
  const [result] = await mysqlPool.query<ResultSetHeader>(
    "DELETE FROM Users WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

export const createUser = async (data: User): Promise<number> => {
  const [result] = await mysqlPool.query<ResultSetHeader>(
    "INSERT INTO Users (full_name, password, email) VALUES (?, ?, ?)",
    [data.full_name, data.password, data.email]
  );
  return result.affectedRows;
};

export const updateUser = async (data: User, id: number): Promise<number> => {
  const [result] = await mysqlPool.query<ResultSetHeader>(
    "UPDATE Users SET full_name = ?, email = ?, password = ?, token = ? WHERE id = ?",
    [data.full_name, data.email, data.password, data.token, id]
  );
  return result.affectedRows;
};
 */

import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, password, role } = object;
    if (!id && !_id) throw CustomError.badRequest("Id not found");

    if (!name) throw CustomError.badRequest("Name not found");
    if (!email) throw CustomError.badRequest("Email not found");
    if (!password) throw CustomError.badRequest("Password not found");
    if (!role) throw CustomError.badRequest("Role not found");

    return new UserEntity(id || _id, name, email, password, role);
  }
}

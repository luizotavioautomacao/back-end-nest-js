import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'
import { BcryptService } from '../auth/bcrypt.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(user): Promise<User> {
    const hash = await this.bcryptService.hashPassword(user.password)
    user.password = hash
    const newUser = new this.userModel(user)
    return newUser.save()
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id).exec()
  }

  async findOneUserByQuery(query): Promise<User> {
    return this.userModel.findOne(query).exec()
  }
}

import { Response } from 'express';
import { IParent } from '../interfacetypes';
import {
  student as userModel,
  teacher as teacherModel,
  IUser,
  ITeacher,
} from '../../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import * as fs from 'fs';
import mailer from '../../middlewares/mailMiddleware';

const userResolver = {
  Mutation: {
    registerUser: async (
      parent: undefined,
      { registerInfo }: IParent,
      res: Response
    ): Promise<string> => {
      const { firstName, lastName, email, password } = registerInfo;
      const currentUser: IUser | null = await userModel.findOne({ email });
      console.log(currentUser);
      if (currentUser) {
        return 'This email adress already have used, if you want login ';
      }
      let { isAdmin } = registerInfo;
      !isAdmin ? (isAdmin = false) : null;
      console.log(isAdmin);
      // const { error } = validation.register(req.body)
      // if (error) return res.status(400).send(error.details[0].message)
      const account = {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        isAdmin,
      };
      const newUser = new userModel(account);
      const saveUser: IUser = await newUser.save();
      const token = await jwt.sign(
        { id: saveUser.userId, role: saveUser.isAdmin },
        'asjdhahdahds'
      );
      mailer(
        email,
        'Succes of Register',
        'We are congurtulation for register happy use \n Malibr.Inc'
      );
      res.header('Header-Token', token);
      return saveUser.userId;
    },
    loginUser: async (
      parent: undefined,
      { loginInfo }: IParent
    ): Promise<string> => {
      const { email, password } = loginInfo;
      // const { error } = validation.login(req.body)
      // if (error) return res.status(400).send(error.details[0].message)
      const currentUser: IUser | null = await userModel.findOne({ email });
      if (currentUser) {
        const match = await bcrypt.compare(password, currentUser.password);
        if (match) {
          const token = await jwt.sign(
            { id: currentUser.userId, role: currentUser.isAdmin },
            'asjdhahdahds'
          );
          return token;
        } else {
          return 'something went wrong';
        }
      } else {
        return 'Password is wrong';
      }
    },
    becomeTutor: async (
      parent: undefined,
      { tutorInfo }: IParent,
      res: Response
    ): Promise<string> => {
      const { userId, bio, speacilist, picture, video_url, experience } =
        tutorInfo;
      const currentUser: IUser | null = await userModel.findOne({ userId });
      const currentTeacher: ITeacher | null = await teacherModel.findOne({
        userId,
      });
      if (!currentUser) {
        return 'Please register or login';
      }
      if (currentTeacher) {
        return 'You are already teacher ';
      }
      const { email, firstName, lastName, password } = currentUser;
      currentUser.isTeacher = true;
      const stream = picture.file.createReadStream();
      const pathname = path.join(
        __dirname,
        `/public/images/${picture.file.filename}`
      );
      await stream.pipe(fs.createWriteStream(pathname));
      const picture_url = `http://localhost:8080/images/${picture.file.filename}`;
      const account = {
        isTeacher: currentUser.isTeacher,
        userId,
        email,
        firstName,
        lastName,
        password,
        bio,
        speacilist,
        picture_url,
        video_url,
        experience,
      };
      console.log(account);
      const newTeacher = new teacherModel(account);
      const saveTeacher = await newTeacher.save();
      const token = await jwt.sign(
        { id: saveTeacher.userId, role: saveTeacher.isAdmin },
        'asjdhahdahds'
      );
      mailer(
        email,
        'Succes of Become Tutor',
        'We are congurtulation for tutor . we are soon accept your application \n XXXX.Inc'
      );
      res.header('Header-Token', token);
      return saveTeacher.userId;
    },
  },
};

export default userResolver;

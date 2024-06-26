import { Router } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { DeleteUserController } from '../controllers/DeleteUserController';
import { GetUserByIdController } from '../controllers/GetUserByIdController';
import { GetUserPhotoController } from '../controllers/GetUserPhotoController';
import { SessionController } from '../controllers/SessionController';
import { UpdateUserController } from '../controllers/UpdateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const sessionController = new SessionController();
const getUserByIdController = new GetUserByIdController();
const getUserPhotoController = new GetUserPhotoController();

userRoutes.post('/', createUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);
userRoutes.patch('/:id', updateUserController.handle);
userRoutes.get('/:id', getUserByIdController.handle);
userRoutes.post('/session', sessionController.handle);
userRoutes.get('/uploads/:file', getUserPhotoController.handle);

export default userRoutes;

import Base from './Base';
import {  type LoginRequest, type RegisterRequest} from '../components/types/types';

export default class AuthAPI extends Base {
  
  // FIXED: Explicitly typed 'data' parameter to resolve implicit 'any' error
  login = async (data: LoginRequest): Promise<any> => {
    return this.sendRequest({
      path: `/api/Auth`,
      method: 'POST',
      data,
    });
  };

  // FIXED: Explicitly typed 'data' parameter to resolve implicit 'any' error
  register = async (data: RegisterRequest): Promise<any> => {
    return this.sendRequest({
      path: `/api/register`,
      method: 'POST',
      data,
    });
  };
}
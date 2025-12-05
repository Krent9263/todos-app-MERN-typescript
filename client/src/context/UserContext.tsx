import React, { Component } from 'react';
import Auth from '../api/Auth';

// Lightweight API response shape used by Auth.profile()
type ApiResponse<T = any> = {
  ok: boolean;
  data?: T;
};

// User shape (extend as needed)
export type UserType = {
  userId?: string;
  personId?: string;
  fullname?: string;
  name?: string;
  role?: string;
  roleCode?: string;
  schoolId?: string;
  schoolBranchId?: string;
  code?: string;
  isSystemAdmin?: boolean;
  isStudent?: boolean;
  isCashier?: boolean;
  [key: string]: any;
};

export type UserContextState = {
  user: UserType | null | false;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

export type UserContextValue = {
  data: UserContextState;
};

export const UserContext = React.createContext<UserContextValue>({
  data: {
    user: false,
    loading: true,
    // placeholder noop; real function is provided by the provider
    refreshUser: async () => {},
  },
});

type ProviderProps = React.PropsWithChildren<{}>;

type ProviderState = {
  user: UserType | null | false;
  loading: boolean;
};

export class UserContextProvider extends Component<ProviderProps, ProviderState> {
  connection: React.RefObject<HTMLDivElement | null>;

  constructor(props: ProviderProps) {
    super(props);
    this.state = {
      user: false,
      loading: true,
    };
    this.connection = React.createRef<HTMLDivElement>();
  }

  refreshUser = async () => {
    this.setState({ loading: true });
    let response = (await (new Auth() as any).profile()) as ApiResponse<UserType>;

    if (response?.ok) {
      let user: UserType = response.data || ({} as UserType);

      user.role = user?.roleCode || user?.role;

      switch (user.role) {
        case 'ADMINISTRATOR':
          user.userId = user.userId;
          user.name = user?.fullname;
          user.isSystemAdmin = true;
          user.schoolId = user.schoolId;
          user.schoolCode = user.code;
          break;
        case 'STUDENT':
          user.personId = user.personId;
          user.name = user?.fullname;
          user.schoolId = user.schoolBranchId;
          user.isStudent = true;
          user.schoolCode = user.code;
          break;
        case 'CASHIER':
          user.userId = user.userId;
          user.name = user?.fullname;
          user.schoolId = user.schoolBranchId;
          user.isCashier = true;
          user.schoolCode = user.code;
          break;
        default:
          user.name = user?.fullname || 'No name';
          break;
      }

      this.setState({ loading: false, user });
    } else {
      this.setState({ loading: false, user: null });
    }
  };

  render() {
    const { children } = this.props;
    const { user, loading } = this.state;

    const value: UserContextValue = {
      data: {
        user,
        loading,
        refreshUser: this.refreshUser,
      },
    };

    return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
    );
  }
}

export default UserContextProvider;

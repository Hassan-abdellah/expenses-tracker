export const authRoutes = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
};
export const expesnsesRoutes = {
  list: "/expenses",
  addNew: "/",
};

export const protectedRoutes = [expesnsesRoutes.list, expesnsesRoutes.addNew];
export const publicRoutes = [authRoutes.login, authRoutes.register];

export const authRoutes = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
};
export const expesnsesRoutes = {
  list: "/expenses",
  addNew: "/",
};
export const dashboardsRoutes = {
  index: "/dashboard",
};

export const UIPages = {
  comingSoon: "/coming-soon",
};

export const protectedRoutes = [
  {
    title: "Expenses",
    href: expesnsesRoutes.list,
  },
  {
    title: "Add New",
    href: expesnsesRoutes.addNew,
  },
];
export const publicRoutes = [
  { title: "Log In", href: authRoutes.login },
  { title: "Register", href: authRoutes.register },
];

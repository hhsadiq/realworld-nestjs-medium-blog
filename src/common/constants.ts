export const TABLES = {
  favorite: 'favorite',
  article: 'article',
  comment: 'comment',
  file: 'file',
  role: 'role',
  session: 'session',
  status: 'status',
  tag: 'tag',
  user: 'user',
};

export const ERROR_MESSAGES = {
  ALREADY_EXISTS: (key: string) => `${key} already exists`,
  INCORRECT: (key: string) => `${key} is incorrect`,
  NOT_PRESENT: (key: string) => `${key} is not present`,
};

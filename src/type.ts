export type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
}

export type Book = {
  isbn: string
  title: string
  description: string
  publishers: string
  category: Category
  authorList: Author[]
  status: string
  publishedDate: string
}

export type BookDTO = {
  isbn: string
  title: string
  description: string
  publishers: string
  categoryId: string
  authorIdList: string[]
  status: string
  publishedDate: string
}

export type Author = {
  id: number
  name: string
}

export type Category = {
  id: number
  name: string
}

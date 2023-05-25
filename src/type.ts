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
  categoryId: string | number
  authorIdList: string[] | number[]
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
export type Loan = {
  id: string
  user: User
  book: Book
  borrowDate: string
  returnDate: string
  loanStatus: string
}

export type loanDTO = {
  bookIsbn: string | undefined
  username: string | null
  borrowDate: string
  loanStatus: string
}

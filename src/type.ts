import React from 'react'

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
  publisher: string
  authors: string
  status: boolean
  borrowerId: string | null
  publishDate: string
  borrowDate: Date | string | null
  returnDate: Date | string | null
}

export type Author = {
  id: number
  authorName: string
}

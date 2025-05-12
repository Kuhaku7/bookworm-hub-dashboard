
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          author: string
          category: string
          year: number
          available: boolean
          created_at: string
          updated_at: string
          borrow_count: number
        }
        Insert: {
          id?: string
          title: string
          author: string
          category: string
          year: number
          available?: boolean
          created_at?: string
          updated_at?: string
          borrow_count?: number
        }
        Update: {
          id?: string
          title?: string
          author?: string
          category?: string
          year?: number
          available?: boolean
          updated_at?: string
          borrow_count?: number
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      loans: {
        Row: {
          id: string
          book_id: string
          user_id: string
          loan_date: string
          return_date: string | null
          status: 'active' | 'returned'
          created_at: string
        }
        Insert: {
          id?: string
          book_id: string
          user_id: string
          loan_date?: string
          return_date?: string | null
          status?: 'active' | 'returned'
          created_at?: string
        }
        Update: {
          id?: string
          book_id?: string
          user_id?: string
          loan_date?: string
          return_date?: string | null
          status?: 'active' | 'returned'
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

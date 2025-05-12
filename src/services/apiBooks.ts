
import { Book } from "@/types";
import { supabase } from "@/lib/supabase";

export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching books:', error);
    throw new Error('Error fetching books');
  }

  return data || [];
};

export const getBook = async (id: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching book:', error);
    return null;
  }

  return data;
};

export const createBook = async (book: Omit<Book, 'id' | 'created_at' | 'updated_at' | 'borrow_count'>): Promise<Book> => {
  const newBook = {
    ...book,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    borrow_count: 0
  };

  const { data, error } = await supabase
    .from('books')
    .insert([newBook])
    .select()
    .single();

  if (error) {
    console.error('Error creating book:', error);
    throw new Error('Error creating book');
  }

  return data;
};

export const updateBook = async (id: string, book: Partial<Book>): Promise<Book> => {
  const updatedBook = {
    ...book,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('books')
    .update(updatedBook)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating book:', error);
    throw new Error('Error updating book');
  }

  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting book:', error);
    throw new Error('Error deleting book');
  }
};

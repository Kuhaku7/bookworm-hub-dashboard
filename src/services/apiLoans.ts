
import { Loan } from "@/types";
import { supabase } from "@/lib/supabase";

export const getLoans = async (): Promise<Loan[]> => {
  const { data, error } = await supabase
    .from('loans')
    .select('*, book:books(*), user:users(*)')
    .order('loan_date', { ascending: false });

  if (error) {
    console.error('Error fetching loans:', error);
    throw new Error('Error fetching loans');
  }

  return data || [];
};

export const getLoan = async (id: string): Promise<Loan | null> => {
  const { data, error } = await supabase
    .from('loans')
    .select('*, book:books(*), user:users(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching loan:', error);
    return null;
  }

  return data;
};

export const createLoan = async (loan: {
  book_id: string;
  user_id: string;
}): Promise<Loan> => {
  // First, update the book's availability to false
  const { error: updateError } = await supabase
    .from('books')
    .update({ 
      available: false,
      borrow_count: supabase.rpc('increment_borrow_count', { row_id: loan.book_id }) 
    })
    .eq('id', loan.book_id);

  if (updateError) {
    console.error('Error updating book availability:', updateError);
    throw new Error('Error updating book availability');
  }

  // Then create the loan
  const { data, error } = await supabase
    .from('loans')
    .insert([{
      book_id: loan.book_id,
      user_id: loan.user_id,
      loan_date: new Date().toISOString(),
      status: 'active'
    }])
    .select('*, book:books(*), user:users(*)')
    .single();

  if (error) {
    console.error('Error creating loan:', error);
    throw new Error('Error creating loan');
  }

  return data;
};

export const returnLoan = async (id: string): Promise<Loan> => {
  // First, get the loan to retrieve the book_id
  const { data: loanData, error: loanError } = await supabase
    .from('loans')
    .select('book_id')
    .eq('id', id)
    .single();

  if (loanError) {
    console.error('Error fetching loan:', loanError);
    throw new Error('Error fetching loan');
  }

  // Update the book's availability to true
  const { error: updateError } = await supabase
    .from('books')
    .update({ available: true })
    .eq('id', loanData.book_id);

  if (updateError) {
    console.error('Error updating book availability:', updateError);
    throw new Error('Error updating book availability');
  }

  // Update the loan status to returned and set return date
  const { data, error } = await supabase
    .from('loans')
    .update({
      status: 'returned',
      return_date: new Date().toISOString()
    })
    .eq('id', id)
    .select('*, book:books(*), user:users(*)')
    .single();

  if (error) {
    console.error('Error updating loan:', error);
    throw new Error('Error updating loan');
  }

  return data;
};

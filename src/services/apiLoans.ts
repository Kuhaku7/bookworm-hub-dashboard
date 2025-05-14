
import { supabase } from '@/integrations/supabase/client';
import { Loan } from '@/types';

export const getLoans = async () => {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .order('loan_date', { ascending: false });

  if (error) {
    console.error('Error fetching loans:', error);
    throw new Error(error.message);
  }

  // Formatar os dados para o formato esperado pela aplicação
  const formattedLoans = data.map(loan => ({
    id: loan.id,
    book_id: loan.book_id,
    user_id: loan.user_id,
    loan_date: loan.loan_date,
    return_date: loan.return_date,
    status: loan.status,
    created_at: loan.created_at,
    book: loan.books,
    user: loan.users
  }));

  return formattedLoans;
};

// Add missing functions
export const getLoansByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .eq('user_id', userId)
    .order('loan_date', { ascending: false });

  if (error) {
    console.error('Error fetching loans by user:', error);
    throw new Error(error.message);
  }

  const formattedLoans = data.map(loan => ({
    id: loan.id,
    book_id: loan.book_id,
    user_id: loan.user_id,
    loan_date: loan.loan_date,
    return_date: loan.return_date,
    status: loan.status,
    created_at: loan.created_at,
    book: loan.books,
    user: loan.users
  }));

  return formattedLoans;
};

export const getLoansByBookId = async (bookId: string) => {
  const { data, error } = await supabase
    .from('loans')
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .eq('book_id', bookId)
    .order('loan_date', { ascending: false });

  if (error) {
    console.error('Error fetching loans by book:', error);
    throw new Error(error.message);
  }

  const formattedLoans = data.map(loan => ({
    id: loan.id,
    book_id: loan.book_id,
    user_id: loan.user_id,
    loan_date: loan.loan_date,
    return_date: loan.return_date,
    status: loan.status,
    created_at: loan.created_at,
    book: loan.books,
    user: loan.users
  }));

  return formattedLoans;
};

export const createLoan = async (loanData: { book_id: string; user_id: string }) => {
  // 1. Marcar o livro como indisponível
  const { error: bookError } = await supabase
    .from('books')
    .update({ available: false })
    .eq('id', loanData.book_id);

  if (bookError) {
    console.error('Error updating book availability:', bookError);
    throw new Error(bookError.message);
  }

  // 2. Incrementar o contador de empréstimos usando a função SQL
  try {
    const { data: incrementResult, error: incrementError } = await supabase
      .rpc('increment_borrow_count', { row_id: loanData.book_id });

    if (incrementError) {
      console.error('Error incrementing borrow count:', incrementError);
      throw new Error(incrementError.message);
    }
  } catch (err) {
    console.error('Failed to call increment_borrow_count:', err);
    // Continue with loan creation even if increment fails
  }

  // 3. Criar o registro de empréstimo
  const { data, error } = await supabase
    .from('loans')
    .insert({
      book_id: loanData.book_id,
      user_id: loanData.user_id,
      status: 'active'
    })
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .single();

  if (error) {
    console.error('Error creating loan:', error);
    throw new Error(error.message);
  }

  // Formatar o resultado para o formato esperado
  const formattedLoan = {
    id: data.id,
    book_id: data.book_id,
    user_id: data.user_id,
    loan_date: data.loan_date,
    return_date: data.return_date,
    status: data.status,
    created_at: data.created_at,
    book: data.books,
    user: data.users
  };

  return formattedLoan;
};

export const updateLoanStatus = async (id: string, status: 'active' | 'returned') => {
  const updateData: any = {
    status: status
  };
  
  if (status === 'returned') {
    updateData.return_date = new Date().toISOString();
  }
  
  const { data, error } = await supabase
    .from('loans')
    .update(updateData)
    .eq('id', id)
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .single();

  if (error) {
    console.error(`Error updating loan status to ${status}:`, error);
    throw new Error(error.message);
  }

  // If returning a book, update book availability
  if (status === 'returned') {
    const { error: bookError } = await supabase
      .from('books')
      .update({ available: true })
      .eq('id', data.book_id);

    if (bookError) {
      console.error('Error updating book availability:', bookError);
      throw new Error(bookError.message);
    }
  }

  // Formatar o resultado para o formato esperado
  const formattedLoan = {
    id: data.id,
    book_id: data.book_id,
    user_id: data.user_id,
    loan_date: data.loan_date,
    return_date: data.return_date,
    status: data.status,
    created_at: data.created_at,
    book: data.books,
    user: data.users
  };

  return formattedLoan;
};

export const returnLoan = async (id: string) => {
  // 1. Atualizar o empréstimo para "returned"
  const { data: loanData, error: loanFetchError } = await supabase
    .from('loans')
    .select('book_id')
    .eq('id', id)
    .single();

  if (loanFetchError) {
    console.error('Error fetching loan to return:', loanFetchError);
    throw new Error(loanFetchError.message);
  }

  // 2. Atualizar o empréstimo
  const { data, error } = await supabase
    .from('loans')
    .update({
      status: 'returned',
      return_date: new Date().toISOString()
    })
    .eq('id', id)
    .select(`
      id,
      book_id,
      user_id,
      loan_date,
      return_date,
      status,
      created_at,
      books:book_id (id, title, author, category, year, available),
      users:user_id (id, name, email)
    `)
    .single();

  if (error) {
    console.error('Error returning loan:', error);
    throw new Error(error.message);
  }

  // 3. Marcar o livro como disponível novamente
  const { error: bookError } = await supabase
    .from('books')
    .update({ available: true })
    .eq('id', loanData.book_id);

  if (bookError) {
    console.error('Error updating book availability:', bookError);
    throw new Error(bookError.message);
  }

  // Formatar o resultado para o formato esperado
  const formattedLoan = {
    id: data.id,
    book_id: data.book_id,
    user_id: data.user_id,
    loan_date: data.loan_date,
    return_date: data.return_date,
    status: data.status,
    created_at: data.created_at,
    book: data.books,
    user: data.users
  };

  return formattedLoan;
};

export const deleteLoan = async (id: string) => {
  // 1. Fetch the loan to get the book_id
  const { data: loanData, error: fetchError } = await supabase
    .from('loans')
    .select('book_id, status')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching loan to delete:', fetchError);
    throw new Error(fetchError.message);
  }

  // 2. Delete the loan
  const { error } = await supabase
    .from('loans')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting loan:', error);
    throw new Error(error.message);
  }

  // 3. If the loan was active, mark the book as available again
  if (loanData.status === 'active') {
    const { error: bookError } = await supabase
      .from('books')
      .update({ available: true })
      .eq('id', loanData.book_id);

    if (bookError) {
      console.error('Error updating book availability:', bookError);
      throw new Error(bookError.message);
    }
  }

  return true;
};

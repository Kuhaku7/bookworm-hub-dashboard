
import { User } from "@/types";
import { supabase } from "@/lib/supabase";

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error('Error fetching users');
  }

  return data || [];
};

export const getUser = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
};

export const createUser = async (user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> => {
  const newUser = {
    ...user,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('users')
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    throw new Error('Error creating user');
  }

  return data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const updatedUser = {
    ...user,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('users')
    .update(updatedUser)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating user:', error);
    throw new Error('Error updating user');
  }

  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
};

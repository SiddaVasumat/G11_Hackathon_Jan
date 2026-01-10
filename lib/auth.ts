import { supabase } from './supabase'

export const signInWithEmail = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
  })

  return { error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

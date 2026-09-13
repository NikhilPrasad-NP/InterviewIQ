import { supabase } from "./supabase";

export async function getProfile(clerkUserId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
export async function createProfile(clerkUserId, name) {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      clerk_user_id: clerkUserId,
      name: name,
      role: "candidate",
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
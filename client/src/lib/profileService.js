

export async function getProfile(supabase, clerkUserId) {
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
export async function createProfile(supabase, clerkUserId, name) {
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
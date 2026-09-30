export async function createInterview(supabase, interviewData) {
  const { data, error } = await supabase
    .from('interviews')
    .insert(interviewData)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
export async function createAnswer(supabase, answerData) {
    const { data, error } = await supabase
        .from('answers')
        .insert({
            question_id: answerData.question_id,
            answer_text: answerData.answer_text,
        })
        .select()
        .single()

    if (error) throw error

    return data
}
import client from './client';

// PUT /profile/answers — save all preference answers at once (batch upsert)
// answers: { question_id: answer_value, ... }
export async function saveProfileAnswers(userId, answers) {
  const { data } = await client.put('/profile/answers', {
    user_id: userId,
    answers,
    source: 'profile_update',
  });
  return data;
}

// GET /profile/answers — load saved answers for a user
// Returns [{ question_id, answer, ... }, ...]
export async function getProfileAnswers(userId) {
  const { data } = await client.get('/profile/answers', {
    params: { user_id: userId },
  });
  return data;
}

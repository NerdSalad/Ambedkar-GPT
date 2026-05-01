from fastapi import HTTPException, status

from backend.repositories.profile_answers_repo import ProfileAnswersRepository
from backend.repositories.questions_repo import QuestionsRepository
from backend.schemas.profile import ProfileAnswerResponse


class ProfileService:
    def __init__(self) -> None:
        self.repo = ProfileAnswersRepository()
        self.questions_repo = QuestionsRepository()

    def upsert_answer(self, user_id: str, question_id: str, answer, source: str) -> ProfileAnswerResponse:
        question = self.questions_repo.get_by_question_id(question_id)
        if not question:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found.")
        self._validate_answer_against_question(question, answer)
        doc = self.repo.upsert_answer(user_id=user_id, question_id=question_id, answer=answer, source=source)
        return self._to_response(doc)

    def upsert_answers_batch(self, user_id: str, answers: dict, source: str) -> list[ProfileAnswerResponse]:
        out: list[ProfileAnswerResponse] = []
        for question_id, answer in answers.items():
            doc = self.repo.upsert_answer(
                user_id=user_id, question_id=str(question_id), answer=answer, source=source
            )
            out.append(self._to_response(doc))
        return out

    def list_answers(self, user_id: str, limit: int = 200, skip: int = 0) -> list[ProfileAnswerResponse]:
        return [self._to_response(doc) for doc in self.repo.list_by_user(user_id, limit=limit, skip=skip)]

    def get_answer(self, user_id: str, question_id: str) -> ProfileAnswerResponse:
        doc = self.repo.get_by_user_and_question(user_id, question_id)
        if not doc:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found.")
        return self._to_response(doc)

    def _to_response(self, doc: dict) -> ProfileAnswerResponse:
        return ProfileAnswerResponse(
            id=str(doc["_id"]),
            user_id=str(doc["user_id"]),
            question_id=doc["question_id"],
            answer=doc["answer"],
            source=doc["source"],
            answered_at=doc["answered_at"],
            created_at=doc["created_at"],
            updated_at=doc["updated_at"],
        )

    @staticmethod
    def _is_empty_answer(answer) -> bool:
        if answer is None:
            return True
        if isinstance(answer, str):
            return not answer.strip()
        if isinstance(answer, (list, tuple, set, dict)):
            return len(answer) == 0
        return False

    def _validate_answer_against_question(self, question: dict, answer) -> None:
        options = question.get("options") or []
        answer_type = str(question.get("answer_type") or "")
        question_id = str(question.get("question_id") or "")

        if answer_type == "single_select":
            if not isinstance(answer, str) or not answer.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Answer for {question_id} must be a non-empty string.",
                )
            if options and answer not in options:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid option for {question_id}: {answer}",
                )
        elif answer_type == "multi_select":
            if not isinstance(answer, list) or not answer:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Answer for {question_id} must be a non-empty list.",
                )
            if options and any(item not in options for item in answer):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid multi-select option for {question_id}.",
                )

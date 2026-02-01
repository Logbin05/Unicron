import type { User } from "./user";

export interface Teacher {
  teacher_id: number;
  teacher_user_id: number;
  teacher_bio: string;
  teacher_specialization: string;
  teacher_experience_years: number;
  teacher_rating: number;
  teacher_reviews_count: number;
  teacher_is_verified: boolean;
  teacher_is_active: boolean;
  teacher_created_at: string;
  teacher_updated_at: string;
}

export interface TeacherProfile {
  user: User;
  teacher: Teacher;
}

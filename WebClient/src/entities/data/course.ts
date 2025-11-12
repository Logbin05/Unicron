import type { ContentType, EnrollmentStatus, KindType, StatusLesson } from "./enums";

export interface Categories {
  category_id: number;
  category_name: string;
  category_desc: string;
}

export interface Course {
  course_id: number;
  institution_id: number;
  author_id: number;
  category_id: number;
  course_name: string;
  course_slug: string;
  course_desc: string;
  course_image: string;
  price: number;
  is_published: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
}

export interface Modules {
  module_id: number;
  course_id: number;
  description: string;
  order: number;
}

export interface Lessons {
  lesson_id: string;
  module_id: number;
  title: string;
  content_type: ContentType;
  content_ref: string;
  duration_seconds: number;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface Assignments {
  assignments_id: number;
  lesson_id: number;
  title: string;
  kind: KindType;
  max_score: number;
  created_at: string;
  updated_at: string;
}

export interface Enrollments {
  enrollments_id: number;
  user_id: number;
  course_id: number;
  progress: number;
  status: EnrollmentStatus,
  started_at: string;
  complected_at: string;
}

export interface LessonProgress {
  lp_id: number;
  enrollments_id: number;
  lesson_id: number;
  progress: StatusLesson;
  updated_at: string;
}


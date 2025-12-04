export enum ListNews {
  NEWS = "News",
  UPDATED = "Updated",
  COURSES = "Courses",
  INSTITUTION = "Institutions",
  ARTICLE = "Article",
  EVENT = "Event",
  SUCCESS_STORY = "Success story",
  TIP = "Tip",
  Q_A = "Questions and answers",
  BEHIND_SCENES = "Behind scenes",
  POLL = "Poll"
}

export interface Author {
  author_id: number;
  name: string;
  avatar_url: string;
  role: string;
}

export interface MediaAttachment {
  media_url: string;
  media_type: 'image' | 'video' | 'audio';
  alt_text?: string;
}

export interface Post {
  post_id: number;
  image: string;
  attachments?: MediaAttachment[];
  title: string;
  body: string;
  type: ListNews;
  author: Author;
  is_liked_by_user: boolean;
  likes_count: number;
  comments_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  target_url?: string;
}
